import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from './Pages/signin';
import SignUp from './Pages/signup';
import ForgotPassword from './Pages/ForgotPassword';
import UserDetails from './Pages/UserDetails';
import { AuthProvider } from "./Auth";
import OTPVer from './Pages/otpverification';
import UserInfo from './Pages/UserInfo';
import Layout from './Pages/Layout';
import CalenderPanel from './Pages/CalenderPanel';
import EventsTabPanel from './Pages/EventsTabpanel';
import ProfileTabPanel from './Pages/ProfileTabpanel';
import EventPostForm from './Pages/EventPostForm';
import ChatPanel from './Pages/ChatPanel';
import EventDetails from './Pages/EventDetails';

function App() {

  



  return (
    <AuthProvider>
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/signin" component={Login} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/forgotpassword" component={ForgotPassword} />
            <Route exact path="/userinfo" component={UserInfo}></Route>
            <Route exact path="/userdetails" component={UserDetails}></Route>
            <Route exact path="/otpverification" component={OTPVer}></Route>
            
            <Layout>
            <Route path="/home" component={EventsTabPanel}></Route>
              <Route exact path="/events" component={CalenderPanel}></Route>
              <Route exact path="/post" component={EventPostForm}></Route>
              <Route exact path="/profile" component={ProfileTabPanel}></Route>
              <Route exact path="/chat" component={ChatPanel}></Route>
              <Route exact path="/event/:eventId" component={EventDetails} />
              {/* <Route exact path="/eventdetails" component={EventDetails} /> */}
              
            </Layout>
          </Switch>
          
          
        </div>
      </Router>
    </AuthProvider>

  );
}
export default App;
