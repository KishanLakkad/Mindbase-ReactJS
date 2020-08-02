import React, { useEffect, useState, Suspense, lazy } from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";

// const Layout = lazy(() => import("./master/layout/Layout"));
// const LoginComponent = lazy(() => import('./master/components/Login'));
// const DashboardComponent = lazy(() => import('./master/components/Dashboard'));
// const AdminDashboardComponent = lazy(() => import('./master/components/AdminDashboard'));
// const AccountComponent = lazy(() => import('./master/components/Account'));
// const MessageComponent = lazy(() => import('./master/components/Message'));
// const MusicComponent = lazy(() => import('./master/components/Music'));
// const ActivityComponent = lazy(() => import('./master/components/Activity'));
// const IconComponent = lazy(() => import('./master/components/Icon'));
// const FeedbackComponent = lazy(() => import('./master/components/Feedback'));
// const GetHelpComponent = lazy(() => import('./master/components/GetHelp'));

import Layout from "./master/layout/Layout";
import LoginComponent from "./master/components/Login";
import DashboardComponent from "./master/components/Dashboard";
import AdminDashboardComponent from "./master/components/AdminDashboard";
import AccountComponent from "./master/components/Account";
import MessageComponent from "./master/components/Message";
import MusicComponent from "./master/components/Music";
import ActivityComponent from "./master/components/Activity";
import IconComponent from "./master/components/Icon";
import FeedbackComponent from "./master/components/Feedback";
import GetHelpComponent from "./master/components/GetHelp";

const ProtectedRoute = ({ component: Component, layout: Layout, ...rest }) => (
    <Route
        {...rest}
        render={(props) =>
            localStorage.getItem("mb_autorization") && localStorage.getItem("mb_master") ? (
                <Layout {...props}>
                    <Component {...props} />
                </Layout>
            ) : (
                    <Redirect
                        to={{
                            pathname: "/",
                            state: { from: props.location },
                        }}
                    />
                )
        }
    />
);

const MasterRoutes = (props) => {

    return (
        <Switch>
            <ProtectedRoute layout={Layout} path="/master/dashboard" name="Dashboard Page" component={DashboardComponent} />
            <ProtectedRoute layout={Layout} path="/master/adminDashboard/:id" name="Admin Dashboard Page" component={AdminDashboardComponent} />
            <ProtectedRoute layout={Layout} path="/master/department" name="Department Page" component={AccountComponent} />
            <ProtectedRoute layout={Layout} path="/master/message" name="Message Page" component={MessageComponent} />
            <ProtectedRoute layout={Layout} path="/master/music" name="Music Page" component={MusicComponent} />
            <ProtectedRoute layout={Layout} path="/master/activity" name="Activity Page" component={ActivityComponent} />
            <ProtectedRoute layout={Layout} path="/master/icon" name="Icon Page" component={IconComponent} />
            <ProtectedRoute layout={Layout} path="/master/feedback" name="Feedback Page" component={FeedbackComponent} />
            <ProtectedRoute layout={Layout} path="/master/gethelp" name="Get help Page" component={GetHelpComponent} />
        </Switch>
    );
}

export default MasterRoutes;
