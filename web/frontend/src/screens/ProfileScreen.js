import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  Grid,
  Item,
  Segment,
  Message as SemMessage,
  Divider,
  Button,
  Icon,
} from "semantic-ui-react";

import Tag from "../components/Tag";
import Message from "../components/Message";
import { getUserDetail } from "../actions/userActions";

function ProfileScreen({ match, location, history }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [username, setUsername] = useState("");
  const [products, setProducts] = useState("");
  const [description, setDescription] = useState("");

  const dispatch = useDispatch();

  const userDetail = useSelector((state) => state.userDetail);
  const { error, loading, user } = userDetail;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!user || !user.name) {
      dispatch(getUserDetail(match.params.id));
    } else {
      setName(user.name);
      setEmail(user.email);
      setAvatar(user.avatar && user.avatar.url);
      setUsername(user.username);
      setProducts(user.products);
      setDescription(user.description);
    }
  }, [dispatch, history, userInfo, user]);

  // Handlers
  // Profile update handler
  const profileEditHandler = () => {
    console.log("Edit submitted");
  };
  // Profile delete handler
  const profileDeleteHandler = () => {
    console.log("delete submitted");
  };

  return (
    <div>
      {loading ? (
        // Show loading spinner until data is ready
        <Segment loading />
      ) : error ? (
        <Message header="Something Has Occurred" content={error} />
      ) : (
        <Grid padded columns="equal">
          {/* User info */}
          <Grid.Column>
            <Segment>
              <Item.Group>
                <Item>
                  <Item.Image size="medium" src={avatar} rounded />

                  <Item.Content>
                    <Item.Header as="h2" content={`Name: ${name}`} />
                    <Item.Meta content={`Username: ${username}`} />
                    <Item.Meta content={`Email: ${email}`} />

                    <h4>About Me:</h4>
                    <Item.Description content={description} />
                  </Item.Content>
                </Item>
                {/* Edit and delete buttons */}
                <Divider />
                <Button.Group fluid>
                  <Button animated="vertical" secondary onClick={profileEditHandler}>
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
              </Item.Group>
            </Segment>
          </Grid.Column>

          <Grid.Column>
            {products ? (
              // List all the user's products
              <Segment>
                <Item.Group divided>
                  {products.map((product) => (
                    <Item>
                      <Item.Image size="small" rounded src={product.image} />
                      <Item.Content>
                        <Item.Header
                          as="h4"
                          as={Link}
                          to={`/product/${product.id}`}
                          content={product.title}
                        />
                        <Item.Meta content={product.createdAt} />
                        <Item.Description content={product.description} />
                        <Divider />
                        <Tag product={product} />
                      </Item.Content>
                    </Item>
                  ))}
                </Item.Group>
              </Segment>
            ) : (
              // Show a message that the user has no product
              <SemMessage info header="No Product" content="There is no product for this user" />
            )}
          </Grid.Column>
        </Grid>
      )}
    </div>
  );
}

export default ProfileScreen;
