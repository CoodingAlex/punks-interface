import { Link as DefaultLink, useColorModeValue } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export const NavLink = ({ children, ...props }: any) => (
  <DefaultLink
    px={2}
    py={1}
    to={{ pathname: '/' }}
    as={Link}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('gray.200', 'gray.700'),
    }}
    {...props}
  >
    {children}
  </DefaultLink>
);
