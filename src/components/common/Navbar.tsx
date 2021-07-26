import React from "react";
import {Nav, Navbar, NavDropdown} from "react-bootstrap";
import {Link} from "react-router-dom";
import icon from "../../assets/demo-store-logo.png";
import {StoreType} from "../../types/common/CommonTypes";
import {useDispatch, useSelector} from "react-redux";
import {changeStore} from "../../actions/commonActions";
import {getStoreSelector} from "../../selectors/commonSelectors";

const NavbarComponent = () => {

    const dispatch = useDispatch();

    const storeTitle = useSelector(getStoreSelector);

    const changeStoreType = (storeType: StoreType) => {
        dispatch(changeStore(storeType));
    }

    return (
        <Navbar bg="white" expand="lg" data-testid={"navbar-main"}>
            <Navbar.Brand as={Link} to="/">
                <img src={icon} height="30" alt=""/>
            </Navbar.Brand>
            <NavDropdown title={storeTitle} id="basic-nav-dropdown" data-testid="nav-dropdown">
                <NavDropdown.Item data-testid="dropdown-item-my" onClick={() => changeStoreType(StoreType.MALAYSIA)}>Malaysia</NavDropdown.Item>
                <NavDropdown.Item data-testid="dropdown-item-sg" onClick={() => changeStoreType(StoreType.SINGAPORE)}>Singapore</NavDropdown.Item>
            </NavDropdown>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link as={Link} to="/">
                        Home
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default NavbarComponent;
