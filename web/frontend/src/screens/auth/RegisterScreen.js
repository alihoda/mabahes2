import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Button, Form, Grid, Message as SemMessage, Segment } from "semantic-ui-react";

import Message from "../../components/Message";
import { register } from "../../actions/userActions";

function RegisterScreen({ location, history }) {
  // States for registration
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [description, setDescription] = useState("");
  const [avatar, setAvatar] = useState({ file: null, fileName: "" });
  // State for messages
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();
  // Check if there is redirect in url
  const redirect = location.search ? location.search.split("=")[1] : "/";
  // Give register info from state
  const userRegister = useSelector((state) => state.userRegister);
  const { error, userInfo } = userRegister;
  // If userInfo is available then redirect user
  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);
  // Submit handler
  const submitHandler = (e) => {
    e.preventDefault();

    // Check if password is equal to confirmPassword
    if (password !== confirmPassword || !password) {
      setMessage("Password does not matched");
    } else {
      // If no problem was found then call register function
      dispatch(
        register({
          name: name,
          username: username,
          email: email,
          password: password,
          description: description,
          thumbnail: avatar.file,
        })
      );
    }
  };
  return (
    <div>
      <Grid textAlign="center" style={{ height: "80vh" }} verticalAlign="middle">
        <Grid.Column style={{ maxWidth: 600 }}>
          <h3>Sign Up</h3>

          {message && <Message header={"Registration Failed"} content={message} />}
          {error && <Message header={"Registration Failed"} content={error} />}

          <Segment stacked>
            <Form size="large" onSubmit={submitHandler}>
              <Form.Input
                fluid
                label="Name"
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
              />

              <Form.Group widths="equal">
                <Form.Input
                  fluid
                  label="Username"
                  placeholder="Username"
                  type="username"
                  onChange={(e) => setUsername(e.target.value)}
                />

                <Form.Input
                  fluid
                  label="Email"
                  placeholder="Email"
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              <Form.Group widths="equal">
                <Form.Input
                  fluid
                  label="Password"
                  placeholder="Password"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                />

                <Form.Input
                  fluid
                  label="Confirm Password"
                  placeholder="Confirm Password"
                  type="password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </Form.Group>

              <Form.TextArea
                label="Description"
                placeholder="Write about yourself ..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />

              <Form.Input
                label={{
                  color: "teal",
                  icon: "file",
                  content: "Avatar",
                  htmlFor: "upload",
                  labelPosition: "left",
                }}
                // action={{
                //   color: "teal",
                //   labelPosition: "left",
                //   icon: "file",
                //   content: "Avatar",
                //   htmlFor: "upload",
                // }}
                readOnly
                placeholder="Upload your avatar"
                defaultValue={avatar.fileName}
              />

              <input
                id="upload"
                type="file"
                hidden
                onChange={(e) =>
                  setAvatar({ file: e.target.files[0], fileName: e.target.files[0].name })
                }
              />

              <Button primary type="submit" fluid size="large">
                Sign Up
              </Button>
            </Form>
          </Segment>

          <SemMessage>
            Have account?{" "}
            <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>Login</Link>
          </SemMessage>
        </Grid.Column>
      </Grid>
    </div>
  );
}

export default RegisterScreen;
