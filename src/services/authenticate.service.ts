import { UsersRepository } from '@/repositories/users-repository'
import { compare } from 'bcryptjs'
import { User } from 'generated/prisma'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

interface AuthenticateServiceRequest {
  email: string
  password: string
}

interface AuthenticateServiceResponse {
  user: User
}
// type AuthenticateServiceResponse = void // evita erros (TODO)

export default class AuthenticateService {
  constructor(private usersRepository: UsersRepository) { }

  async athenticateExecute({
    email,
    password,
  }: AuthenticateServiceRequest): Promise<AuthenticateServiceResponse> {
    // Processo para autenticação do usuário
    // - buscar o usuário no banco pelo email
    // - comparar se a senha salva no banco bate com a senha do parâmetro

    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new InvalidCredentialsError()
    }

    // CleanCode - Boolean => Ao ler uma variável que guarda um booleano (true/false) sempre é aconselhavel escrever a variável de uma forma semântica
    // "is" - "has" - "does"

    const doesPasswordMatches = await compare(password, user.password_hash)

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError()
    }

    return {
      user,
    }
  }
}
