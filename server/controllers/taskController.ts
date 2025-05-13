import { Request, Response } from 'express';
import prisma from '../prisma/prisma';

// Get all tasks
export const getAllTasks = async (
    req: Request,
    res: Response,
): Promise<void> => {
    try {
        const tasks = await prisma.task.findMany({
            include: {
                items: true // Include checklist items
            }
        });
        res.json(tasks);
    } catch (error) {
        console.error('Error fetching tasks:', error);
        res.status(500).json({ error: 'Something went wrong' });
    }
};

// Add a new task
export const addTask = async (
    req: Request,
    res: Response,
): Promise<void> => {
    const { title, description, dueDate, type, completed, items } = req.body;
    
    try {
        // Convert type string to enum value
        const taskType = type?.toUpperCase() as 'BASIC' | 'TIMED' | 'CHECKLIST';
        
        // Parse date string to Date object if provided
        const parsedDueDate = dueDate ? new Date(dueDate) : undefined;
        
        // Create task with nested checklist items if provided
        const task = await prisma.task.create({
            data: { 
                title, 
                description, 
                dueDate: parsedDueDate,
                type: taskType,
                completed: completed || false,
                // Create checklist items if they exist
                items: items && items.length > 0 ? {
                    create: items.map((item: { text: string; completed: boolean }) => ({
                        text: item.text,
                        completed: item.completed || false
                    }))
                } : undefined
            },
            // Include the created items in the response
            include: {
                items: true
            }
        });
        
        res.status(201).json(task);
    } catch (error) {
        console.error('Error creating task:', error);
        res.status(500).json({ error: 'Something went wrong' });
    }
};

// Get a single task by ID
export const getTask = async (
    req: Request,
    res: Response,
): Promise<void> => {
    const { id } = req.params;
    
    try {
        // Convert string ID to number
        const taskId = parseInt(id, 10);
        
        if (isNaN(taskId)) {
            res.status(400).json({ error: 'Invalid task ID' });
            return;
        }
        
        const task = await prisma.task.findUnique({
            where: { id: taskId },
            include: {
                items: true // Include checklist items
            }
        });
        
        if (!task) {
            res.status(404).json({ error: 'Task not found' });
            return;
        }
        
        res.json(task);
    } catch (error) {
        console.error('Error fetching task:', error);
        res.status(500).json({ error: 'Something went wrong' });
    }
};

// Update a task by ID
export const updateTask = async (
    req: Request,
    res: Response,
): Promise<void> => {
    const { id } = req.params;
    const { title, description, dueDate, type, completed, items } = req.body;
    
    try {
        // Convert string ID to number
        const taskId = parseInt(id, 10);
        
        if (isNaN(taskId)) {
            res.status(400).json({ error: 'Invalid task ID' });
            return;
        }
        
        // Check if task exists
        const existingTask = await prisma.task.findUnique({
            where: { id: taskId }
        });
        
        if (!existingTask) {
            res.status(404).json({ error: 'Task not found' });
            return;
        }
        
        // Convert type string to enum value if provided
        const taskType = type?.toUpperCase() as 'BASIC' | 'TIMED' | 'CHECKLIST' | undefined;
        
        // Parse date string to Date object if provided
        const parsedDueDate = dueDate ? new Date(dueDate) : undefined;
        
        // Update task with transaction to handle checklist items
        const task = await prisma.$transaction(async (tx) => {
            // If items are provided, delete existing ones and create new ones
            if (items !== undefined) {
                // Delete existing checklist items
                await tx.checklistItem.deleteMany({
                    where: { taskId }
                });
                
                // Create new checklist items if provided
                if (items && items.length > 0) {
                    await tx.checklistItem.createMany({
                        data: items.map((item: { text: string; completed: boolean }) => ({
                            taskId,
                            text: item.text,
                            completed: item.completed || false
                        }))
                    });
                }
            }
            
            // Update the task
            return tx.task.update({
                where: { id: taskId },
                data: { 
                    title, 
                    description, 
                    dueDate: parsedDueDate,
                    type: taskType,
                    completed
                },
                include: {
                    items: true
                }
            });
        });
        
        res.json(task);
    } catch (error) {
        console.error('Error updating task:', error);
        res.status(500).json({ error: 'Something went wrong' });
    }
};

// Delete a task by ID
export const deleteTask = async (
    req: Request,
    res: Response,
): Promise<void> => {
    const { id } = req.params;
    
    try {
        // Convert string ID to number
        const taskId = parseInt(id, 10);
        
        if (isNaN(taskId)) {
            res.status(400).json({ error: 'Invalid task ID' });
            return;
        }
        
        // Check if task exists
        const existingTask = await prisma.task.findUnique({
            where: { id: taskId }
        });
        
        if (!existingTask) {
            res.status(404).json({ error: 'Task not found' });
            return;
        }
        
        // Delete task (checklist items will be deleted automatically due to cascade)
        await prisma.task.delete({
            where: { id: taskId }
        });
        
        res.status(204).send(); // 204 No Content for successful deletion
    } catch (error) {
        console.error('Error deleting task:', error);
        res.status(500).json({ error: 'Something went wrong' });
    }
};