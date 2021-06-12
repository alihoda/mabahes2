import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Icon, Menu } from "semantic-ui-react";

import { logout } from "../actions/userActions";

function Header() {
  const [activeItem, setActiveItem] = useState("HOME");

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
  };

  const handleItemClick = (e, { name }) => setActiveItem(name);

  return (
    <Menu size="large" color="teal">
      <Menu.Item
        icon="home"
        name="home"
        as={Link}
        to="/"
        active={activeItem === "home"}
        onClick={handleItemClick}
      />
      <Menu.Item
        icon="tags"
        name="tags"
        as={Link}
        to="/tags"
        active={activeItem === "tags"}
        onClick={handleItemClick}
      />

      {userInfo ? (
        <Menu.Menu position="right">
          <Menu.Item
            icon="plus"
            name="new product"
            as={Link}
            to="/new-product"
            active={activeItem === "new product"}
            onClick={handleItemClick}
          />
          <Menu.Item
            icon="user"
            name={userInfo.name}
            as={Link}
            to={`/user/${userInfo.id}`}
            active={activeItem === `${userInfo.name}`}
            onClick={handleItemClick}
          />
          <Menu.Item icon="power off" name="logout" onClick={logoutHandler} />
        </Menu.Menu>
      ) : (
        <Menu.Menu position="right">
          <Menu.Item
            icon="user"
            name="login"
            as={Link}
            to="/login"
            active={activeItem === "login"}
            onClick={handleItemClick}
          />
        </Menu.Menu>
      )}
    </Menu>
  );
}

export default Header;
