import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, Icon, Menu } from "semantic-ui-react";

import { logout } from "../actions/userActions";

function Header() {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <Menu>
      <Menu.Item header as={Link} to="/">
        Home
      </Menu.Item>
      <Menu.Menu position="right">
        {userInfo ? (
          <Menu.Item>
            <Button.Group>
              <Button primary icon labelPosition="left" as={Link} to={"/profile"}>
                <Icon name="user" />
                Profile
              </Button>

              <Button.Or />

              <Button color="red" icon labelPosition="right" onClick={logoutHandler}>
                <Icon name="power off" />
                Logout
              </Button>
            </Button.Group>
          </Menu.Item>
        ) : (
          <Menu.Item>
            <Button primary icon labelPosition="left" as={Link} to={"/login"}>
              <Icon name="user" />
              Login
            </Button>
          </Menu.Item>
        )}
      </Menu.Menu>
    </Menu>
  );
}

export default Header;
