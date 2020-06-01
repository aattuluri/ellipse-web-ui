import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from './Pages/signin';
import SignUp from './Pages/signup';
import ForgotPassword from './Pages/ForgotPassword'
import UserDetails from './Pages/UserDetails'
import MainHome from './Pages/MainHome'
import { AuthProvider } from "./Auth";
function App() {
  return (
    <AuthProvider>
      <Router>
        <div>
          <Route exact path="/" component={Login} />
          <Route exact path="/signin" component={Login} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/forgotpassword" component={ForgotPassword} />
          <Route exact path="/userdetails" component={UserDetails}></Route>
          <Route exact path="/home" component={MainHome}></Route>
        </div>
      </Router>
    </AuthProvider>

  );
}
export default App;
