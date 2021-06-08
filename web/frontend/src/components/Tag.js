import React from "react";
import { Link } from "react-router-dom";
import { ItemExtra, Label } from "semantic-ui-react";

function Tag({ product }) {
  return (
    <ItemExtra>
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
    </ItemExtra>
  );
}

export default Tag;
