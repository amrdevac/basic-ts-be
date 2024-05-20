import { Request, Response } from 'express';
import User from '../models/user';

export const getUsers = async (req: Request, res: Response) => {
  const users = await User.findAll();
  res.json({data: "helo bandung"});
};

export const getUserById = async (req: Request, res: Response) => {
  const user = await User.findByPk(req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ error: 'User not found' });
  }
};

export const createUser = async (req: Request, res: Response) => {
  const { name, email } = req.body;
  try {
    const user = await User.create({ name, email });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Error creating user' });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const { name, email } = req.body;
  const user = await User.findByPk(req.params.id);
  if (user) {
    user.name = name;
    user.email = email;
    await user.save();
    res.json(user);
  } else {
    res.status(404).json({ error: 'User not found' });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const user = await User.findByPk(req.params.id);
  if (user) {
    await user.destroy();
    res.status(204).send();
  } else {
    res.status(404).json({ error: 'User not found' });
  }
};
