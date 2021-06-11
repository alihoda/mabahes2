import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, Grid, Message, Segment } from "semantic-ui-react";

import { productDetail, updateProduct } from "../../actions/productActions";
import { PRODUCT_UPDATE_RESET } from "../../constants/productConstants";

function ProductUpdateScreen({ history, match }) {
  const [message, setMessage] = useState(null);
  const [data, setData] = useState(null);

  const request = window.location.pathname === "/new-product" ? "CREATE" : "UPDATE";

  const dispatch = useDispatch();
  const { userInfo } = useSelector((data) => data.userLogin);
  const { error, success } = useSelector((data) => data.productUpdate);
  const { product: productInfo } = useSelector((data) => data.productDetails);

  useEffect(() => {
    if (!userInfo) {
      setMessage({
        header: "Permission Denied",
        content: "You do not have the permission",
      });
    } else {
      if (request === "UPDATE" && !productInfo) {
        dispatch(productDetail(match.params.id));
      } else if (request === "UPDATE" && productInfo) {
        setData({
          id: productInfo.id,
          title: productInfo.title,
          description: productInfo.description,
          tags: productInfo.tags.map((t) => t.name).toString(),
        });
      }
    }
    // Redirect to user profile if update was successful
    if (success) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      history.push(`/product/${match.params.id}`);
    }
  }, [dispatch, success, userInfo, request, productInfo]);

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(
      updateProduct(
        {
          id: data.id,
          title: data.title,
          description: data.description,
          tags: createTagList(data.tags),
        },
        request
      )
    );
  };

  /**
   * Give a string and convert it to list of slugs
   * @param {sting} text
   * @returns Array
   */
  const createTagList = (text) => {
    var arr = [];
    text.split(",").forEach((str) => {
      arr.push(convertToSlug(str));
    });
    return arr;
  };
  /**
   * Convert a string to slug
   * @param {String} text
   * @returns slug
   */
  const convertToSlug = (text) => {
    return text
      .trim()
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");
  };

  return message ? (
    <Message error header={message.header} content={message.content} />
  ) : (
    <Grid verticalAlign="middle" centered style={{ height: "80vh" }}>
      <Grid.Column style={{ maxWidth: 600 }}>
        <h3>{request === "CREATE" ? "New Product" : "Update Product"}</h3>

        {error && (
          <Message
            error
            header={request === "CREATE" ? "Create New Product Failed" : "Update Product Failed"}
            list={error}
          />
        )}
        <Segment stacked>
          <Form size="large" onSubmit={submitHandler}>
            <Form.Group widths="equal">
              <Form.Input
                fluid
                label="Title"
                value={data && data.title}
                placeholder="Title"
                onChange={(e) => setData({ ...data, title: e.target.value })}
              />

              <Form.Field>
                <label>Image</label>
                <input
                  id="upload"
                  type="file"
                  onChange={(e) => setData({ ...data, thumbnail: e.target.files[0] })}
                />
              </Form.Field>
            </Form.Group>

            <Form.TextArea
              label="Description"
              value={data && data.description}
              placeholder="Write about the product ..."
              onChange={(e) => setData({ ...data, description: e.target.value })}
            />

            <Form.Input
              fluid
              label="Tags"
              value={data && data.tags}
              placeholder="Enter tags. Like django, web, shell, ..."
              onChange={(e) => setData({ ...data, tags: e.target.value })}
            />

            <Button primary type="submit" fluid size="large">
              Submit
            </Button>
          </Form>
        </Segment>
      </Grid.Column>
    </Grid>
  );
}

export default ProductUpdateScreen;
