const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcryptjs");
const { session } = require("passport");

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
			console.log(error, 'error')
			throw new Error(error);
		}
	},
	createUser: async (username, password) => {
		try {
			const securePassword = await bcrypt.hash(password, 10);
			const user = await prisma.user.create({
				data: {
					username: username,
					password: securePassword,
				},
			});
			return user;
		} catch (error) {
			console.log(error, 'error')
			throw new Error(error);
		}
	},
	findDemographics: async () => {
		try {
			const demographics = await prisma.demographic.findMany();
			return demographics;
		} catch (error) {
			console.log(error, 'error')
			throw new Error(error);
		}
	},
	findTopics: async () => {
		try {
			const topics = await prisma.topic.findMany();
			return topics;
		} catch (error) {
			console.log(error, 'error')
			throw new Error(error);
		}
	},
	findFolder: async (id) => {
		try {
			const folder = await prisma.folder.findUnique({
				where: {
					id,
				},
			});
			return folder;
		} catch (error) {
			console.log(error, 'error')
			throw new Error(error);
		}
	},
	findFolders: async () => {
		try {
			const folders = await prisma.folder.findMany();
			console.log(folders, 'folders')
			return folders;
		} catch (error) {
			console.log(error, 'error')
			throw new Error(error);
		}
	},
	createFolder: async (user, title) => {
		console.log(title, 'title in create', user, 'user in create')
		try {
			const folder = await prisma.folder.create({
				data: {
					title: title,
					createdAt: new Date(),
					authorId: user.id // Directly provide the authorId
				},
			});
			return folder;
		} catch (error) {
			console.log(error, 'error')
			throw new Error(error);
		}
	},
	deleteFolder: async (id) => {
		try {
			const deletedFolder = await prisma.folder.delete({
				where: {
					id,
				},
			});
			return deletedFolder;
		} catch (error) {
			console.log(error, 'error')
			throw new Error(error);
		}
	},
	findWorksheets: async () => {
		try {
			const worksheets = await prisma.worksheets.findMany();
			return worksheets;
		} catch (error) {
			console.log(error, 'error')
			throw new Error(error);
		}
	},
	createWorksheet: async (title) => {
		//if folder, place in folder?
		try {
			const worksheet = await prisma.worksheets.create({
				data: {
					title: title,
					createdAt: new Date(),
					include: {
						Folder: true
					}
				},
			});
			console.log(worksheet, 'worksheet in create')
			// return worksheet;
		} catch (error) {
			console.log(error, 'error')
			throw new Error(error);
		}
	},
	deleteWorksheet: async (id) => {
		try {
			const worksheetToDelete = await prisma.worksheets.delete({
				where: {
					id: id,
				},
			});
			return worksheetToDelete;
		} catch (error) {
			console.log(error, 'error')
			throw new Error(error);
		}
	},
};
