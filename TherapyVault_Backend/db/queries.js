const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcryptjs")

module.exports = {
	findUser: async (name) => {
		const user = await prisma.user.findUnique({
            where: {
                name: name
            }
        });
		return user;
	},
    createUser: async(name, password) => {
        const securePassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: {
                name: name,
                password: securePassword,
            }
        })
    }
};
