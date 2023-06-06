import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';

export function useDeleteClassroom() {
  const queryClient = useQueryClient();

  return useMutation(
    async (id: number) => {
      return await axios.delete(`/api/deleteClass?id=${id}`);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('classrooms');
      },
    }
  );
}
