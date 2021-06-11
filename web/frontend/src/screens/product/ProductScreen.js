import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Segment, Grid } from "semantic-ui-react";

import { productDetail } from "../../actions/productActions";
import Product from "../../components/Product";

function ProductScreen({ match }) {
  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const { product } = productDetails;

  useEffect(() => {
    dispatch(productDetail(match.params.id));
  }, [dispatch, match]);

  return (
    <div>
      {!product ? (
        <Segment loading />
      ) : (
        <Grid centered style={{ height: "80vh" }} verticalAlign="middle">
          <Grid.Column style={{ maxWidth: 600 }}>
            <Product product={product} fluid={true} />
          </Grid.Column>
        </Grid>
      )}
    </div>
  );
}

export default ProductScreen;
