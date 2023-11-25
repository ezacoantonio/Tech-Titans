import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function ProductDetailPage() {
  const [product, setProduct] = useState(null);
  const { productId } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:5000/products/listproduct/${productId}`);
        console.log(productId);
        const data = await response.json();
        if (response.ok) {
            setProduct(data.product);
        } else {
          console.error('Error fetching product:', data.message);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchProduct();
  }, [productId]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{product.name}</h1>
      <img src={product.imageUrls[0]} alt={product.name} />
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      {/* Add more product details as needed */}
    </div>
  );
}

export default ProductDetailPage;
