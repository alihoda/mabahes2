import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Header, Segment } from "semantic-ui-react";

import Product from "../components/Product";
import { listProduct } from "../actions/productActions";

function HomeScreen() {
  // Get all products from productList state
  const { products } = useSelector((state) => state.productList);

  const dispatch = useDispatch();
  // Dispatch listProduct action to get all products
  useEffect(() => {
    dispatch(listProduct());
  }, [dispatch]);

  return (
    <div>
      <Segment vertical inverted style={{ minHeight: 600, padding: "1em 0em" }}>
        <Header
          as="h1"
          textAlign="center"
          content="Here Is Where You Introduce Your Projects"
          inverted
          style={{
            fontSize: "4em",
            fontWeight: "normal",
            marginBottom: 0,
            marginTop: "4em",
          }}
        />
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
