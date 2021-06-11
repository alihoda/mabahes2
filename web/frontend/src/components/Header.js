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

      {userInfo ? (
        <Menu.Menu position="right">
          <Menu.Item>
            <Button
              content="New Product"
              icon="plus"
              labelPosition="left"
              as={Link}
              to="/new-product"
            />
          </Menu.Item>

          <Menu.Item>
            <Button.Group>
              {/* User profile button */}
              <Button
                primary
                content={userInfo.name}
                icon="user"
                labelPosition="left"
                as={Link}
                to={`/user/${userInfo.id}`}
              />
              {/* Logout button */}
              <Button icon="power off" color="purple" onClick={logoutHandler} />
            </Button.Group>
          </Menu.Item>
        </Menu.Menu>
      ) : (
        <Menu.Menu position="right">
          <Menu.Item>
            <Button primary icon labelPosition="left" as={Link} to={"/login"}>
              <Icon name="user" />
              Login
            </Button>
          </Menu.Item>
        </Menu.Menu>
      )}
    </Menu>
  );
}

export default Header;
