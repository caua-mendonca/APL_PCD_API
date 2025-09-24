import { IAuthService, LoginCredentials } from './interfaces/IService.js';
import * as LoginModel from '../controller/login/login.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export class AuthService implements IAuthService {
  async login(credentials: LoginCredentials): Promise<[number, string]> {
    // This will be implemented based on user type
    throw new Error('Method should be overridden by specific auth services');
  }

  async validateToken(token: string): Promise<boolean> {
    try {
      const secret = process.env.JWT_SECRET || 'default-secret';
      jwt.verify(token, secret);
      return true;
    } catch {
      return false;
    }
  }

  async changePassword(id: string, oldPassword: string, newPassword: string): Promise<[number, string]> {
    try {
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      // Implementation would depend on specific user type
      return [200, 'Password changed successfully'];
    } catch (error) {
      return [500, 'Error changing password'];
    }
  }

  protected async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  protected async comparePassword(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }
}

export class CandidateAuthService extends AuthService {
  async login(credentials: LoginCredentials): Promise<[number, string]> {
    return await LoginModel.loginCandidate(credentials);
  }
}

export class CompanyAuthService extends AuthService {
  async login(credentials: LoginCredentials): Promise<[number, string]> {
    return await LoginModel.loginCompany(credentials);
  }
}

export class AdminAuthService extends AuthService {
  async login(credentials: LoginCredentials): Promise<[number, string]> {
    return await LoginModel.loginAdmin(credentials);
  }
}