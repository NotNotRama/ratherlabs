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
  const queryClient = useQueryClient();
  const { isFetching, isError, data } = useClassrooms();

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
          </Box>
        );
      })}
    </>
  );
}
