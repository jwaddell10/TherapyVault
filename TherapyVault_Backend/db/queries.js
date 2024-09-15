const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcryptjs");

module.exports = {
	findUser: async (name) => {
		try {
			const user = await prisma.user.findUnique({
				where: {
					name: name,
				},
			});
            console.log(user, 'user in finduser')
			return user;
		} catch (error) {
			console.log(error, "error");
			throw error;
		}
	},
	createUser: async (name, password) => {
		const securePassword = await bcrypt.hash(password, 10);
		const user = await prisma.user.create({
			data: {
				name: name,
				password: securePassword,
			},
		});
	},
};
