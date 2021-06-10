import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from "semantic-ui-react";

import Header from "./components/Header";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import LoginScreen from "./screens/auth/LoginScreen";
import RegisterScreen from "./screens/auth/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ProfileUpdateScreen from "./screens/ProfileUpdateScreen";

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Container fluid>
          <Route path="/" component={HomeScreen} exact />
          <Route path="/product/:id" component={ProductScreen} />

          <Route path="/user/:id" component={ProfileScreen} />
          <Route path="/user-update/:id" component={ProfileUpdateScreen} />

          <Route path="/login" component={LoginScreen} />
          <Route path="/register" component={RegisterScreen} />
        </Container>
      </main>
    </Router>
  );
}

export default App;
