import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';

export function useDeleteStudent() {
  const queryClient = useQueryClient();

  return useMutation(
    async (id: number) => {
      return await axios.delete(`/api/deleteStudent?id=${id}`);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('classrooms');
      },
    }
  );
}
