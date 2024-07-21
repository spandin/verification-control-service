import { Role } from '@prisma/client'

export interface RequsterTypes {
  id: number
  email: string
  role: Role
}
