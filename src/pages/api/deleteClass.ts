import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { id } = req.query;

  try {
    const classRoom = await prisma.classroom.delete({
      where: { id: Number(id) },
    });

    res.status(200).json(classRoom);
  } catch (error) {
    console.error('Error deleting class:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
