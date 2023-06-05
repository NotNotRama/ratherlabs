import { useClassrooms } from '@/hooks/useClassrooms';
import Link from 'next/link';
import axios from 'axios';
import {
  QueryClient,
  dehydrate,
  useQueryClient,
  useMutation,
} from 'react-query';
import { Box, Button } from '@chakra-ui/react';
import Header from '@/components/Header';
import { useDeleteClassroom } from '@/hooks/useDeleteClassroom';

interface Room {
  name: string;
  id: number;
}

export async function getServerSideProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(['classrooms'], () =>
    axios.get('http://localhost:3000/api/classrooms').then((res) => res.data)
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export default function Home() {
  const { isFetching, isError, data } = useClassrooms();

  console.log('data', data);

  const deleteClassroomMutation = useDeleteClassroom();

  if (isFetching) return <Box>Fetching..</Box>;
  if (isError) return <Box>There was an error while fetching the data..</Box>;
  if (data.length === 0) return <Box>Create some rooms first</Box>;

  return (
    <>
      {data.map((room: Room) => {
        return (
          <Box key={room.id}>
            <Link href={`/${room.id}`}>
              <button>{room.name}</button>
            </Link>
            <Button
              onClick={() => {
                deleteClassroomMutation.mutate(room.id);
              }}
            >
              Delete {room.name}
            </Button>
          </Box>
        );
      })}
    </>
  );
}
