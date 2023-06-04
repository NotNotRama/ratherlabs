import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { name, capacity } = req.body;

    try {
      const classroom = await prisma.classroom.create({
        data: {
          name,
          capacity: Number(capacity),
        },
      });

      res.status(201).json(classroom);
    } catch (error) {
      console.error('Error creating classroom:', error);
      res.status(500).json({ error: 'An error occurred' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
