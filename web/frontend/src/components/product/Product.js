import React from "react";
import { Link } from "react-router-dom";
import { Card, Image } from "semantic-ui-react";
import Tag from "../Tag";

function Product({ product }) {
  return (
    <Card link as={Link} to={`/product/${product.id}`}>
      <Image src={product.image} alt={product.name} circular />

      <Card.Content>
        {product.user.avatar && <Image floated="right" size="mini" src={product.user.avatar.url} />}

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
