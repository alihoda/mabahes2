import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Segment, Form, Button, Grid, Message, Icon } from "semantic-ui-react";

import { login } from "../../actions/userActions";
import { USER_LOGIN_RESET } from "../../constants/userConstants";

function LoginScreen({ location, history }) {
  const [form, setForm] = useState({ username: "", password: "" });

  const dispatch = useDispatch();
  // Get logged in user
  const { error, userInfo } = useSelector((state) => state.userLogin);
  // Check if there was redirect param in url
  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    // If user is already logged in, redirect
    if (userInfo) {
      history.push(redirect);
    } else {
      dispatch({ type: USER_LOGIN_RESET });
    }
  }, [history, userInfo, redirect, dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(form));
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
                onChange={(e) => setForm({ ...form, username: e.target.value })}
              />
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                type="password"
                onChange={(e) => setForm({ ...form, password: e.target.value })}
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
