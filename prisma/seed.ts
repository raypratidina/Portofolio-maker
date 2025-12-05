import { PrismaClient } from '@prisma/client'
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3'
import { hash } from 'bcryptjs'
import 'dotenv/config'
import path from 'path'

// Handle relative path for sqlite file
const dbPath = process.env.DATABASE_URL!.replace('file:', '')
const resolvedPath = path.resolve(process.cwd(), dbPath)

const adapter = new PrismaBetterSqlite3({
    url: resolvedPath
})
const prisma = new PrismaClient({ adapter })

async function main() {
    const password = await hash('admin123', 12)
    const user = await prisma.user.upsert({
        where: { email: 'admin@example.com' },
        update: {},
        create: {
            email: 'admin@example.com',
            name: 'Admin User',
            password,
            bio: 'I am the admin of this portfolio.',
        },
    })
    console.log({ user })
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
