import {
  Box,
  Flex,
  HStack,
  Link,
  IconButton,
  Icon,
  Text,
  useDisclosure,
  Button,
  Stack,
  useColorModeValue as mode,
  useColorMode,
  MenuButton,
  MenuDivider,
  Menu,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import { Link as ReactLink } from 'react-router-dom';
import { HamburgerIcon, CloseIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';
import { GiTechnoHeart } from 'react-icons/gi';
import { useSelector } from 'react-redux';
import { FiShoppingCart } from 'react-icons/fi';

const ShoppingCartIcon = () => {
  const cartInfo = useSelector((state) => state.cart);
  const { cart } = cartInfo;
  return (
    <Flex>
      <Text fontStyle='italic' as='sub' fontSize='xs'>
        {cart.length}
      </Text>
      <Icon ml='-1.5' as={FiShoppingCart} h='4' w='7' alignSelf='center' />
      Cart
    </Flex>
  );
};

const links = [
  { linkName: 'Products', path: '/products' },
  { linkName: <ShoppingCartIcon />, path: '/cart' },
];

const NavLink = ({ path, children }) => (
  <Link
    as={ReactLink}
    to={path}
    p={2}
    rounded='md'
    _hover={{ textDecoration: 'none', bg: mode('gray.200', 'gray.700') }}>
    {children}
  </Link>
);

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <Box bg={mode('gray.100', 'gray.900')} px={4}>
      <Flex h={16} alignItems='center' justifyContent='space-between'>
        <IconButton
          size='md'
          display={{ md: 'none' }}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          onClick={isOpen ? onClose : onOpen}
        />

        <HStack>
          <Link as={ReactLink} to='/' style={{ textDecoration: 'none' }}>
            <Flex alignItems='center'>
              <Icon as={GiTechnoHeart} h={6} w={6} color={'orange.400'} />
              <Text fontWeight='extrabold'>Tech Lines</Text>
            </Flex>
          </Link>
          <HStack as='nav' spacing={4} display={{ base: 'none', md: 'flex' }}>
            {links.map((link) => (
              <NavLink key={link.linkName} path={link.path}>
                {link.linkName}
              </NavLink>
            ))}
          </HStack>
        </HStack>
        <Flex alignItems='center'>
          <NavLink>
            <Icon
              as={colorMode === 'light' ? MoonIcon : SunIcon}
              onClick={() => toggleColorMode()}
              alignSelf='center'
            />
          </NavLink>

          <>
            <Button as={ReactLink} to='/login' p={2} fontSize='sm' fontWeight={400} variant='link'>
              Sign In
            </Button>
            <Button
              as={ReactLink}
              to='/registration'
              m={2}
              display={{ base: 'none', md: 'inline-flex' }}
              fontSize='sm'
              fontWeight={600}
              _hover={{ bg: 'orange.400' }}
              bg='orange.500'
              color='white'>
              Sign Up
            </Button>
          </>
        </Flex>
      </Flex>
      {isOpen ? (
        <Box pb={4} display={{ md: 'none' }}>
          <Stack as='nav' spacing={4}>
            {links.map((link) => (
              <NavLink key={link.linkName} path={link.path}>
                {link.linkName}
              </NavLink>
            ))}
            <NavLink key='sign up' path='registration'>
              Sign Up
            </NavLink>
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
};

export default Navbar;
