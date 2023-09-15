import { PrismaClient } from "@prisma/client";
import { asyncScheduler } from "rxjs";

//initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
    // create two dummy users
    const user1 = await prisma.user.upsert({
        where: {username: 'dummy1'},
        update: {},
        create: {
            username: 'dummy1',
            id:        1234,
        },
    });

    const user2 = await prisma.user.upsert({
        where: {username: 'dummy2'},
        update: {},
        create: {
            username: 'dummy2',
            id:        4321,
        },
    });

    console.log({user1, user2});
}

//execute the main function
main()
    .catch((e) => {
        console.log(e);
        process.exit(1);
    })
    .finally(async () => {
        //close Prisma Client at the end
        await prisma.$disconnect();
    });