import React from 'react';
import { Switch, Route } from 'react-router-dom';
import AppLayout from './components/AppLayout';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
// import Users from './users/Users';
import logo from './EvHard_logo.png';

// import { PrivateRoute } from './components/PrivateRoute';
// import NewHwTypeForm from './hardware/NewHwTypeForm';
import HwListPage from './hardware/HwListPage';

function AppCrossroad() {
  return (
    <Switch>
      <Route exact path="/">
        <AppLayout>
          <React.Fragment>
            Homepage {/** TODO - homepage */}
            <HwListPage />
          </React.Fragment>
        </AppLayout>
      </Route>

      <Route path="/login">
        <AppLayout>
          <React.Fragment>
            <img src={logo} alt="logo" />
            <LoginForm />
          </React.Fragment>
        </AppLayout>
      </Route>

      <Route path="/register">
        <AppLayout>
          <React.Fragment>
            <img src={logo} alt="logo" />
            <RegisterForm />
          </React.Fragment>
        </AppLayout>
      </Route>

      {/* <PrivateRoute path="/users">
        <AppLayout>
          <Users />
        </AppLayout>
      </PrivateRoute>

      <PrivateRoute path="/hardware-list">
        <AppLayout>
          <HwListPage />
        </AppLayout>
      </PrivateRoute>
      
      <PrivateRoute path="/hardware-type">
        <AppLayout>
          <NewHwTypeForm />
        </AppLayout>
      </PrivateRoute> */}
    </Switch>
  );
}
export default AppCrossroad;
