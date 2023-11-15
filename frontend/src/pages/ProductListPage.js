import { Button} from "react-bootstrap";
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import ProductForListComponent from "../Components/ProductForListComponent";
import PaginationComponent from "../Components/PaginationComponent";
import SortOptionsComponent from "../Components/SortOptionsComponent";
import PriceFilterComponent from "../Components/FilterQueryResultComponent.js/PriceFilterComponent";
import RatingFilterComponent from "../Components/FilterQueryResultComponent.js/RatingFilterComponent";
import CategoryFilterComponent from "../Components/FilterQueryResultComponent.js/CategoryFilterComponent";
import AttributesFilterComponent from "../Components/FilterQueryResultComponent.js/AttributesFilterComponent";

const ProductListPage = () => {
  return (
    <Container fluid>
      <Row>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item className="mb-3 mt-3">
              <SortOptionsComponent />
            </ListGroup.Item>
            <ListGroup.Item>
              FILTER: <br />
              <PriceFilterComponent />
            </ListGroup.Item>
            <ListGroup.Item>
              <RatingFilterComponent />
            </ListGroup.Item>
            <ListGroup.Item>
              <CategoryFilterComponent />
            </ListGroup.Item>
            <ListGroup.Item>
              <AttributesFilterComponent />
            </ListGroup.Item>
            <ListGroup.Item>
              <Button variant="primary">Filter</Button>
              <Button variant="danger">Reset filters</Button>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={9}>
          {Array.from({ length: 5 }).map((_, idx) => (
            <ProductForListComponent
              key={idx}
              images={["Book.webp", "Cameras.webp", "printer.jpg", "software.webp", "Tablets.jpg"]}
              idx={idx}
            />
          ))}
          <PaginationComponent />
        </Col>
      </Row>
    </Container>
  );
};

export default ProductListPage;
