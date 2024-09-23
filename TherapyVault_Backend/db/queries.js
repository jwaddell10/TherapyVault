const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcryptjs");

module.exports = {
	findUser: async (username) => {
		try {
			const user = await prisma.user.findUnique({
				where: {
					username: username,
				},
			});
            // console.log(user, 'user in findUser')
			return user;
		} catch (error) {
			console.log(error, "error");
			throw error;
		}
	},
	createUser: async (username, password) => {
		const securePassword = await bcrypt.hash(password, 10);
		const user = await prisma.user.create({
			data: {
				username: username,
				password: securePassword,
			},
		});
        return user;
	},
};
