import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Header, Segment } from "semantic-ui-react";

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
      <Segment vertical style={{ minHeight: 300, padding: "1em 0em", margin: "1em 0em" }}>
        <Header
          as="h1"
          textAlign="center"
          content="Tags"
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
          <TagFeed tags={tags} />
        </Card.Group>
      </Segment>
    </div>
  );
}

export default TagScreen;
