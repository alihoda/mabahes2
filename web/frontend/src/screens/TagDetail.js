import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Header, Icon, Segment } from "semantic-ui-react";

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
      <Segment placeholder raised>
        <Header icon>
          <Icon name="tag" />
          {tag.name}
        </Header>
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
