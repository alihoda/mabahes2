import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from "semantic-ui-react";

import Header from "./components/Header";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/product/ProductScreen";
import LoginScreen from "./screens/auth/LoginScreen";
import RegisterScreen from "./screens/auth/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ProfileUpdateScreen from "./screens/ProfileUpdateScreen";
import ProductUpdateScreen from "./screens/product/ProductUpdateScreen";
import TagScreen from "./screens/TagScreen";
import TagDetail from "./screens/TagDetail";

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Container fluid>
          <Route path="/" component={HomeScreen} exact />
          <Route path="/product/:id" component={ProductScreen} />
          <Route path="/new-product" component={ProductUpdateScreen} />
          <Route path="/update-product/:id" component={ProductUpdateScreen} />

          <Route path="/user/:id" component={ProfileScreen} />
          <Route path="/user-update/:id" component={ProfileUpdateScreen} />

          <Route path="/login" component={LoginScreen} exact />
          <Route path="/register" component={RegisterScreen} exact />

          <Route path="/tags" component={TagScreen} />
          <Route path="/tag/:id" component={TagDetail} />
        </Container>
      </main>
    </Router>
  );
}

export default App;
