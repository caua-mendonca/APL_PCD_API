export interface IService<T, K> {
  create(data: T): Promise<[number, string]>;
  getById(id: string): Promise<[number, K | string]>;
  getAll(): Promise<[number, K[] | string]>;
  update(id: string, data: Partial<T>): Promise<[number, string]>;
  delete(id: string): Promise<[number, string]>;
}

export interface IAuthService {
  login(credentials: LoginCredentials): Promise<[number, string]>;
  validateToken(token: string): Promise<boolean>;
  changePassword(id: string, oldPassword: string, newPassword: string): Promise<[number, string]>;
}

export interface LoginCredentials {
  email: string;
  password: string;
}