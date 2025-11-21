const authService = require('../../services/authService');
const { User } = require('../../models');

jest.mock('../../models', () => ({
  User: {
    findOne: jest.fn(),
    create: jest.fn()
  }
}));

describe('AuthService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('register', () => {
    it('deve criar um novo usuário com sucesso', async () => {
      const userData = {
        name: 'João Silva',
        email: 'joao@example.com',
        password: 'senha123'
      };

      User.findOne.mockResolvedValue(null);
      User.create.mockResolvedValue({
        id: '123',
        ...userData,
        password: 'hashed_password',
        toJSON: () => ({
          id: '123',
          name: userData.name,
          email: userData.email
        })
      });

      const result = await authService.register(userData);

      expect(result).toHaveProperty('id');
      expect(result).toHaveProperty('name', userData.name);
      expect(result).toHaveProperty('email', userData.email);
      expect(result).not.toHaveProperty('password');
      expect(User.create).toHaveBeenCalled();
    });

    it('deve lançar erro se email já existe', async () => {
      const userData = {
        name: 'João Silva',
        email: 'joao@example.com',
        password: 'senha123'
      };

      User.findOne.mockResolvedValue({ id: '123', email: userData.email });

      await expect(authService.register(userData)).rejects.toThrow('Email já cadastrado');
    });
  });

  describe('login', () => {
    it('deve fazer login com sucesso', async () => {
      const email = 'joao@example.com';
      const password = 'senha123';

      const mockUser = {
        id: '123',
        email,
        password: 'hashed_password',
        comparePassword: jest.fn().mockResolvedValue(true),
        toJSON: () => ({
          id: '123',
          email
        })
      };

      User.findOne.mockResolvedValue(mockUser);

      const result = await authService.login(email, password);

      expect(result).toHaveProperty('user');
      expect(result).toHaveProperty('token');
      expect(result.user).not.toHaveProperty('password');
      expect(mockUser.comparePassword).toHaveBeenCalledWith(password);
    });

    it('deve lançar erro com credenciais inválidas (usuário não existe)', async () => {
      User.findOne.mockResolvedValue(null);

      await expect(authService.login('joao@example.com', 'senha123'))
        .rejects.toThrow('Credenciais inválidas');
    });

    it('deve lançar erro com credenciais inválidas (senha incorreta)', async () => {
      const mockUser = {
        id: '123',
        email: 'joao@example.com',
        comparePassword: jest.fn().mockResolvedValue(false)
      };

      User.findOne.mockResolvedValue(mockUser);

      await expect(authService.login('joao@example.com', 'senhaErrada'))
        .rejects.toThrow('Credenciais inválidas');
    });
  });
});

