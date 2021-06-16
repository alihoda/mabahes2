import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, Grid, Message, Segment } from "semantic-ui-react";

import { productDetail, updateProduct } from "../../actions/productActions";
import { PRODUCT_UPDATE_RESET } from "../../constants/productConstants";

function ProductUpdateScreen({ history, match }) {
  const [message, setMessage] = useState(null);
  const [form, setForm] = useState({
    id: "",
    title: "",
    description: "",
    tags: "",
    thumbnail: null,
  });

  const request = window.location.pathname === "/new-product" ? "CREATE" : "UPDATE";

  const dispatch = useDispatch();
  const { userInfo } = useSelector((data) => data.userLogin);
  const { error, success, product } = useSelector((data) => data.productUpdate);
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
        setForm({
          id: productInfo.id,
          title: productInfo.title,
          description: productInfo.description,
          tags: productInfo.tags.map((t) => t.name).toString(),
          thumbnail: null,
        });
      }
    }
    // Redirect to user profile if update was successful
    if (success) {
      history.push(`/product/${product.id}`);
      dispatch({ type: PRODUCT_UPDATE_RESET });
    }
  }, [dispatch, history, success, userInfo, request, productInfo]);

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    // Assign state to formData
    Object.keys(form).map((key) => formData.append(key, form[key]));
    // Slugify tags
    formData.set("tags", JSON.stringify(createTagList(form.tags)));
    if (request === "UPDATE") {
      formData.append("_method", "PUT");
    }

    dispatch(updateProduct(formData, request));
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
                value={form && form.title}
                placeholder="Title"
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />

              <Form.Field>
                <label>Image</label>
                <input
                  id="upload"
                  type="file"
                  onChange={(e) => setForm({ ...form, thumbnail: e.target.files[0] })}
                />
              </Form.Field>
            </Form.Group>

            <Form.TextArea
              label="Description"
              value={form && form.description}
              placeholder="Write about the product ..."
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />

            <Form.Input
              fluid
              label="Tags"
              value={form && form.tags}
              placeholder="Enter tags. Like django, web, shell, ..."
              onChange={(e) => setForm({ ...form, tags: e.target.value })}
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
