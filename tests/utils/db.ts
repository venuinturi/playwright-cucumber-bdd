import { PrismaClient } from '../../gamers-com/node_modules/@prisma/client'

if (!process.env.DATABASE_URL) {
  process.env.DATABASE_URL = 'file:/Users/venugopal/playwright-tests/gamers-com/prisma/test.db'
}

const prisma = new PrismaClient()

export async function storeCredentials(email: string, password: string) {
  return await prisma.externalAccount.upsert({
    where: { email },
    update: { password },
    create: {
      platform: 'RahulShettyAcademy',
      email,
      password
    }
  })
}

export async function getLatestCredentials() {
  return await prisma.externalAccount.findFirst({
    where: { platform: 'RahulShettyAcademy' },
    orderBy: { createdAt: 'desc' }
  })
}

export default prisma
