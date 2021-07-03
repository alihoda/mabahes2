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

  // Store modal status (opened or not)
  const [openModal, setOpenModal] = useState(false);
  // Get current logged in user from state
  const { userInfo } = useSelector((state) => state.userLogin);
  // Get requested user profile from state (it fills with getUserDetail action)
  const { error, user } = useSelector((state) => state.userDetail);
  // State for store product delete action
  const { error: productDelError, success: productSuccess } = useSelector(
    (state) => state.productDelete
  );
  // State for store user delete action
  const { error: userDelError, success: userSuccess } = useSelector(
    (state) => state.userDeleteProfile
  );

  useEffect(() => {
    // Dispatch requested user info and store it in userDetail state
    dispatch(getUserDetail(match.params.id));
    // Redirect to user profile screen if product deleted successfully
    if (productSuccess) {
      dispatch({ type: PRODUCT_DELETE_RESET });
      history.push(`/user/${match.params.id}`);
    }
    // Redirect to home screen if user deleted successfully
    if (userSuccess) {
      dispatch({ type: USER_DELETE_PROFILE_RESET });
      history.push("/");
    }
  }, [dispatch, history, match, productSuccess, userSuccess]);

  /**
   * Render modal for user delete profile
   * @returns Modal
   */
  const modalRender = () => {
    return (
      <Modal
        size="small"
        open={openModal}
        onClose={() => setOpenModal(false)}
        onOpen={() => setOpenModal(true)}
      >
        <Header icon="warning sign" content="Are You Sure?" />
        <Modal.Content>
          <p>The user and all its products will be deleted. Sure about that?</p>
        </Modal.Content>
        <Modal.Actions>
          <Button color="red" onClick={() => setOpenModal(false)}>
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
    setOpenModal(false);
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
            inverted
            secondary
            content="Edit Profile"
            icon="edit outline"
            labelPosition="left"
            as={Link}
            to={`/user-update/${user.id}`}
          />

          <Button
            inverted
            color="red"
            content="Delete Profile"
            icon="trash"
            labelPosition="left"
            onClick={() => setOpenModal(true)}
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
        <Segment inverted loading />
      ) : error ? (
        <Message error header="Something Has Occurred" content={error} />
      ) : (
        <div>
          {userDelError && <Message error header="Delete User Failed" />}

          {/* User info */}
          <Segment raised style={{ padding: "1em 0.5em", margin: "1em 0em" }}>
            <Item.Group>
              <Item>
                <Item.Image
                  avatar
                  size="medium"
                  src={
                    user.avatar
                      ? user.avatar.url
                      : "https://react.semantic-ui.com/images/avatar/large/matthew.png"
                  }
                />

                <Item.Content verticalAlign="middle">
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
          <Segment padded vertical style={{ padding: "1em 0.5em" }}>
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
