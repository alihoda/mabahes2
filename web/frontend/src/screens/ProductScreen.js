import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Grid, Segment, Image, Card, Label } from "semantic-ui-react";

import { productDetail } from "../actions/productActions";

function ProductScreen({ match, history }) {
  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetail);
  const { loading, error, product } = productDetails;

  useEffect(() => {
    dispatch(productDetail(match.params.id));
  }, [dispatch, match]);

  return (
    <div>
      <Segment>
        <Grid divided>
          <Grid.Column width={7}>
            <Image src={product.image} />
          </Grid.Column>

          <Grid.Column width={9}>
            <Card>
              <Card.Meta floated="right">{product.createdAt}</Card.Meta>
              <Card.Header>{product.name}</Card.Header>

              <Card.Meta as={Link} to={`/users/${product.user.id}`}>
                {product.user.name}
              </Card.Meta>

              <Card.Description>{product.description}</Card.Description>

              <Card.Content extra>
                {product.tags.map((tag) => (
                  <Label as={Link} to={`/tags/${tag.id}`} style={{ marginBottom: "0.5em" }}>
                    {tag.name}
                  </Label>
                ))}
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid>
      </Segment>
    </div>
  );
}

export default ProductScreen;
