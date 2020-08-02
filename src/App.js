import React from "react";
import {
  Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import axios from "axios";
import history from './admin/common/history.js';
/*Master Admin Import*/
import AdminRoutes from "./AdminRoutes.js";
import MasterRoutes from "./MasterRoutes.js";

export default function App() {
  return (
    <Router history={history}>
      <AdminRoutes />
      <MasterRoutes />
    </Router>
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
