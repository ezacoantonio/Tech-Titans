import { Alert, Button } from "react-bootstrap";
import { useState } from "react";
import { Link } from "react-router-dom";

const AddedToCartMessageComponent = () => {
  const [show, setShow] = useState(true);
  return (
    <Alert
      show={show}
      variant="danger"
      onClose={() => setShow(false)}
      dismissible
    >
      <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
      <p>
        <Button variant="success">Go Back</Button>{" "}
        <Link to="/cart">
          <Button variant="danger">Go to cart</Button>
        </Link>
      </p>
    </Alert>
  );
};

export default AddedToCartMessageComponent;
