import ProductCarouselComponent from "../Components/ProductCarouselComponent";
import CategoryCardComponent from "../Components/CategoryCardComponent";
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';


const HomePage = () => {
   const categories = [
    "Tablets", "Monitors", "Printers", "Software", "Cameras"
   ]

  return (
    <>
      <ProductCarouselComponent />

      <Container>
        <Row xs={1} md={2} className="g-4 mt-5" style={{gap: "20px"}}>
           {categories.map(()=> {
              return <CategoryCardComponent/> 
              // key={idx} category={category} idx={idx}======category, idx
              })
           }
        </Row>
      </Container>

    </>
  );
};

export default HomePage;