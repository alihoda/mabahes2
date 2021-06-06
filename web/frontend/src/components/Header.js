import React from "react";
import { Link } from "react-router-dom";

import { Button, Icon, Menu } from "semantic-ui-react";

function Header() {
    return (
        <Menu>
            <Menu.Item header as={Link} to="/">
                Home
            </Menu.Item>
            <Menu.Menu position="right">
                <Menu.Item>
                    <Button primary icon labelPosition="left">
                        <Icon name="user" />
                        Login
                    </Button>
                </Menu.Item>
            </Menu.Menu>
        </Menu>
    );
}

export default Header;
