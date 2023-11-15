import Carousel from "react-bootstrap/Carousel";

const ProductCarouselComponent = () => {

  const cursorP = {
    cursor: "pointer"
  };

  return (
    <Carousel data-bs-theme="dark">


      <Carousel.Item>
        <img
          className="d-block w-100 carousel-image"
          src="/images/carousel/carousel-1.jpg"
          alt="First slide"
        />
        <Carousel.Caption>
          <a href="/product-details/567" style={cursorP}>
            <h5>First slide label</h5>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </a>
        </Carousel.Caption>
      </Carousel.Item>


      <Carousel.Item>
        <img
          className="d-block w-100 carousel-image"
          src="/images/carousel/carousel-2.gif"
          alt="Second slide"
        />
        <Carousel.Caption>
          <a href="/product-details/667" style={cursorP}>
            <h5>Second slide label</h5>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </a>
        </Carousel.Caption>
      </Carousel.Item>


      <Carousel.Item>
        <img
          className="d-block w-100 carousel-image"
          src="/images/carousel/carousel-3.png"
          alt="Third slide"
        />
        <Carousel.Caption>
          <a href="/product-details/8989" style={cursorP}>
            <h5>Third slide label</h5>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </a>
        </Carousel.Caption>
      </Carousel.Item>

      
    </Carousel>
  );
};

export default ProductCarouselComponent;
