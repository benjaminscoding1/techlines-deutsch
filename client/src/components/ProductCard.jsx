import {
  Flex,
  Circle,
  Box,
  Image,
  Badge,
  useColorModeValue as mode,
  Icon,
  Button,
  Tooltip,
  Stack,
  Link,
  HStack,
  Text,
} from '@chakra-ui/react';
import { FiShoppingCart } from 'react-icons/fi';
import { Link as ReactLink } from 'react-router-dom';
import { StarIcon } from '@chakra-ui/icons';

const ProductCard = ({ product }) => {
  return (
    <Stack
      p='2'
      spacing='3px'
      bg={mode('white', 'gray.900')}
      minW='240px'
      h='450px'
      borderWidth='1px'
      rounded='lg'
      shadow='lg'
      position='relative'>
      <Image p='4' src={product.image} alt={product.name} roundedTop='lg' />

      <Box flex='1' maxH='5' alignItems='baseline'>
        {product.stock <= 0 && (
          <Badge rounded='full' px='2' fontSize='0.8em' colorScheme='red'>
            Sold out
          </Badge>
        )}
        {product.productIsNew && (
          <Badge rounded='full' px='2' fontSize='0.8em' colorScheme='green'>
            New
          </Badge>
        )}
      </Box>
      <Flex mt='1' justifyContent='space-between' alignContent='center'>
        <Link as={ReactLink} to={`/product/${product._id}`} pt='2' cursor='pointer'>
          <Box fontSize='2xl' fontWeight='semibold' lineHeight='tight'>
            {product.name}
          </Box>
        </Link>
      </Flex>
      <Flex justifyContent='space-between' alignContent='center' py='2'>
        <Flex>
          <HStack spacing='2px'>
            <StarIcon color='orange.500' />
            <StarIcon color={product.rating >= 2 ? 'orange.500' : 'gray.200'} />
            <StarIcon color={product.rating >= 3 ? 'orange.500' : 'gray.200'} />
            <StarIcon color={product.rating >= 4 ? 'orange.500' : 'gray.200'} />
            <StarIcon color={product.rating >= 5 ? 'orange.500' : 'gray.200'} />
          </HStack>
          <Text fontSize='md' fontWeight='bold' ml='4px'>{`${product.numberOfReviews} ${
            product.numberOfReviews === 1 ? 'Review' : 'Reviews'
          } `}</Text>
        </Flex>
      </Flex>
      <Flex justify='space-between'>
        <Box fontSize='2xl' color={mode('gray.800', 'white')}>
          <Box as='span' color='gray.600' fontSize='lg'>
            $
          </Box>
          {product.price}
        </Box>
        <Tooltip label='Add to cart' bg='white' color='gray.800' fontSize='1.2em'>
          <Button variant='ghost' display='flex' disabled={product.stock <= 0} onClick={() => {}}>
            <Icon as={FiShoppingCart} h='6' w='6' alignSelf='center' />
          </Button>
        </Tooltip>
      </Flex>
    </Stack>
  );
};

export default ProductCard;
