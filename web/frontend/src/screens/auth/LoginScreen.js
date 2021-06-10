import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Segment, Form, Button, Grid, Message, Icon } from "semantic-ui-react";

import { login } from "../../actions/userActions";
import { USER_LOGIN_RESET } from "../../constants/userConstants";

function LoginScreen({ location, history }) {
  const [state, setState] = useState({ username: "", password: "" });

  const dispatch = useDispatch();

  const { error, userInfo } = useSelector((state) => state.userLogin);

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    } else {
      dispatch({ type: USER_LOGIN_RESET });
    }
  }, [history, userInfo, redirect, dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(state));
  };

  return (
    <div>
      <Grid centered style={{ height: "80vh" }} verticalAlign="middle">
        <Grid.Column style={{ maxWidth: 450 }}>
          <h3>Login</h3>

          {error && <Message error header={"Authentication Failed"} list={error} />}

          <Segment stacked>
            <Form size="large" onSubmit={submitHandler}>
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                placeholder="Username"
                onChange={(e) => setState({ ...state, username: e.target.value })}
              />
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                type="password"
                onChange={(e) => setState({ ...state, password: e.target.value })}
              />
              <Button primary type="submit" fluid size="large">
                Login
              </Button>
            </Form>
          </Segment>

          <Message warning>
            <Icon name="help" />
            New to us?{" "}
            <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>Sign Up</Link>
          </Message>
        </Grid.Column>
      </Grid>
    </div>
  );
}

export default LoginScreen;
