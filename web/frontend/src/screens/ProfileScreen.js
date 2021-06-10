import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Item, Segment, Message as SemMessage, Divider, Button, Icon } from "semantic-ui-react";

import Tag from "../components/Tag";
import Message from "../components/Message";
import { getUserDetail } from "../actions/userActions";

function ProfileScreen({ match }) {
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.userLogin);
  const { error, user } = useSelector((state) => state.userDetail);

  useEffect(() => {
    dispatch(getUserDetail(match.params.id));
  }, [dispatch, match]);

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
    if (userInfo && userInfo.user.id === user.id) {
      return (
        <Item.Extra>
          <Divider />
          <Button.Group>
            <Button animated="vertical" secondary as={Link} to={`/user-update/${user.id}`}>
              <Button.Content hidden>Edit</Button.Content>
              <Button.Content visible>
                <Icon name="edit outline" />
              </Button.Content>
            </Button>

            <Button animated="vertical" color="red" onClick={profileDeleteHandler}>
              <Button.Content hidden>Delete</Button.Content>
              <Button.Content visible>
                <Icon name="trash" />
              </Button.Content>
            </Button>
          </Button.Group>
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
        <Message header="Something Has Occurred" content={error} />
      ) : (
        <div>
          {/* User info */}
          <Segment>
            <Item.Group>
              <Item>
                <Item.Image rounded size="medium" src={user.avatar && user.avatar.url} />

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
          <Segment.Group>
            <Segment>
              <h3>Products</h3>
            </Segment>
            <Segment.Group>
              {!user.products.length ? (
                // Show a message that the user has no product
                <SemMessage info header="No Product" content="There is no product for this user" />
              ) : (
                // List all the user's products
                <Segment>
                  <Item.Group link>
                    {user.products.map((product) => (
                      <Item key={product.id} as={Link} to={`/product/${product.id}`}>
                        <Item.Image size="small" rounded src={product.image} />
                        <Item.Content>
                          <Item.Header content={product.title} />
                          <Item.Meta content={product.createdAt} />
                          <Item.Description content={product.description} />
                          <Divider />
                          <Tag product={product} />
                        </Item.Content>
                      </Item>
                    ))}
                  </Item.Group>
                </Segment>
              )}
            </Segment.Group>
          </Segment.Group>
        </div>
      )}
    </div>
  );
}

export default ProfileScreen;
