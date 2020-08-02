import React from "react";
import {
  Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import axios from "axios";
import Login from "./admin/component/login/index.js"
import Forgot from "./admin/component/forgot/index.js"
import VerifyUser from "./admin/component/verify/index.js"
import Layout from "./admin/common/Layout.js"
import Dashboard from "./admin/component/dashboard/index.js"
import Messages from "./admin/component/messages/index.js"
import Indicators from "./admin/component/indicators/index.js";
import Profile from "./admin/component/profile/index.js";

axios.defaults.baseURL = 'http://ec2-3-135-119-95.us-east-2.compute.amazonaws.com:5000/api/v1';
axios.defaults.headers.post['Content-Type'] = 'application/json';

/*Master Admin Import*/

const prefix = "/admin";

export default function AdminRoutes() {
  return (
    <Switch>

      /*Admin Routes*/
        <Route exact path="/">
          <Login />
        </Route>
        <PrivateRoute layout={Layout} path={`${prefix}/dashboard`}>
          <Dashboard />
        </PrivateRoute>
        <PrivateRoute layout={Layout} path={`${prefix}/messages`}>
          <Messages />
        </PrivateRoute>
        <PrivateRoute layout={Layout} path={`${prefix}/indicators`}>
          <Indicators />
        </PrivateRoute>
        <PrivateRoute layout={Layout} path={`${prefix}/profile`}>
          <Profile />
        </PrivateRoute>
        <Route path={`${prefix}/forgot`}>
          <Forgot />
        </Route>
        <Route path={`${prefix}/verify/:token`}>
          <VerifyUser />
        </Route>
      /*End Admin Routes*/

    </Switch>
  );
}

function PrivateRoute({ children, layout: Layout, ...rest}) {
  return (
    <Route
      {...rest}
      render={({ location, props }) =>
        localStorage.getItem("mb_autorization") && localStorage.getItem("mb_department") ? (
          <Layout {...props}>
            {children}
          </Layout>
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}
