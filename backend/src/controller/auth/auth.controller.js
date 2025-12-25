import { loginUser, registerUser } from "../../services/auth/auth.service.js";

export const register = async (req, res) => {
  try {
    const data = await registerUser(req.body);
    res.status(201).json({
      success: true,
      data,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const data = await loginUser(req.body);
    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
};
