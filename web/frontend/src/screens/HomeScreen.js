import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Header, Segment } from "semantic-ui-react";

import Product from "../components/product/Product";
import { listProducts } from "../actions/productActions";

function HomeScreen() {
    const dispatch = useDispatch();
    const productList = useSelector((state) => state.productList);
    const { error, loading, products } = productList;

    useEffect(() => {
        dispatch(listProducts());
    }, [dispatch]);

    return (
        <div>
            <Segment placeholder>
                <Header textAlign="center" as="h1">
                    Here Is Where You Introduce Your Projects
                </Header>
            </Segment>

            <Segment vertical>
                <Card.Group>
                    {products.map((product) => (
                        <Product key={product.id} product={product} />
                    ))}
                </Card.Group>
            </Segment>
        </div>
    );
}

export default HomeScreen;
