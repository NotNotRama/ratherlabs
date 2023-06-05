import { useClassrooms } from '@/hooks/useClassrooms';
import Link from 'next/link';
import axios from 'axios';
import { QueryClient, dehydrate } from 'react-query';
import { Box, Text, Button, Flex, Grid, GridItem } from '@chakra-ui/react';
import { useDeleteClassroom } from '@/hooks/useDeleteClassroom';
import { useEffect } from 'react';

interface Room {
  name: string;
  id: number;
  capacity: number;
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

  const deleteClassroomMutation = useDeleteClassroom();

  useEffect(() => {
    if (deleteClassroomMutation.isError) {
      alert('there was an error deleting the classroom');
    }
  }, [deleteClassroomMutation]);

  if (isFetching) return <Box>Fetching..</Box>;
  if (isError) return <Box>There was an error while fetching the data..</Box>;
  if (data.length === 0) return <Box>Create some rooms first</Box>;

  return (
    <>
      <Grid
        templateColumns="repeat(auto-fit, minmax(500px, 1fr))"
        gap={4}
        bg={'black'}
        w="100vw"
        h="100vh"
        justifyItems="center"
      >
        {data.map((room: Room) => {
          return (
            <GridItem key={room.id}>
              <Flex
                key={room.id}
                flexDir="column"
                alignItems="center"
                bg={'red'}
                p={10}
              >
                <Link href={`/${room.id}`}>
                  <button>{room.name}</button>
                </Link>
                <Text>Capacity: {room.capacity}</Text>
                <Button
                  onClick={() => {
                    deleteClassroomMutation.mutate(room.id);
                  }}
                >
                  Delete
                </Button>
              </Flex>
            </GridItem>
          );
        })}
      </Grid>
    </>
  );
}
