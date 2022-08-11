/*
 * @Description:登录页
 * @Author: huangshiwen
 * @Date: 2022-02-14 12:30:41
 * @LastEditTime: 2022-05-27 09:18:16
 */
import BaseApi from '@/api/base';
import CommonApi from '@/api/common';
import LoginBgImg from '@/assets/images/bg@2x.png';
import useApiOptions from '@zxy/mom-hooks/lib/useApiOptions';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import {
  MomButton,
  MomForm,
  MomInput,
  MomMessage,
  MomSelect,
} from '@zxy/mom-module';
import { flatten } from '@zxy/mom-utils';
import JSEncrypt from 'jsencrypt';
import { useEffect } from 'react';
import './index.less';
import { useLocation } from 'react-router-dom';

const encrypt = new JSEncrypt();

function Login() {
  const [queryForm] = MomForm.useForm();
  const location = useLocation();
  const [sysOptions, getSysOptions] = useApiOptions({
    api: CommonApi.sysList,
    params: {
      code:
        location.pathname.indexOf('/login/') > -1
          ? location.pathname.replace('/login/', '')
          : 'cxjx',
    },
    optionsPro: {
      label: 'sysName',
      value: 'sysId',
    },
  });

  useEffect(() => {
    initForm();
    queryRsa();
    getSysOptions();
  }, []);

  const initForm = () => {
    const sysId = localStorage.getItem('sysId');
    if (sysId) {
      queryForm.setFieldsValue({
        sysId: sysId,
      });
    }
  };

  // 获取公钥
  const queryRsa = async () => {
    const res: any = await CommonApi.rsaPublic();
    if (res) {
      encrypt.setPublicKey(res.data);
    }
  };

  //登录
  const userLoginHandler = async () => {
    const formData = await queryForm.validateFields();
    const par = {
      ...formData,
      pwd: encrypt.encrypt(formData.pwd),
    };
    const res: any = await CommonApi.login(par);
    if (res) {
      console.log('login', res);
      sessionStorage.setItem('ut', res.data.ut);
      sessionStorage.setItem('userName', res.data.userName);
      //获取当前用户menu
      const rst: any = await BaseApi.getMenu({});
      if (rst.data) {
        const d = rst.data;
        if (d.length && d[0].children.length) {
          const path = localStorage.getItem('MOM_MES_LAST_TAB');
          if (path) {
            //有LAST_TAB
            const flatMenu = flatten(rst.data);
            console.log('flatMenu', flatMenu);
            const meun = flatMenu.find((v: any) => path == v.uri);
            if (meun) {
              window.location.href = process.env.REACT_APP_PATH + meun.uri;
            } else {
              window.location.href =
                process.env.REACT_APP_PATH + d[0].children[0].uri;
            }
          } else {
            //无LAST_TAB
            window.location.href =
              process.env.REACT_APP_PATH + d[0].children[0].uri;
          }
          localStorage.setItem('MOM_LOGINURL', process.env.REACT_APP_PATH + location.pathname);
        } else {
          MomMessage.warning('无资源权限，请联系管理员添加');
          return;
        }
      } else {
        MomMessage.error('菜单获取失败');
        return;
      }
      MomMessage.success('登录成功');
    } else {
      MomMessage.error('登录失败');
    }
  };

  return (
    <div
      className="login-layout"
      style={{
        backgroundImage: `url(${LoginBgImg})`,
        backgroundSize: '100vw 100vh',
      }}
    >
      <div className="login-form-bg">
        <div className="login-title">智造运营平台</div>
        <MomForm form={queryForm}>
          <MomForm.Item
            name="sysId"
            rules={[{ required: true, message: '请选择系统' }]}
          >
            <MomSelect
              placeholder="请选择系统"
              options={sysOptions}
              style={{ width: '100%' }}
              onSelect={(value: any) => {
                localStorage.setItem('sysId', value);
              }}
            />
          </MomForm.Item>
          <MomForm.Item
            name="account"
            rules={[{ required: true, message: '请输入用户名' }]}
          >
            <MomInput placeholder="请输入用户名" prefix={<UserOutlined />} />
          </MomForm.Item>
          <MomForm.Item
            name="pwd"
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <MomInput
              placeholder="请输入密码"
              type="password"
              prefix={<LockOutlined />}
              onPressEnter={userLoginHandler}
            />
          </MomForm.Item>
          <MomForm.Item>
            <MomButton type="primary" onClick={userLoginHandler}>
              登录
            </MomButton>
          </MomForm.Item>
        </MomForm>
      </div>
    </div>
  );
}

export default Login;
