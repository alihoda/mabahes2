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
              {/* User profile button */}
              <Button primary animated="fade" as={Link} to={`/user/${userInfo.user.id}`}>
                <Button.Content visible>{userInfo.user.name}</Button.Content>
                <Button.Content hidden>Profile</Button.Content>
              </Button>
              {/* Logout button */}
              <Button animated="fade" color="purple" onClick={logoutHandler}>
                <Button.Content hidden>Logout</Button.Content>
                <Button.Content visible>
                  <Icon name="power off" />
                </Button.Content>
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
