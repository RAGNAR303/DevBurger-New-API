import bcrypt from 'bcrypt';
import JWT from 'jsonwebtoken';
import * as Yup from 'yup';
import authConfig from '../../config/auth.js';
import User from '../models/User.js';

class SessionController {
  async store(request, response) {
    const schema = Yup.object({
      email: Yup.string().email().required(),
      password: Yup.string().min(8).required(),
    });

    const isValid = await schema.isValid(request.body, { strict: true });

    const emailOrPasswordIncorrent = () => {
      return response.status(400).json({
        error: 'Email or password incorrent(Email ou senha incorretos)',
      });
    };

    if (!isValid) {
      emailOrPasswordIncorrent();
    }

    const { email, password } = request.body;

    // tratamento do email duplicado
    const existingUser = await User.findOne({
      where: {
        email,
      },
    });

    if (!existingUser) {
      emailOrPasswordIncorrent();
    }

    const isPasswordCorrent = await bcrypt.compare(
      password,
      existingUser.password_hash,
    );
    if (!isPasswordCorrent) {
      emailOrPasswordIncorrent(); // Validação de senha
    }

    const token = JWT.sign(
      {
        id: existingUser.id,
        admin: existingUser.admin,
        name: existingUser.name,
      },
      authConfig.secret,
      {
        expiresIn: authConfig.expiresIn,
      },
    );

    return response.status(200).json({
      id: existingUser.id,
      name: existingUser.name,
      email: existingUser.email,
      admin: existingUser.admin,
      token,
    });
  }
}

export default new SessionController();
