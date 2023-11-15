import { Card, Button } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Rating } from "react-simple-star-rating";

const ProductForListComponent = ({ images, idx }) => {
  return (
    <Card style={{ marginTop: "30px", marginBottom: "50px" }}>
      <Row>
        <Col lg={5}>

          <Card.Img
            variant="top"
            src={"/images/products/" + images[idx]} //+ "-category.png"
          />

        </Col>

        <Col lg={7}>

          <Card.Body>

            <Card.Title>Product Name Lorem ipsum dolor sit amet</Card.Title>

            <Card.Text>
              Product Description Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Magni ipsa ducimus architecto explicabo id
              accusantium nihil exercitationem autem porro esse.
            </Card.Text>

            <Card.Text>
              <Rating readonly size={20} initialValue={5} /> (1)
            </Card.Text>

            <Card.Text className="h4">
              $124{" "}
              <a href="/product-details/667">
                <Button variant="danger">See product</Button>
              </a>
            </Card.Text>

          </Card.Body>

        </Col>
      </Row>
    </Card>
  );
};

export default ProductForListComponent;
