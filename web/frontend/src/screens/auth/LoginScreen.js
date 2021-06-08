import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Segment, Form, Button, Grid, Message as SemMessage } from "semantic-ui-react";

import { login } from "../../actions/userActions";
import Message from "../../components/Message";

function LoginScreen({ location, history }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const redirect = location.search ? location.search.split("=")[1] : "/";

  const userLogin = useSelector((state) => state.userLogin);
  const { error, userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(username, password));
  };

  return (
    <div>
      <Grid textAlign="center" style={{ height: "80vh" }} verticalAlign="middle">
        <Grid.Column style={{ maxWidth: 450 }}>
          <h3>Login</h3>

          {error && <Message header={"Authentication Failed"} content={error} />}

          <Segment stacked>
            <Form size="large" onSubmit={submitHandler}>
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
              />
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button primary type="submit" fluid size="large">
                Login
              </Button>
            </Form>
          </Segment>

          <SemMessage>
            New to us?{" "}
            <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>Sign Up</Link>
          </SemMessage>
        </Grid.Column>
      </Grid>
    </div>
  );
}

export default LoginScreen;
