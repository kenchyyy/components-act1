import prisma from "../prisma/prisma"; 
import { Request, Response } from 'express'

export const getEmployees = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const employees = await prisma.employee.findMany();
    res.json(employees)
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong'})
  }
} 

export const addEmployee = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    const {id, name, role, salary} = req.body
    try {
      const employee = await prisma.employee.create({data: {name, role, salary}})
      res.json(employee)
    } catch (error) {
      res.status(500).json({ error: 'Something went wrong'})
    }
  } 