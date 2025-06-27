import UserRegister from '../dtos/user.dto.js';
import user from '../models/user.model.js';

export const newUser = async (req, res) => {
    await user.updateOne({_id: req.user._id},{ $set: { ...(new UserRegister(req.body)), active: true}})
        .then(() => {res.status(200).json({ ok: true })})
        .catch(() => res.status(500).json({ message: "Error interno del servidor" }));
}

export const getUser = async (req, res) => {
  await user.findOne({_id: req.user._id})
      .then(user => {res.status(200).json(user)})
      .catch(() => res.status(500).json({ message: "Error interno del servidor" }));
}

const getUsersByRole = async (req, res, role) => {
  try {
    const docs = await user.find({ rol: role });
    res.status(200).json(docs);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const getAllTeachers = (req, res) => {
  return getUsersByRole(req, res, "TE");
};

export const getAllStudents = (req, res) => {
  return getUsersByRole(req, res, "ST");
};