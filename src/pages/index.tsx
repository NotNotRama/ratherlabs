import { useClassrooms } from '@/hooks/useClassrooms';
import Link from 'next/link';
import axios from 'axios';
import { QueryClient, dehydrate } from 'react-query';
import { Text, Button, Flex, Grid, GridItem } from '@chakra-ui/react';
import { useDeleteClassroom } from '@/hooks/useDeleteClassroom';
import { useEffect } from 'react';
import Loading from '@/components/Loading';
import Error from '@/components/Error';
import { Empty } from '@/components/Empty';
import { Classroom } from '@/types';

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

// test comment

export default function Home() {
  const { isLoading, isError, data } = useClassrooms();

  const deleteClassroomMutation = useDeleteClassroom();

  useEffect(() => {
    if (deleteClassroomMutation.isError) {
      alert('There was an error deleting the classroom');
    }
  }, [deleteClassroomMutation]);

  if (isLoading) return <Loading />;
  if (isError) return <Error />;
  if (data.length === 0) return <Empty str="No rooms" />;

  return (
    <>
      <Grid
        templateColumns="repeat(auto-fit, minmax(500px, 1fr))"
        gap={4}
        bg="gray.700"
        w="100vw"
        h="100vh"
        pt={20}
        justifyItems="center"
        overflowY="auto"
      >
        {data.map((room: Classroom) => {
          return (
            <GridItem key={room.id}>
              <Flex
                flexDir="column"
                alignItems="center"
                bg="whiteAlpha.900"
                p={6}
                borderRadius="md"
                boxShadow="md"
                fontFamily="body"
                fontSize="md"
                color="gray.800"
              >
                <Link href={`/${room.id}`}>
                  <Button variant="link" fontSize="xl">
                    {room.name}
                  </Button>
                </Link>
                <Text fontSize="lg" mt={2}>
                  Capacity: {room.capacity}
                </Text>
                <Button
                  onClick={() => {
                    deleteClassroomMutation.mutate(room.id);
                  }}
                  colorScheme="red"
                  mt={4}
                  fontSize="md"
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
