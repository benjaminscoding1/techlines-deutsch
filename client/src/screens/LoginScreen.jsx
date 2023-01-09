import {
  Box,
  Button,
  Container,
  FormControl,
  Heading,
  HStack,
  Stack,
  Text,
  useBreakpointValue,
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  useToast,
} from '@chakra-ui/react';
import { useEffect } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link as ReactLink, useLocation } from 'react-router-dom';
import { login } from '../redux/actions/userActions';
import TextField from '../components/TextField';
import PasswordTextField from '../components/PasswordTextField';

const LoginScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const redirect = '/products';
  const toast = useToast();

  const headingBr = useBreakpointValue({ base: 'sm', md: 'md' });
  const boxBr = useBreakpointValue({ base: 'transparent', md: 'bg-surface' });

  const user = useSelector((state) => state.user);
  const { loading, error, userInfo } = user;

  useEffect(() => {
    if (userInfo) {
      if (location.state?.from) {
        navigate(location.state.from);
      } else {
        navigate(redirect);
      }
      toast({ description: 'Login successful.', status: 'success', isClosable: true });
    }
  }, [userInfo, redirect, navigate, location.state, toast, error]);

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={Yup.object({
        email: Yup.string().email('Invalid email.').required('An email address is required.'),
        password: Yup.string()
          .min(1, 'Password is too short - must contain at least 1 character.')
          .required('Password is required.'),
      })}
      onSubmit={(values) => {
        dispatch(login(values.email, values.password));
      }}>
      {(formik) => (
        <Container maxW='lg' py={{ base: '12', md: '24' }} px={{ base: '0', md: '8' }} minH='4xl'>
          <Stack spacing='8'>
            <Stack spacing='6'>
              <Stack spacing={{ base: '2', md: '3' }} textAlign='center'>
                <Heading size={headingBr}>Log in to your account</Heading>
                <HStack spacing='1' justify='center'>
                  <Text color='muted'>Don't have an account ?</Text>
                  <Button as={ReactLink} to='/registration' variant='link' colorScheme='orange'>
                    Sign up
                  </Button>
                </HStack>
              </Stack>
            </Stack>

            <Box
              py={{ base: '0', md: '8' }}
              px={{ base: '4', md: '10' }}
              bg={{ boxBr }}
              boxShadow={{ base: 'none', md: 'xl' }}>
              <Stack spacing='6' as='form' onSubmit={formik.handleSubmit}>
                {error && (
                  <Alert
                    status='error'
                    flexDirection='column'
                    alignItems='center'
                    justifyContent='center'
                    textAlign='center'>
                    <AlertIcon />
                    <AlertTitle>We are sorry!</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                <Stack spacing='5'>
                  <FormControl>
                    <TextField type='text' name='email' placeholder='you@example.com' label='Email' />
                    <PasswordTextField type='password' name='password' placeholder='your password' label='Password' />
                  </FormControl>
                </Stack>
                <Stack spacing='6'>
                  <Button colorScheme='orange' size='lg' fontSize='md' isLoading={loading} type='submit'>
                    Sign in
                  </Button>
                </Stack>
              </Stack>
            </Box>
          </Stack>
        </Container>
      )}
    </Formik>
  );
};

export default LoginScreen;
