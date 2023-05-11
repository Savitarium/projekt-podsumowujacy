import {NavLink} from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";

const NavBar = () => {
    return (
        <Navbar bg="primary" variant="dark" expand="lg" className="mt-4 mb-4 rounded">
            <Nav className="me-auto">
                <Navbar.Brand as={NavLink} to="/" className="mx-4">Waiter.app</Navbar.Brand>
            </Nav>
            <Nav className="justify-content-end mx-4">
                <Nav.Link as={NavLink} to="/">Home</Nav.Link>
            </Nav>
        </Navbar>
    )
}
export default NavBar;