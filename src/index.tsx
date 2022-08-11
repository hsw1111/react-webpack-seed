/*
 * @Description:
 * @Author: huangshiwen
 * @Date: 2022-02-14 17:40:56
 * @LastEditTime: 2022-05-26 14:42:26
 */
import store from '@/store';
import { MomSpin } from '@zxy/mom-module';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import { createBrowserHistory } from 'history';
import 'moment/locale/zh-cn'; //  antd日期中文有问题，引入
import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {
  BrowserRouter,
  Redirect,
  Route,
  Router,
  Switch
} from 'react-router-dom';
import App from './App';
import './assets/style/index.less';
import './assets/theme/var.css';
import Login from './pages/Login';
export const basename: any = process.env.REACT_APP_PATH;
const history = createBrowserHistory({ basename });

const Spinner = () => (
  <MomSpin
    style={{
      position: 'absolute',
      left: '50%',
      top: '50%',
      transform: 'translate(-50%,-50%)',
    }}
  />
);

ReactDOM.render(
  <ConfigProvider locale={zhCN}>
    <Router history={history}>
      <Provider store={store}>
        <div style={{ height: '100%' }}>
          <Suspense fallback={Spinner}>
            <BrowserRouter basename={basename}>
              <Switch>
                <Route path="/" exact>
                  <Redirect to="/login" />
                </Route>
                <Route path="/login" component={Login} />
                <Route path="/login/:code" component={Login} />
                <Route path="/">
                  <App />
                </Route>
                <Redirect to="/login" />
              </Switch>
            </BrowserRouter>
          </Suspense>
        </div>
      </Provider>
    </Router>
  </ConfigProvider>,
  document.getElementById('root'),
);
