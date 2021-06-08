import React from "react";
import { Link } from "react-router-dom";
import { Card, Image } from "semantic-ui-react";
import Tag from "../Tag";

function Product({ product }) {
  return (
    <Card link as={Link} to={`/product/${product.id}`}>
      <Image src={product.image} alt={product.name} wrapped ui={false} />

      <Card.Content>
        <Image floated="right" size="mini" src={product.user.avatar} />
        <Card.Header>{product.title}</Card.Header>
        <Card.Meta as={Link} to={`/user/${product.user.id}`}>
          {product.user.name}
        </Card.Meta>
        <Card.Description>{product.description}</Card.Description>

        <Card.Meta>{product.createdAt}</Card.Meta>
      </Card.Content>

      <Card.Content extra>
        <Tag product={product} />
      </Card.Content>
    </Card>
  );
}

export default Product;
