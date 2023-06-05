import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';

interface Classroom {
  name: string;
  capacity: number;
}

export function useDeleteClassroom() {
  const queryClient = useQueryClient();

  return useMutation(
    async (id: number) => {
      try {
        await axios.delete(`/api/deleteClass?id=${id}`);
        // Perform any additional actions after successful deletion
        console.log('Class deleted successfully');
      } catch (error) {
        // Handle error case
        console.error('Error deleting class:', error);
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('classrooms');
      },
    }
  );
}
