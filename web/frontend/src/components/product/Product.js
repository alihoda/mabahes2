import React from "react";
import { Link } from "react-router-dom";
import { Card, Image, Item, Label } from "semantic-ui-react";

function Product({ product }) {
    return (
        <Card>
            <Image src={product.image} alt={product.name} wrapped ui={false} />

            <Card.Content>
                <Image floated="right" size="mini" src={product.user.avatar} />
                <Card.Header>{product.name}</Card.Header>
                <Card.Meta as={Link} to={`/users/${product.user.id}`}>
                    {product.user.name}
                </Card.Meta>
                <Card.Description>{product.description}</Card.Description>
            </Card.Content>

            <Card.Content extra>
                <Item.Extra>
                    {product.tags.map((tag) => (
                        <Label
                            key={tag.id}
                            as={Link}
                            to={`/tags/${tag.id}`}
                            style={{ marginBottom: "0.5em" }}
                        >
                            {tag.name}
                        </Label>
                    ))}
                </Item.Extra>
            </Card.Content>
        </Card>
    );
}

export default Product;
