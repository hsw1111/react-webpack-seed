/*
 * @Description:
 * @Author: huangshiwen
 * @Date: 2022-02-14 12:30:40
 * @LastEditTime: 2022-05-27 09:15:13
 */
import DefaultPage from '@/pages/DefaultPage';
import Route from '@/route';
import homeMenuMode from '@/store/actions/homeMenuMode';
import { menuIconConfig } from '@/util/menuIcon';
import MomHome, { MomHomeMode } from '@zxy/mom-home';
import MomTabsPage, { MomTabsMode } from '@zxy/mom-home/lib/tabspage';
import { flatten } from '@zxy/mom-utils';
import { DictUtils } from '@zxy/mom-utils/lib/dictionary/dict-util';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  useHistory,
  useLocation
} from 'react-router-dom';
import { MomPlatFormUrl } from '@zxy/mom-http';
import BaseApi from './api/base';
import './App.less';
import { basename } from './index';

const App: React.FC = (props: any) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const [tabList, setTabList] = useState<any>([]); //tab列表
  const [activeKey, setActiveKey] = useState<string>('');
  const [menuList, setMenuList] = useState<any[]>([]);
  const [tabsMode, setTabsMode] = useState(MomTabsMode.Vertical);
  const flatRoutes = flatten(Route); //全路由

  const userName = sessionStorage.getItem('userName') || '';

  useEffect(() => {
    const path = location.pathname.replace(basename, '');
    if (path != '/login' && path != '' && path != '/') {
      queryMenu();
      DictUtils.getInstance().queryAllData('get', MomPlatFormUrl + '/dict/all');
    }
  }, []);
  useEffect(() => {
    if (activeKey && activeKey !== '/login' && activeKey !== '/') {
      localStorage.setItem('MOM_MES_LAST_TAB', activeKey);
    }
  }, [activeKey]);

  const queryMenu = async () => {
    const res: any = await BaseApi.getMenu({});
    if (res) {
      initTabData(res.data);
      setMenuList(res.data);
    }
  };

  //初始化从sessionStorage中取tab数据
  const initTabData = (menuData: any) => {
    const list = JSON.parse(sessionStorage.getItem('MOM_TABLIST')! || '[]');
    const path = location.pathname.replace(basename, ''); // 不带问号
    console.log(path, '====ppppp');
    const flatMenu = flatten(menuData);
    let j = flatMenu.find((v: any) => {
      // 动态页面
      if (v.pageType !== 0) {
        return v.uri == path + location.search;
      } else {
        // 静态页面
        return v.uri == path;
      }
    });
    if (path == '/login') {
      return;
    }
    //无权限的页面处理
    if (!j && path !== '/login') {
      localStorage.setItem('MOM_MES_LAST_TAB', '');
      window.location.href = basename + '/login';
      return;
    }
    let arr = list.map((item: any) => {
      let i = flatRoutes.find((v: any) => {
        if (v.isDynamic) {
          return item.uri.indexOf(v.uri) > -1;
        } else {
          return v.uri == item.uri;
        }
      });
      return {
        ...item,
        component: (i && i.component) || DefaultPage,
      };
    });
    let s = list.find((v: any) => v.uri === path + location.search);
    let v = flatRoutes.find((v: any) => {
      if (v.isDynamic) {
        return (path + location.search).indexOf(v.uri) > -1;
      } else {
        return v.uri == path;
      }
    });
    let newArr: any = [];
    //浏览器输入地址后的操作
    //  tab里没但权限里有
    if (!s && j) {
      newArr = [
        {
          text: j.text,
          uri: j.uri,
          component: (v && v.component) || DefaultPage,
        },
      ];
    }
    let initTabList = arr.concat(newArr);

    const newTab: any[] = []
    initTabList.forEach((tab: any) => {
      const i = flatMenu.find((v: any) => {
        return v.uri == tab.uri;
      });
      if(i){
        newTab.push(tab)
      }
    })
    console.log("newTab",newTab)
    setTabList(newTab);
    setActiveKey(j.uri);
    sessionStorage.setItem('MOM_TABLIST', JSON.stringify(newTab));
  };


  //tab相关操作 1点击 2刷新 3关闭 4关闭其他 5关闭所有
  const onTabAction = (item: any, index: number, type: number) => {
    let list = tabList.concat();
    switch (type) {
      case 1:
        setActiveKey(item.uri);
        history.push(item.uri);
        break;
      case 2:
        break;
      case 3:
        list.splice(index, 1);
        setTabList(list);
        if (activeKey == item.uri) {
          let tempIndex = index - 1;
          if (tempIndex > -1) {
            setActiveKey(list[tempIndex].uri);
            history.push(list[tempIndex].uri);
          } else {
            setActiveKey('');
          }
        }
        break;
      case 4:
        list = [item];
        setTabList(list);
        break;
      case 5:
        list = [];
        setActiveKey('');
        setTabList(list);
        break;
    }
    sessionStorage.setItem('MOM_TABLIST', JSON.stringify(list));
  };

  const onMenuModeChange = (mode: MomHomeMode) => {
    setTabsMode(
      mode === MomHomeMode.Vertical
        ? MomTabsMode.Vertical
        : MomTabsMode.Horizontal,
    );
    console.log('app-mode', mode);
    dispatch(homeMenuMode.homeModeChange(mode));
  };

  const onMenuClick = (item: any) => {
    if (!item || !item.uri) return;
    history.push(item.uri);
    const hasIndex = tabList.findIndex((v: any) => v.uri === item.uri);
    setActiveKey(item.uri);
    let tab = tabList.concat();
    if (hasIndex == -1) {
      let robj = flatRoutes.find((v: any) => {
        if (v.isDynamic) {
          return item.uri.indexOf(v.uri) > -1;
        } else {
          return v.uri == item.uri;
        }
      });
      let mobj = flatten(menuList).find((v: any) => v.uri == item.uri);
      if (robj) {
        tab.push({ ...robj, text: mobj.text, uri: mobj.uri });
      } else {
        tab.push({ ...mobj, component: DefaultPage });
      }
      console.log(tab, '====0000');
      setTabList(tab);
      sessionStorage.setItem('MOM_TABLIST', JSON.stringify(tabList));
    }
  };
  const onLogoutClick = () => {
    console.log('onLogoutClick');
    // sessionStorage.clear();
    history.push(localStorage.getItem("MOM_LOGINURL")||'/login');
  };
  return (
    <MomHome
      title="智造运营"
      userName={userName}
      activeKey={activeKey}
      menuList={menuList}
      menuIconConfig={menuIconConfig}
      onMenuClick={onMenuClick}
      onUpdatePwdClick={() => {
        console.log('onUpdatePwdClick');
      }}
      onLogoutClick={onLogoutClick}
      onMenuModeChange={onMenuModeChange}
    >
      <MomTabsPage
        active={activeKey}
        tabList={tabList}
        tabsMode={tabsMode}
        onTabAction={onTabAction}
      ></MomTabsPage>
    </MomHome>
  );
};

export default App;