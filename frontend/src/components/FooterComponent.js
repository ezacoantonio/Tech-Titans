import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const FooterComponent = () => {
  return (
    <footer>
      <Container fluid>
        <Row className="mt-5">
          <Col className="bg-dark text-white text-center py-5">
            Copyright &copy; Best Online Shop
          </Col>
        </Row>
      </Container>
    </footer>
  );
};


export default FooterComponent;