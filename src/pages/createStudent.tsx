import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import axios from 'axios';
import { useClassrooms } from '@/hooks/useClassrooms';

import { Box, Heading, FormLabel, Input, Button } from '@chakra-ui/react';

interface Student {
  name: string;
  age: number;
  gender: string;
  room: string;
}

interface Classroom {
  id: number;
  name: string;
  capacity: number;
  students: Student[];
}

export default function AddStudent() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Student>();
  const queryClient = useQueryClient();
  const { isFetching, isError, data } = useClassrooms();

  console.log('data', data);

  const createStudentMutation = useMutation(
    async (newStudent: Student) => {
      const response = await axios.post('/api/createStudent', newStudent);
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('classrooms');
      },
    }
  );

  const onSubmit = async (student: Student) => {
    try {
      await createStudentMutation.mutateAsync(student);

      // Reset form values
      // reset();
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
    <Box>
      <Heading>Add Student</Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box>
          <FormLabel>
            Name:
            <Input
              type="text"
              {...register('name', { required: true })}
              onChange={handleNameChange}
            />
            {errors.name && <span>This field is required</span>}
          </FormLabel>
        </Box>
        <Box>
          <FormLabel>
            Age:
            <Input
              type="number"
              {...register('age', { required: true, min: 1 })}
              pattern="\d*"
            />
            {errors.age && (
              <span>This field is required and must be a positive number</span>
            )}
          </FormLabel>
        </Box>
        <Box>
          <FormLabel>
            Gender:
            <select {...register('gender', { required: true })}>
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            {errors.gender && <span>This field is required</span>}
          </FormLabel>
        </Box>
        <Box>
          <FormLabel>
            Room:
            <select {...register('room', { required: true })}>
              <option value="">Select</option>
              {data.map((room: Classroom) => {
                if (room.students.length >= room.capacity) return;

                return (
                  <option key={room.id} value={room.name}>
                    {room.name}
                  </option>
                );
              })}
            </select>
            {errors.room && <span>This field is required</span>}
          </FormLabel>
        </Box>
        <Button type="submit">Add Student</Button>
      </form>
    </Box>
  );
}
