import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Card, Divider, Header, Icon, Modal } from "semantic-ui-react";

import Tag from "../components/Tag";
import { deleteProduct } from "../actions/productActions";

function UserProduct({ user, userInfo }) {
  const dispatch = useDispatch();

  const productDeleteHandler = (prodId) => {
    dispatch(deleteProduct(prodId));
    console.log("product deleted");
  };

  const renderProductButtons = (product) => {
    if (userInfo && userInfo.id === user.id) {
      return (
        <div className="ui two buttons">
          <Button basic animated secondary as={Link} to={`/update-product/${product.id}`}>
            <Button.Content hidden>Edit</Button.Content>
            <Button.Content visible>
              <Icon name="edit" />
            </Button.Content>
          </Button>

          <Button basic animated color="red" onClick={() => productDeleteHandler(product.id)}>
            <Button.Content hidden>Delete</Button.Content>
            <Button.Content visible>
              <Icon name="trash" />
            </Button.Content>
          </Button>
        </div>
      );
    }
  };

  return (
    <Card.Group>
      {user.products.map((product) => (
        <Card
          key={product.id}
          link
          color="blue"
          image={
            product.image
              ? product.image.url
              : "https://cdn.dribbble.com/users/2564256/screenshots/15244258/media/324908e40f50ca98946aefeca70c6cfd.png?compress=1&resize=1200x900"
          }
          header={
            <h3>
              <Link to={`/product/${product.id}`} style={{ color: "black" }}>
                {product.title}
              </Link>
            </h3>
          }
          meta={product.createdAt}
          description={product.description}
          extra={
            <div>
              <Tag product={product} />
              <Divider />
              {renderProductButtons(product)}
            </div>
          }
        />
      ))}
    </Card.Group>
  );
}

export default UserProduct;
