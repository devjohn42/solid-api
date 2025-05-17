import { CheckIn, Prisma } from 'generated/prisma'

// By => Apenas um
// Some => Alguns
// Many => Muitos

export interface CheckInsRepository {
  create(checkIn: CheckIn): Promise<CheckIn>
  save(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
  findManyByUserId(userId: string, page: number): Promise<CheckIn[]>
  findByUserIdOnDate(userId: string, data: Date): Promise<CheckIn | null>
  countByUserId(userId: string): Promise<number>
  findById(userId: string): Promise<CheckIn | null>
}
