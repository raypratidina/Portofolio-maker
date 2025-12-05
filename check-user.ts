import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import path from 'path';

const dbPath = process.env.DATABASE_URL!.replace('file:', '');
const resolvedPath = path.resolve(process.cwd(), dbPath);

const adapter = new PrismaBetterSqlite3({
    url: resolvedPath
});

const prisma = new PrismaClient({ adapter });

async function main() {
    const user = await prisma.user.findFirst();
    console.log('CV URL:', user?.cvUrl);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
