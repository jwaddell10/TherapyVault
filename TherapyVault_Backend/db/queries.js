const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
	findUser: async (name) => {
		const user = await prisma.user.findUnique({
            where: {
                name: name
            }
        });
		return user;
	},
};
