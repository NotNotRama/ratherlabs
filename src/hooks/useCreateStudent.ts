import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';

interface Student {
  name: string;
  age: number;
  gender: string;
  room: string;
}

export function useCreateStudent() {
  const queryClient = useQueryClient();

  return useMutation(
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
}
