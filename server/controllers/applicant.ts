import { Prisma } from "@prisma/client";
import prisma from "../prisma/prisma"; 
import { Request, Response } from 'express'

export const getApplicants = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const employees = await prisma.applicant.findMany();
    res.json(employees)
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong'})
    console.log(error)
  }
}

export const getOneApplicant = async (
    req: Request,
    res: Response,
): Promise<void> => {
    const {id} = req.params
    try {
        const employee = await prisma.applicant.findUnique({where: {id: Number(id)}})
        res.json(employee)
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong'})
    }
}

export const addApplicant = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    const {firstName, lastName, groupName, role, expectedSalary, expectedDateOfDefense} = req.body
    try {
      const employee = await prisma.applicant.create({data: {firstName, lastName, groupName, role, expectedSalary, expectedDateOfDefense}})
      res.json(employee)
    } catch (error) {
      res.status(500).json({ error: 'Something went wrong'})
      console.log(error)
    }
  } 

export const updateApplicant = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    const {id} = req.params
    const {firstName, lastName, groupName, role, expectedSalary, expectedDateOfDefense} = req.body
    try {
      const employee = await prisma.applicant.update({where: {id: Number(id)}, data: {
        firstName: firstName, lastName, groupName, role, expectedSalary, expectedDateOfDefense}})
      res.json(employee)
    } catch (error) {
      res.status(500).json({ error: 'Something went wrong'})
      console.log(error)
    }
  }

export const deleteApplicant = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    const {id} = req.params
    try {
      const employee = await prisma.applicant.delete({where: {id: Number(id)}})
      res.json(employee)
    } catch (error) {
      res.status(500).json({ error: 'Something went wrong'})
    }
  }