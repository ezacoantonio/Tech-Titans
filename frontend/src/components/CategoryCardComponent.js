import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const CategoryCardComponent = (category, idx) => {
  const images = [
    "/images/products/Cameras.webp",
    "/images/products/Printers.webp",
    "/images/products/software.webp",
    "/images/products/Tablets.webp",
    "/images/products/Book.webp",
  ];

  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src="/images/products/Cameras.webp" />

      <Card.Body>
        <Card.Title>Title</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>

        <a href="/product-list">
          <Button variant="primary">Product Details</Button>
        </a>
      </Card.Body>
    </Card>
  );
};

export default CategoryCardComponent;
