import Main from "./Components/layout/Main";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "./redux/auth/auth.actions";
import { history } from "./helpers/history";
import AuthVerify from "./common/AuthVerify";
import users from "./pages/users";

import "antd/dist/antd.min.css";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";

function App() {
  const { isLoggedIn } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const logOut = () => {
    dispatch(logout());
  };

  return (
    <div className="App">
      <Router history={history}>
        {!isLoggedIn ? (
          <Switch>
            <Main>
              <Redirect from="/" exact component={users} />
            </Main>
            {/* <Route path="/sign-up" exact component={SignUp} /> */}
            <Route path="/login" exact component={users} />
            <Redirect from="*" to="/sign-in" />
          </Switch>
        ) : (
          <Switch>
            <Main>
              <Redirect from="*" to="/dashboard" />
            </Main>
          </Switch>
        )}
        <AuthVerify logOut={logOut} />
      </Router>
    </div>
  );
}

export default App;
