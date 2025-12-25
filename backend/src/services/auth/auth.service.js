import Auth from "../../model/auth/auth.model.js";
import { generateToken } from "../../utils/generateToken.js";

export const registerUser = async ({ name, email, password, role }) => {
  const existingUser = await Auth.findOne({ email });
  if (existingUser) {
    throw new Error("User already exists");
  }

  const user = await Auth.create({
    name,
    email,
    password,
    role,
  });

  const token = generateToken(user);

  return {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    token,
  };
};

export const loginUser = async ({ email, password }) => {
  const user = await Auth.findOne({ email }).select("+password");
  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new Error("Invalid email or password");
  }

  const token = generateToken(user);

  return {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    token,
  };
};
