import type { Request, Response } from 'express';

export class TaskController {
    static createProject(req: Request, res: Response) {
        const { projectId } = req.params;
        console.log(`Creating task for project ID: ${projectId}`);
        try {
            
        } catch (error) {
            console.error('Error creating task:', error);   
        }
    }
}