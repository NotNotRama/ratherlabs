import { useForm } from 'react-hook-form';
import {
  Box,
  FormLabel,
  Input,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  Select,
} from '@chakra-ui/react';
import { useClassrooms } from '@/hooks/useClassrooms';
import { useCreateStudent } from '@/hooks/useCreateStudent';
import { Classroom, Student } from '@/types';

export default function AddStudent() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Student>();
  const { isFetching, isError, data } = useClassrooms();

  const createStudentMutation = useCreateStudent();

  const onSubmit = async (student: Student) => {
    try {
      await createStudentMutation.mutateAsync(student);

      reset();
    } catch (error) {
      console.error('Error adding student:', error);
    }
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (/\d/.test(value)) {
      // Remove any numbers from the input value
      event.target.value = value.replace(/\d/g, '');
    }
  };

  if (isFetching) return <div>Fetching data..</div>;
  if (isError) return <div>There was an error fetching the data</div>;

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
          <FormControl isInvalid={!!errors.name} mb={4}>
            <FormLabel>Name:</FormLabel>
            <Input
              type="text"
              {...register('name', { required: true })}
              onChange={handleNameChange}
            />
            <FormErrorMessage>This field is required</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.age} mb={4}>
            <FormLabel>Age:</FormLabel>
            <Input
              type="number"
              {...register('age', { required: true, min: 1 })}
              pattern="\d*"
            />
            <FormErrorMessage>
              This field is required and must be a positive number
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.gender} mb={4}>
            <FormLabel>Gender:</FormLabel>
            <Select {...register('gender', { required: true })}>
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </Select>
            <FormErrorMessage>This field is required</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.room} mb={4}>
            <FormLabel>Room:</FormLabel>
            <Select {...register('room', { required: true })}>
              <option value="">Select</option>
              {data.map((room: Classroom) => {
                if (room.students.length >= room.capacity) return;

                return (
                  <option key={room.id} value={room.name}>
                    {room.name}
                  </option>
                );
              })}
            </Select>
            <FormErrorMessage>This field is required</FormErrorMessage>
          </FormControl>
          <Button type="submit" mt={6} colorScheme="blue">
            Add Student
          </Button>
        </form>
        {createStudentMutation.isError && (
          <Box mt={4} color="red.500">
            There was an error creating the student
          </Box>
        )}
      </Box>
    </Flex>
  );
}
