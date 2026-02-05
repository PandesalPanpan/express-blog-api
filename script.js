import { prisma } from "./src/lib/prisma.js";

async function main() {
    const user = await prisma.user.create({
        data: {
            username: "Peter",
            password: "password123"
        }
    })

    console.log("Created User:", user);

    const allUsers = await prisma.user.findMany({});

    console.log("All Users:", allUsers);
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    })