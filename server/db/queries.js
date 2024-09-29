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
	findDemographics: async () => {
		try {
			const demographics = await prisma.demographic.findMany();
			return demographics;
		} catch (error) {
			console.log(error, "error");
			throw new Error(error);
		}
	},
	findTopics: async () => {
		try {
			const topics = await prisma.topic.findMany();
			return topics;
		} catch (error) {
			console.log(error, "error");
			throw new Error(error);
		}
	},
};
