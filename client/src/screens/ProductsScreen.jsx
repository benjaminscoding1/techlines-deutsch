import {
  Center,
  Wrap,
  WrapItem,
  Spinner,
  Stack,
  Alert,
  AlertIcon,
  AlertDescription,
  AlertTitle,
} from '@chakra-ui/react';
import { products } from '../products';
import { useEffect } from 'react';
import ProductCard from '../components/ProductCard';

const ProductsScreen = () => {
  useEffect(() => {
    console.log(products);
  });

  return (
    <Wrap spacing='30px' justify='center' minH='100vh'>
      {products &&
        products.map((product) => (
          <WrapItem key={product._id}>
            <Center w='250px' h='550px'>
              <ProductCard product={product} />
            </Center>
          </WrapItem>
        ))}
    </Wrap>
  );
};

export default ProductsScreen;
