import { Flex, Text, HStack } from '@chakra-ui/react';
import Link from 'next/link';

function Header() {
  return (
    <Flex align="center" py={4} px={8} bg="gray.800" color="white">
      <HStack spacing={6}>
        <Link href="/">
          <Text
            fontWeight={600}
            fontSize="md"
            _hover={{ textDecoration: 'underline' }}
          >
            Home
          </Text>
        </Link>
        <Link href="/createRoom">
          <Text
            fontWeight={600}
            fontSize="md"
            _hover={{ textDecoration: 'underline' }}
          >
            Create Classroom
          </Text>
        </Link>
        <Link href="/createStudent">
          <Text
            fontWeight={600}
            fontSize="md"
            _hover={{ textDecoration: 'underline' }}
          >
            Add Student
          </Text>
        </Link>
      </HStack>
    </Flex>
  );
}

export default Header;
