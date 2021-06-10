import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Button, Form, Grid, Icon, Message, Segment } from "semantic-ui-react";

import { register } from "../../actions/userActions";
import { USER_REGISTER_RESET } from "../../constants/userConstants";

function RegisterScreen({ location, history }) {
  const [state, setState] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    password_confirmation: "",
    description: "",
    thumbnail: null,
  });

  const dispatch = useDispatch();
  // Give register info from state
  const { error, userInfo } = useSelector((state) => state.userRegister);
  // Check if there is redirect in url
  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    } else {
      dispatch({ type: USER_REGISTER_RESET });
    }
  }, [dispatch, history, userInfo, redirect]);

  /**
   * Form submit handler
   *
   * It take form inputs and dispatch register user action
   * @param {e} e action
   */
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(register(state));
  };

  return (
    <div>
      <Grid centered style={{ height: "80vh" }} verticalAlign="middle">
        <Grid.Column style={{ maxWidth: 600 }}>
          <h3>Sign Up</h3>

          {error && <Message error header={"Registration Failed"} list={error} />}

          <Segment stacked>
            <Form size="large" onSubmit={submitHandler}>
              <Form.Input
                fluid
                label="Name"
                placeholder="Name"
                onChange={(e) => setState({ ...state, name: e.target.value })}
              />

              <Form.Group widths="equal">
                <Form.Input
                  fluid
                  label="Username"
                  placeholder="Username"
                  type="username"
                  onChange={(e) => setState({ ...state, username: e.target.value })}
                />

                <Form.Input
                  fluid
                  label="Email"
                  placeholder="Email"
                  type="email"
                  onChange={(e) => setState({ ...state, email: e.target.value })}
                />
              </Form.Group>

              <Form.Group widths="equal">
                <Form.Input
                  fluid
                  label="Password"
                  placeholder="Password"
                  type="password"
                  onChange={(e) => setState({ ...state, password: e.target.value })}
                />

                <Form.Input
                  fluid
                  label="Confirm Password"
                  placeholder="Confirm Password"
                  type="password"
                  onChange={(e) => setState({ ...state, password_confirmation: e.target.value })}
                />
              </Form.Group>

              <Form.TextArea
                label="Description"
                placeholder="Write about yourself ..."
                onChange={(e) => setState({ ...state, description: e.target.value })}
              />

              <Form.Field>
                <input
                  id="upload"
                  type="file"
                  onChange={(e) => setState({ ...state, thumbnail: e.target.files[0] })}
                />
              </Form.Field>

              <Button primary type="submit" fluid size="large">
                Sign Up
              </Button>
            </Form>
          </Segment>

          <Message warning>
            <Icon name="help" />
            Have account?{" "}
            <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>Login</Link>
          </Message>
        </Grid.Column>
      </Grid>
    </div>
  );
}

export default RegisterScreen;
