import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Item, Segment, Message, Divider, Button } from "semantic-ui-react";

import UserProduct from "../components/UserProduct";
import { getUserDetail } from "../actions/userActions";
import { PRODUCT_DELETE_RESET } from "../constants/productConstants";

function ProfileScreen({ match, history }) {
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.userLogin);
  const { error, user } = useSelector((state) => state.userDetail);
  const { error: delError, success } = useSelector((state) => state.productDelete);

  useEffect(() => {
    dispatch(getUserDetail(match.params.id));

    if (success) {
      dispatch({ type: PRODUCT_DELETE_RESET });
      history.push(`/user/${match.params.id}`);
    }
  }, [dispatch, match, success]);

  /**
   * Handler for delete button
   */
  const profileDeleteHandler = () => {
    console.log("delete submitted");
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
            onClick={profileDeleteHandler}
          />
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
            {delError && <Message error header="Delete Product Failed" list={delError} />}

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
