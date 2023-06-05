import { useForm } from 'react-hook-form';
import { Box, Heading, FormLabel, Input, Button } from '@chakra-ui/react';

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
    <Box>
      <Heading>Add Classroom</Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box>
          <FormLabel>
            Name:
            <Input type="text" {...register('name', { required: true })} />
          </FormLabel>
          {errors.name && <span>This field is required</span>}
        </Box>
        <Box>
          <FormLabel>
            Capacity:
            <Input
              type="number"
              {...register('capacity', { required: true })}
            />
          </FormLabel>
          {errors.capacity && <span>This field is required</span>}
        </Box>
        <Button type="submit">Add Classroom</Button>
      </form>
    </Box>
  );
}
