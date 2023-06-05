import { Flex, Text, HStack } from '@chakra-ui/react';
import Link from 'next/link';

function Header() {
  return (
    <Flex alignContent="center">
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
