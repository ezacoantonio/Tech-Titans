import { Rating } from "react-simple-star-rating";
import Form from "react-bootstrap/Form";

const RatingFilterComponent = () => {
  return (
    <>
      <span className="fw-bold">Rating</span>
      {Array.from({ length: 5 }).map((_, idx) => (
        <Form.Check type="checkbox" id={`check-api-`}>
          {/* <Form.Check.Input type="checkbox" isValid> */}
            <Form.Check.Label style={{ cursor: "pointer" }}>
              <Rating readonly size={20} initialValue={5-idx} />
            </Form.Check.Label>
          {/* </Form.Check.Input> */}
        </Form.Check>
      ))}
    </>
  );
};

export default RatingFilterComponent;
