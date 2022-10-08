import { SignOptions, sign, verify, JwtPayload } from 'jsonwebtoken';

const jwtKeyPath = process.env.JWT_SECRET || 'SECRET';
const jwtConfig: SignOptions = { expiresIn: '1d', algorithm: 'HS256' };

const createToken = async (email: string, role: string): Promise<string> => {
  const token = sign({ email, role }, jwtKeyPath, jwtConfig);

  return token;
};

export default createToken;

export const decoder = (token: string) => {
  try {
    const decoded = verify(token, jwtKeyPath) as JwtPayload;
    return decoded.role;
  } catch (e) {
    return false;
  }
};
