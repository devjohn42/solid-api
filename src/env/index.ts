import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z.enum(['dev', 'test', 'production']).default('dev'),
  JWT_SECRET: z.string(),
  PORT: z.coerce.number().default(3333),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.error('🚨 Invalid enviroment variables', _env.error.format())

  /*
    Top Level da aplicação, caso dê algum problema nas variáveis,
    a aplicação será derrubada
  */
  throw new Error('Invalid enviroment variables')
}

export const env = _env.data
