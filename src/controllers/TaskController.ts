import type { Request, Response } from 'express';
import Project from '../models/Project';
import Task from '../models/Task';

export class TaskController {
    static createTask = async(req: Request, res: Response) => {
        try {
            const task = new Task(req.body)
            task.project = req.project.id;
            req.project.tasks.push(task.id)          
            await Promise.allSettled([
                task.save(),
                req.project.save()
            ])
            res.send('Tarea creada correctamente');
        } catch (error) {
            res.status(500).json('Error al crear la tarea');
        }
    }

    static getProjectTasks = async(req: Request, res: Response) => {
        try {
            const tasks = await Task.find({ project: req.project.id }).populate('project');
            res.json(tasks);
        } catch (error) {
            res.status(500).json('Error al obtener las tareas del proyecto');
        }
    }

    static getTaskById = async(req: Request, res: Response) => {
        try {
            const {taskId} = req.params
            const task = await Task.findById(taskId)
            if(!task) return res.status(404).json('Tarea no encontrada')
            res.json(task);
            if(task.project.toString() !== req.project.id) return res.status(403).json('No tienes permiso para acceder a esta tarea')
        } catch (error) {
            res.status(500).json('Error al obtener la tarea');
        }
    }

    static updateTask = async(req: Request, res: Response) => {
        try {
            const {taskId} = req.params
            const task = await Task.findByIdAndUpdate(taskId, req.body)
            if(!task) return res.status(404).json('Tarea no encontrada')
            if(task.project.toString() !== req.project.id) return res.status(403).json('No tienes permiso para acceder a esta tarea')
            res.send('Tarea actualizada correctamente');
        } catch (error) {
            res.status(500).json('Error al obtener la tarea');
        }
    }
}