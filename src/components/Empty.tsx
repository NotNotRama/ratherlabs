import { Flex, Text } from '@chakra-ui/react';

export function Empty({ str }: { str: String }) {
  return (
    <Flex
      w="100vw"
      h="100vh"
      justifyContent="center"
      alignItems="center"
      bg="gray.700"
      color="white"
    >
      <Text>{str}</Text>
    </Flex>
  );
}
