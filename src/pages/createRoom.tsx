import { useForm } from 'react-hook-form';
import {
  Box,
  Heading,
  FormLabel,
  Input,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
} from '@chakra-ui/react';

import { useCreateClassroom } from '@/hooks/useCreateClassroom';

interface Classroom {
  name: string;
  capacity: number;
}

export default function AddClassroom() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Classroom>();

  const createClassroomMutation = useCreateClassroom();

  const onSubmit = async (data: Classroom) => {
    try {
      await createClassroomMutation.mutateAsync(data);

      reset();
    } catch (error) {
      console.error('Error adding classroom:', error);
    }
  };

  return (
    <Flex
      w="100vw"
      h="100vh"
      justifyContent="center"
      alignItems="center"
      bg="gray.700"
    >
      <Box bg="white" p={8} borderRadius="md" boxShadow="md">
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl isInvalid={!!errors.name}>
            <FormLabel>Name:</FormLabel>
            <Input
              type="text"
              {...register('name', { required: 'Name is required' })}
            />
            <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.capacity} mt={4}>
            <FormLabel>Capacity:</FormLabel>
            <Input
              type="number"
              {...register('capacity', {
                required: 'Capacity is required',
                min: { value: 1, message: 'Capacity must be more than zero' },
              })}
            />
            <FormErrorMessage>{errors.capacity?.message}</FormErrorMessage>
          </FormControl>
          <Button type="submit" mt={6} colorScheme="blue">
            Add Classroom
          </Button>
        </form>
        {createClassroomMutation.isError && (
          <Box mt={4} color="red.500">
            There was an error creating the classroom
          </Box>
        )}
      </Box>
    </Flex>
  );
}
