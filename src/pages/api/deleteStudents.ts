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
    const student = await prisma.student.delete({
      where: { id: Number(id) },
    });

    res.status(200).json(student);
  } catch (error) {
    console.error('Error deleting student:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
