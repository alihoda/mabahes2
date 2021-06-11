import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Header, Segment } from "semantic-ui-react";

import Product from "../components/Product";
import { listProduct } from "../actions/productActions";

function HomeScreen() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { products } = productList;

  useEffect(() => {
    dispatch(listProduct());
  }, [dispatch]);

  return (
    <div>
      <Segment placeholder>
        <Header textAlign="center" as="h1">
          Here Is Where You Introduce Your Projects
        </Header>
      </Segment>

      {!products ? (
        <Segment loading />
      ) : (
        <Segment basic padded="very">
          <Card.Group>
            {products.map((product) => (
              <Product key={product.id} product={product} />
            ))}
          </Card.Group>
        </Segment>
      )}
    </div>
  );
}

export default HomeScreen;
