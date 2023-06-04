import { Box, Flex, Text, Link, HStack } from '@chakra-ui/react';
import NextLink from 'next/link';

interface NavItemProps {
  href: string;
  label: string;
}

function NavItem({ href, label }: NavItemProps) {
  return (
    <Box as="li">
      <NextLink href={href}>
        <Link color="blue.500" fontWeight="bold">
          {label}
        </Link>
      </NextLink>
    </Box>
  );
}

function Header() {
  return (
    <Flex alignContent="center" justify="space-between">
      <Link href="/">
        <HStack spacing={20}>
          <Text fontWeight={600} fontSize={20}>
            Rather Labs
          </Text>
        </HStack>
      </Link>
      <HStack spacing={20}>
        <Link href="/">
          <Text fontWeight={600} fontSize={16}>
            Home
          </Text>
        </Link>
        <Link href="/createRoom">
          <Text fontWeight={600} fontSize={16}>
            Create classroom
          </Text>
        </Link>
        <Link href="/createStudent">
          <Text fontWeight={600} fontSize={16}>
            Add student
          </Text>
        </Link>
      </HStack>
    </Flex>
  );
}

export default Header;
