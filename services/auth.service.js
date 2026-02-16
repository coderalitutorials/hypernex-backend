import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Admin from "../model/auth.model.js";

// Password hash
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

// Password compare
const comparePassword = async (enteredPassword, storedPassword) => {
  return await bcrypt.compare(enteredPassword, storedPassword);
};

// Generate JWT token
const generateToken = (adminId) => {
  return jwt.sign(
    { id: adminId },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );
};

// Register admin
const registerAdmin = async (data) => {
  const { name, email, password } = data;

  const existingAdmin = await Admin.findOne({ email });
  if (existingAdmin) {
    throw new Error("Admin already exists");
  }

  const hashedPassword = await hashPassword(password);

  const admin = await Admin.create({
    name,
    email,
    password: hashedPassword,
  });

  return admin;
};

// Login admin
const loginAdmin = async (data) => {
  const { email, password } = data;

  const admin = await Admin.findOne({ email }).select("+password");
  if (!admin) {
    throw new Error("Invalid email or password");
  }

  const isMatch = await comparePassword(password, admin.password);
  if (!isMatch) {
    throw new Error("Invalid email or password");
  }

  const token = generateToken(admin._id);

  return { admin, token };
};

export {
  registerAdmin,
  loginAdmin,
};
