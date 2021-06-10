import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, Grid, Message, Segment } from "semantic-ui-react";

import { getUserDetail, updateUserProfile } from "../actions/userActions";
import { USER_UPDATE_PROFILE_RESET } from "../constants/userConstants";

function ProfileUpdateScreen({ match, history }) {
  const [message, setMessage] = useState(null);
  const [state, setState] = useState({
    name: "",
    email: "",
    username: "",
    description: "",
    thumbnail: null,
  });

  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.userLogin);
  const { error, success } = useSelector((state) => state.userUpdateProfile);
  const { user } = useSelector((state) => state.userDetail);

  useEffect(() => {
    if (!user) {
      dispatch(getUserDetail(match.params.id));
    } else if (!userInfo || user.id !== userInfo.id) {
      setMessage({ header: "Permission Denied", content: "You do not have the permission" });
    } else {
      setState({ ...user });
    }
    // Redirect to user profile if update was successful
    if (success) {
      dispatch({ type: USER_UPDATE_PROFILE_RESET });
      history.push(`/user/${user.id}`);
    }
  }, [dispatch, history, success, userInfo, user, match]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUserProfile(state));
  };

  return (
    <div>
      {!user ? (
        <Segment loading />
      ) : message ? (
        <Message error header={message.header} content={message.content} />
      ) : (
        <Grid verticalAlign="middle" centered style={{ height: "80vh" }}>
          <Grid.Column style={{ maxWidth: 600 }}>
            <h3>Update Profile</h3>

            {error && <Message error header="Update Failed" list={error} />}
            <Segment stacked>
              <Form size="large" onSubmit={submitHandler}>
                <Form.Group widths="equal">
                  <Form.Input
                    fluid
                    label="Name"
                    placeholder="Name"
                    value={state.name}
                    onChange={(e) => setState({ ...state, name: e.target.value })}
                  />

                  <Form.Input
                    fluid
                    label="Username"
                    placeholder="Username"
                    type="username"
                    value={state.username}
                    onChange={(e) => setState({ ...state, username: e.target.value })}
                  />
                </Form.Group>

                <Form.Group widths="equal">
                  <Form.Input
                    fluid
                    label="Email"
                    placeholder="Email"
                    type="email"
                    value={state.email}
                    onChange={(e) => setState({ ...state, email: e.target.value })}
                  />

                  <Form.Field>
                    <label>Avatar</label>
                    <input
                      id="upload"
                      type="file"
                      onChange={(e) => setState({ ...state, thumbnail: e.target.files[0] })}
                    />
                  </Form.Field>
                </Form.Group>

                <Form.TextArea
                  label="Description"
                  placeholder="Write about yourself ..."
                  value={state.description}
                  onChange={(e) => setState({ ...state, description: e.target.value })}
                />

                <Button primary type="submit" fluid size="large">
                  Update
                </Button>
              </Form>
            </Segment>
          </Grid.Column>
        </Grid>
      )}
    </div>
  );
}

export default ProfileUpdateScreen;
