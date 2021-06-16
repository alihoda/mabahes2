import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Button, Divider, Header, Icon, Item, Message, Modal, Segment } from "semantic-ui-react";

import UserProduct from "../components/UserProduct";
import { getUserDetail, userDeleteProfile } from "../actions/userActions";
import { PRODUCT_DELETE_RESET } from "../constants/productConstants";
import { USER_DELETE_PROFILE_RESET } from "../constants/userConstants";

function ProfileScreen({ match, history }) {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  const { userInfo } = useSelector((state) => state.userLogin);
  const { error, user } = useSelector((state) => state.userDetail);
  const { error: productDelError, success: productSuccess } = useSelector(
    (state) => state.productDelete
  );
  const { error: userDelError, success: userSuccess } = useSelector(
    (state) => state.userDeleteProfile
  );

  useEffect(() => {
    dispatch(getUserDetail(match.params.id));

    if (productSuccess) {
      dispatch({ type: PRODUCT_DELETE_RESET });
      history.push(`/user/${match.params.id}`);
    }
    if (userSuccess) {
      dispatch({ type: USER_DELETE_PROFILE_RESET });
      history.push("/");
    }
  }, [dispatch, history, match, productSuccess, userSuccess]);

  const modalRender = () => {
    return (
      <Modal size="small" open={open} onClose={() => setOpen(false)} onOpen={() => setOpen(true)}>
        <Header icon="warning sign" content="Are You Sure?" />
        <Modal.Content>
          <p>The user and all its products will be deleted. Sure about that?</p>
        </Modal.Content>
        <Modal.Actions>
          <Button color="red" onClick={() => setOpen(false)}>
            <Icon name="remove" /> No
          </Button>
          <Button color="green" onClick={profileDeleteHandler}>
            <Icon name="checkmark" /> Yes
          </Button>
        </Modal.Actions>
      </Modal>
    );
  };

  /**
   * Handler for delete button
   */
  const profileDeleteHandler = () => {
    setOpen(false);
    dispatch(userDeleteProfile(userInfo.id));
  };

  /**
   * Edit and delete buttons for current user
   * @returns <Item.Extra>
   */
  const renderUserButtons = () => {
    if (userInfo && userInfo.id === user.id) {
      return (
        <Item.Extra>
          <Divider />
          <Button
            secondary
            content="Edit Profile"
            icon="edit outline"
            labelPosition="left"
            as={Link}
            to={`/user-update/${user.id}`}
          />

          <Button
            color="red"
            content="Delete Profile"
            icon="trash"
            labelPosition="left"
            onClick={() => setOpen(true)}
          />
          {modalRender()}
        </Item.Extra>
      );
    }
  };

  return (
    <div>
      {!user ? (
        // Show loading spinner until data is ready
        <Segment loading />
      ) : error ? (
        <Message error header="Something Has Occurred" content={error} />
      ) : (
        <div>
          {userDelError && <Message error header="Delete User Failed" />}

          {/* User info */}
          <Segment>
            <Item.Group>
              <Item>
                <Item.Image
                  rounded
                  size="medium"
                  src={
                    user.avatar
                      ? user.avatar.url
                      : "https://react.semantic-ui.com/images/avatar/large/matthew.png"
                  }
                />

                <Item.Content>
                  <Item.Header as="h2" content={user.name} />
                  <Item.Meta content={`Username: ${user.username}`} />
                  <Item.Meta content={`Email: ${user.email}`} />
                  <h4>About Me:</h4>
                  <Item.Description content={user.description} />
                  {renderUserButtons()}
                </Item.Content>
              </Item>
            </Item.Group>
          </Segment>

          {/* user products */}
          <Segment padded>
            <h2>Products</h2>
            {productDelError && (
              <Message error header="Delete Product Failed" list={productDelError} />
            )}

            {!user.products.length ? (
              // Show a message that the user has no product
              <Message info header="No Product" content="There is no product for this user" />
            ) : (
              <UserProduct user={user} userInfo={userInfo} />
            )}
          </Segment>
        </div>
      )}
    </div>
  );
}

export default ProfileScreen;
