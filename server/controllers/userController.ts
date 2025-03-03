import prisma from "../prisma/prisma"; 
import { Request, Response } from 'express'

export const getUsers = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const users = await prisma.user.findMany();
    res.json(users)
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong'})
  }
} 

export const createUser = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const {id, name} = req.body
  try {
    const user = await prisma.user.create({data: {name}})
    res.json(user)
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong'})
  }
} 