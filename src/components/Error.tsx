import { Flex, Text } from '@chakra-ui/react';

export default function Error() {
  return (
    <Flex
      w="100vw"
      h="100vh"
      justifyContent="center"
      alignItems="center"
      bg="gray.700"
    >
      <Text color="white">There was an error while fetching the data</Text>
    </Flex>
  );
}
