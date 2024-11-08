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
			console.log(error, "error");
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
			console.log(error, "error");
			throw new Error(error);
		}
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
	findFolder: async (id) => {
		try {
			const folder = await prisma.folder.findUnique({
				where: {
					id,
				},
			});
			return folder;
		} catch (error) {
			console.log(error, "error");
			throw new Error(error);
		}
	},
	findFolders: async () => {
		try {
			const folders = await prisma.folder.findMany();
			return folders;
		} catch (error) {
			console.log(error, "error");
			throw new Error(error);
		}
	},
	createFolder: async (user, title) => {
		try {
			const folder = await prisma.folder.create({
				data: {
					title: title,
					createdAt: new Date(),
					authorId: user.id,
				},
			});
			return folder;
		} catch (error) {
			console.log(error, "error");
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
			console.log(error, "error");
			throw new Error(error);
		}
	},
	findWorksheet: async (id) => {
		try {
			const worksheet = await prisma.worksheet.findUnique({
				where: {
					id: id,
				},
			});
			return worksheet;
		} catch (error) {
			console.log(error, "error");
			throw new Error(error);
		}
	},
	findWorksheets: async () => {
		try {
			const worksheets = await prisma.worksheet.findMany();
			return worksheets;
		} catch (error) {
			console.log(error, "error");
			throw new Error(error);
		}
	},
	createWorksheet: async (user, title, folderId) => {
		//if folder, place in folder?
		try {
			const worksheetData = {
				authorId: user.id,
				title: title,
				createdAt: new Date(),
			};

			if (folderId) {
				worksheetData.folderId = folderId;
			}

			const worksheet = await prisma.worksheet.create({
				data: worksheetData,
			});
			console.log(worksheet, "worksheet in create");
			// return worksheet;
		} catch (error) {
			console.log(error, "error");
			throw new Error(error);
		}
	},
	deleteWorksheet: async (id) => {
		try {
			const worksheetToDelete = await prisma.worksheet.delete({
				where: {
					id: id,
				},
			});
			return worksheetToDelete;
		} catch (error) {
			console.log(error, "error");
			throw new Error(error);
		}
	},
};
