import { useRouter } from 'next/router';

import { useClassrooms } from '@/hooks/useClassrooms';
import { useDeleteStudent } from '@/hooks/useDeleteStudent';
import { Button, Flex, Grid, GridItem, Text, Heading } from '@chakra-ui/react';
import { Empty } from '@/components/Empty';
import { Classroom, Student } from '@/types';
import Loading from '@/components/Loading';
import Error from '@/components/Error';

export default function Class() {
  const { data, isLoading, isError } = useClassrooms();
  const router = useRouter();
  const { id } = router.query;

  const deleteStudentMutation = useDeleteStudent();

  const handleDelete = async (studentId: number) => {
    try {
      await deleteStudentMutation.mutateAsync(studentId);
      console.log('Student deleted successfully');
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };
  if (isLoading) return <Loading />;
  if (isError) return <Error />;

  const room = data.find((room: Classroom) => room.id === Number(id));
  if (!room) return <Empty str="Room not found" />;
  if (room.students.length === 0)
    return <Empty str="There are no students in this room" />;

  return (
    <Flex bg="gray.700" flexDir="column" alignItems="center">
      <Heading color="whiteAlpha.900">{room.name}</Heading>
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
        {room.students.map((student: Student) => (
          <GridItem key={student.id}>
            <Flex
              key={student.id}
              flexDir="column"
              alignItems="center"
              bg="white"
              p={6}
              borderRadius="md"
              boxShadow="md"
              fontFamily="body"
              fontSize="md"
              color="gray.800"
            >
              <Flex direction="column" alignItems="center" mb={4}>
                <Text>Name: {student.name}</Text>
                <Text>Age: {student.age}</Text>
                <Text>Gender: {student.gender}</Text>
              </Flex>
              <Button
                onClick={() => handleDelete(student.id)}
                colorScheme="red"
                mt={4}
                fontSize="md"
              >
                Delete {student.name}
              </Button>
            </Flex>
          </GridItem>
        ))}
      </Grid>
    </Flex>
  );
}
