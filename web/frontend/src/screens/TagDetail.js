import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Header, Segment } from "semantic-ui-react";

import { getTagInfo } from "../actions/tagActions";
import Product from "../components/Product";

function TagDetail({ match }) {
  const dispatch = useDispatch();
  const { tag } = useSelector((state) => state.tagDetail);

  useEffect(() => {
    dispatch(getTagInfo("DETAIL", match.params.id));
  }, [dispatch, match]);

  return !tag ? (
    <Segment loading />
  ) : (
    <div>
      <Segment vertical style={{ minHeight: 300, padding: "1em 0em", margin: "1em 0em" }}>
        <Header
          as="h1"
          textAlign="center"
          content={tag.name}
          style={{
            fontSize: "4em",
            fontWeight: "normal",
            marginBottom: 0,
            marginTop: "1.75em",
          }}
        />
      </Segment>

      <Segment padded basic>
        <Card.Group>
          {tag.products.map((product) => (
            <Product product={product} />
          ))}
        </Card.Group>
      </Segment>
    </div>
  );
}

export default TagDetail;
