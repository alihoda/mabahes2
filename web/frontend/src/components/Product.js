import React from "react";
import { Link } from "react-router-dom";
import { Card, Image } from "semantic-ui-react";
import Tag from "./Tag";

function Product({ product, fluid }) {
  return (
    <Card link fluid={fluid} as={Link} to={`/product/${product.id}`} color="blue">
      <Image
        src={
          product.image
            ? product.image.url
            : "https://cdn.dribbble.com/users/2564256/screenshots/15244258/media/324908e40f50ca98946aefeca70c6cfd.png?compress=1&resize=1200x900"
        }
        alt={product.name}
        circular
      />

      <Card.Content>
        <Image
          floated="right"
          size="mini"
          src={
            product.user.avatar
              ? product.user.avatar.url
              : "https://react.semantic-ui.com/images/avatar/large/matthew.png"
          }
        />

        <Card.Header>{product.title}</Card.Header>
        <Card.Meta as={Link} to={`/user/${product.user.id}`}>
          {product.user.name}
        </Card.Meta>
        <Card.Meta>{product.createdAt}</Card.Meta>
        <Card.Description>{product.description}</Card.Description>
      </Card.Content>

      <Card.Content extra>
        <Tag product={product} />
      </Card.Content>
    </Card>
  );
}

export default Product;
