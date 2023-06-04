import { useMutation, useQueryClient } from 'react-query';
import axios from 'axios';
import { useForm } from 'react-hook-form';

interface Classroom {
  name: string;
  capacity: number;
}

export default function AddClassroom() {
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Classroom>();

  const createClassroomMutation = useMutation(
    async (newClassroom: Classroom) => {
      const response = await axios.post('/api/createClassroom', newClassroom);
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('classrooms');
      },
    }
  );

  const onSubmit = async (data: Classroom) => {
    try {
      await createClassroomMutation.mutateAsync(data);

      // Reset form values
      reset();
    } catch (error) {
      console.error('Error adding classroom:', error);
    }
  };

  return (
    <div>
      <h1>Add Classroom</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>
            Name:
            <input type="text" {...register('name', { required: true })} />
          </label>
          {errors.name && <span>This field is required</span>}
        </div>
        <div>
          <label>
            Capacity:
            <input
              type="number"
              {...register('capacity', { required: true })}
            />
          </label>
          {errors.capacity && <span>This field is required</span>}
        </div>
        <button type="submit">Add Classroom</button>
      </form>
    </div>
  );
}
