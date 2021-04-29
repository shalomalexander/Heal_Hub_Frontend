import React from "react";
import LoginScreen from "./LoginScreen";
import RegisterScreen from "./RegisterScreen";
import { Switch, Route} from "react-router-dom";
import OTPScreen from "./OTPScreen";

const OnboardingScreen = () => {
  return (
    <>
      <div className="body-container">
        <div className="">
          <Switch>
            <Route exact path="/" component={LoginScreen}/>
            <Route exact path="/login" component={LoginScreen} />
            <Route exact path="/register" component={RegisterScreen} />
            <Route exact path="/otpscreen" component={OTPScreen} />
          </Switch>
        </div>
      </div>
    </>
  );
};

export default OnboardingScreen;
