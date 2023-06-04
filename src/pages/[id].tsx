import { useMutation, useQueryClient } from 'react-query';
import { useRouter } from 'next/router';
import axios from 'axios';

import { useClassrooms } from '@/hooks/useClassrooms';

export default function Class() {
  const { data, isFetching, isError } = useClassrooms();
  const router = useRouter();
  const { id } = router.query;

  const deleteStudentMutation = useMutation(
    (studentId) => axios.delete(`/api/deleteStudent?id=${studentId}`),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('classrooms');
      },
    }
  );
  const queryClient = useQueryClient();

  const handleDelete = async (studentId: any) => {
    try {
      await deleteStudentMutation.mutateAsync(studentId);
      console.log('Student deleted successfully');
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  if (isFetching) return <div>Fetching data..</div>;
  if (isError) return <div>There was an error fetching the data</div>;

  const room = data.find((room: any) => room.id === Number(id));
  if (!room) return <div>Room not found</div>;

  return (
    <>
      {room.students.map((student: any) => (
        <div key={student.id}>
          {student.name}
          {student.age}
          {student.gender}
          <button onClick={() => handleDelete(student.id)}>
            Delete {student.name}
          </button>
        </div>
      ))}
      <div>test</div>
    </>
  );
}
