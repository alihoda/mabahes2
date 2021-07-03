import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Menu, Segment } from "semantic-ui-react";

import { logout } from "../actions/userActions";

function Header() {
  // For showing active link in navbar
  const [activeItem, setActiveItem] = useState("");
  // Get current logged in user info from its state
  const { userInfo } = useSelector((state) => state.userLogin);

  const dispatch = useDispatch();

  // Change active link in navbar
  const handleItemClick = (e, { name }) => setActiveItem(name);
  /**
   * dispatch user logout action
   */
  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <Segment vertical inverted style={{ padding: "0.5em 0.5em", marginBottom: "1em" }}>
      <Menu pointing secondary inverted size="large">
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
            <Menu.Item icon="sign-out" name="logout" onClick={logoutHandler} />
          </Menu.Menu>
        ) : (
          <Menu.Item
            position="right"
            icon="sign in"
            name="login"
            as={Link}
            to="/login"
            active={activeItem === "login"}
            onClick={handleItemClick}
          />
        )}
      </Menu>
    </Segment>
  );
}

export default Header;
