import React from "react";
import { Link } from "react-router-dom";
import { Card, Feed, Icon } from "semantic-ui-react";

function TagFeed({ tags }) {
  return tags.map((tag) => (
    <Card key={tag.id} color="teal">
      <Card.Content>
        <Card.Header content={tag.name} as={Link} to={`/tag/${tag.id}`} />
      </Card.Content>

      <Card.Content>
        {tag.products.map((product) => (
          <Feed key={product.id}>
            <Feed.Event
              image={
                product.image
                  ? product.image.url
                  : "https://react.semantic-ui.com/images/avatar/small/elliot.jpg"
              }
              date={product.createdAt}
              summary={<Link to={`/product/${product.id}`}>{product.title}</Link>}
              extraText={product.description}
            />
          </Feed>
        ))}
      </Card.Content>
      <Card.Content extra>
        <Icon name="list" /> {tag.count} Products
      </Card.Content>
    </Card>
  ));
}

export default TagFeed;
