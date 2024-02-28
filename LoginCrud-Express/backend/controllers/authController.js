import { User } from "../models/authModels.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const Register = async (req, res) => {
  const { username, password, email } = req.body; // es la informacion que va a coger

  // const username = req.body;
  // const password = req.body;
  // const email = req.body;

  try {
    const existingEmail = await User.findOne({ email: email });
    if (existingEmail) {
      return res.status(400).json({ message: "This email already exist" }); //Si el email existe
    }

    const salt = await bcrypt.genSalt(10); //Para encriptar la contraseña
    const hashPassword = await bcrypt.hash(password, salt);

    //si el email no existe, creamos uno nuevo
    const credentials = new User({
      username: username,
      password: hashPassword,
      email: email,
    });
    await credentials.save(); //Guardar los datos del registro
    res.status(200).json({ message: "Register succesfull", credentials });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const Login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email }); // buscamos si el email esta en nuesta DB
    if (!user) {
      return res.status(400).json({ message: "Invalid email" });
    } else {
      const validPassword = await bcrypt.compare(password, user.password); //verificamos si el password coincide
      if (!validPassword) {
        return res.status(400).json({ message: "Invalid password" });
      }
    }

    //Generamos un token tras el login
    const token = jwt.sign(
      {
        email: email,
        role: user.role
      },
      "codesecrect");
    await res.header({
      auth: token,
    });
    res.status(200).json ({message:"Login succesfull", token})
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });

  }
};
