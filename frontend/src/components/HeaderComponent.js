import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Badge from "react-bootstrap/Badge";
import Form from "react-bootstrap/Form";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/esm/Button";
import InputGroup from "react-bootstrap/InputGroup";
import {Link} from "react-router-dom";
import {LinkContainer} from "react-router-bootstrap";



const HeaderComponent = () => {
  return (
    <Navbar
      bg="dark"
      data-bs-theme="dark"
      collapseOnSelect
      expand="lg"
      className="bg-body-dark"
    >
      <Container>
        {/* <LinkContainer to="/"> */}
        <Navbar.Brand href="/">BEST-ONLINE-SHOP</Navbar.Brand>
        {/* </LinkContainer> */}
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
            
          <InputGroup>
            <DropdownButton id="dropdown-basic-button" title="All">
              <Dropdown.Item>Electronics</Dropdown.Item>
              <Dropdown.Item>Books</Dropdown.Item>
              <Dropdown.Item>Cars</Dropdown.Item>
              <Dropdown.Item>Clothes</Dropdown.Item>
            </DropdownButton>
            <Form.Control type="text" placeholder="Search In Shop ..." />
            <Button variant="warning"><i className="bi bi-search text-dark"></i></Button>

         </InputGroup>
         </Nav>
         <Nav>            
            <Nav.Link href="/admin/orders">
                Admin
                <span className="position-absolute top-1 start-10 translate-middle 
                p-2 bg-danger border border-light rounded-circle"></span>
            </Nav.Link>


            <NavDropdown title="John Doe" id="collasible-nav-dropdown">
              <NavDropdown.Item eventKey="/user/my-orders" href="/user/my-orders">My Orders</NavDropdown.Item>
              <NavDropdown.Item eventKey="/user" href="/user">My Profile</NavDropdown.Item>
              <NavDropdown.Item eventKey="/user" href="/user">Log Out</NavDropdown.Item>
            </NavDropdown>

            
            <Nav.Link href="/login">Login</Nav.Link>
            <Nav.Link href="/register">Register</Nav.Link>
            <Nav.Link href="/cart">
            <Badge pill bg="danger">
                2
              </Badge>
              <i className="bi bi-cart-check"></i>
              <span className="ms-1">CART</span>
            </Nav.Link>


          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default HeaderComponent;
