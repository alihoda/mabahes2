import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Segment, Label, Item, Divider } from "semantic-ui-react";

import { productDetail } from "../actions/productActions";

function ProductScreen({ match }) {
  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const { product } = productDetails;

  useEffect(() => {
    dispatch(productDetail(match.params.id));
  }, [dispatch, match]);

  return (
    <div>
      {JSON.stringify(product) === "{}" ? (
        <Segment loading />
      ) : (
        <Segment padded>
          <Item>
            <Item.Image src={product.image} />

            <Item.Content>
              <Item.Header as="h2">{product.title}</Item.Header>

              <Item.Meta as={Link} to={`/user/${product.user.id}`} style={{ color: "gray" }}>
                {product.user.name}
              </Item.Meta>

              <Item.Description>{product.description}</Item.Description>
              <Divider />
              <Item.Extra>
                {product.tags.map((tag) => (
                  <Label
                    key={tag.id}
                    as={Link}
                    to={`/tag/${tag.id}`}
                    style={{ marginBottom: "0.5em" }}
                    color="teal"
                  >
                    {tag.name}
                  </Label>
                ))}
              </Item.Extra>
            </Item.Content>
          </Item>
        </Segment>
      )}
    </div>
  );
}

export default ProductScreen;
