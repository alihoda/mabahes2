import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Header, Icon, Segment } from "semantic-ui-react";

import { getTagInfo } from "../actions/tagActions";
import TagFeed from "../components/TagFeed";

function TagScreen() {
  const dispatch = useDispatch();
  const { tags } = useSelector((state) => state.tagList);

  useEffect(() => {
    dispatch(getTagInfo("LIST", ""));
  }, [dispatch]);

  return !tags ? (
    <Segment loading />
  ) : (
    <div>
      <Segment placeholder raised>
        <Header icon>
          <Icon name="tags" />
          Tags
        </Header>
      </Segment>

      <Segment padded basic>
        <Card.Group>
          <TagFeed tags={tags} />
        </Card.Group>
      </Segment>
    </div>
  );
}

export default TagScreen;
