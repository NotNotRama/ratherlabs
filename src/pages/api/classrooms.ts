import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const classrooms = await prisma.classroom.findMany({
      include: {
        students: true,
      },
    });
    res.status(200).json(classrooms);
  } catch (error) {
    console.error('Error retrieving classrooms:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
}
