// api/students/index.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { name, age, gender, room } = req.body;

    try {
      console.log('room', room);

      const classroom = await prisma.classroom.findFirst({
        where: { name: room },
      });

      if (!classroom) {
        return res.status(404).json({ message: 'Classroom not found' });
      }

      const student = await prisma.student.create({
        data: {
          name,
          age: parseInt(age),
          gender,
          classrooms: {
            connect: { id: classroom.id },
          },
        },
      });

      res.status(201).json(student);
    } catch (error) {
      console.error('Error creating student:', error);
      res.status(500).json({ error: 'An error occurred' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
