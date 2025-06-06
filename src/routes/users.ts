import express, { Request, Response, Router, NextFunction } from 'express';
import User, { IUser } from '../models/User';

const router: Router = express.Router();

// Get all users
router.get('/', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users' });
    }
});

// Create a new user
router.post('/', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ message: 'Error creating user' });
    }
});

// Update and Delete routes
router.route('/:id')
    .put(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const user = await User.findByIdAndUpdate(
                req.params.id,
                { $set: req.body },
                { new: true }
            );
            if (!user) {
                res.status(404).json({ message: 'User not found' });
                return;
            }
            res.json(user);
        } catch (error) {
            res.status(400).json({ message: 'Error updating user' });
        }
    })
    .delete(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const user = await User.findByIdAndDelete(req.params.id);
            if (!user) {
                res.status(404).json({ message: 'User not found' });
                return;
            }
            res.json({ message: 'User deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error deleting user' });
        }
    });

export default router;
