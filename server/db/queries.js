const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcryptjs");
const { session, authorize } = require("passport");

module.exports = {
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
	createFolder: async (user, title, folderId) => {
		try {
			const folderData = {
				title: title,
				createdAt: new Date(),
				authorId: user.id,
			};
			// const folder = await prisma.folder.create({
			// 	data: {
			// 		title: title,
			// 		createdAt: new Date(),
			// 		authorId: user.id,
			// 	},
			// });

			if (folderId !== null) {
				folderData.folderId = folderId;
			}

			const folder = await prisma.folder.create({
				data: folderData,
			});
			return folder;
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
				include: {
					worksheet: true,
					children: true,
				},
			});
			return folder;
		} catch (error) {
			console.log(error, "error");
			throw new Error(error);
		}
	},
	findFolders: async (user) => {
		console.log(user, 'username')
		try {
			const folders = await prisma.folder.findMany({
				where: {
					author: user, 
				}
			});
			return folders;
		} catch (error) {
			console.log(error, "error");
			throw new Error(error);
		}
	},
	updateFolder: async (id, title) => {
		try {
			const updatedFolder = await prisma.folder.update({
				where: {
					id: id,
				},
				data: {
					title: title,
				},
			});
			return updatedFolder;
		} catch (error) {
			console.log(error, "error");
			throw new Error(error);
		}
	},
	deleteFolderWithWorksheets: async (id) => {
		try {
			const deletedFolderWithWorksheets = await prisma.folder.update({
				where: {
					id: id,
				},
				data: {
					worksheets: {
						set: [],
					},
				},
			});
		} catch (error) {
			console.log(error, "error in delete folder with worksheets");
			throw new Error(error);
		}
	},
	deleteFolder: async (id) => {
		try {
			// console.log(id, 'delete folder runs id')
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
	createWorksheet: async (user, title, folderId, imgUrl) => {
		//if folder, place in folder?
		try {
			const worksheetData = {
				authorId: user.id,
				title: title,
				createdAt: new Date(),
				imgUrl: imgUrl,
			};
			console.log(worksheetData, 'worksheet data in creat')

			if (folderId) {
				worksheetData.folderId = folderId;
			}

			const worksheet = await prisma.worksheet.create({
				data: worksheetData,
			});
			return worksheet;
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
	findWorksheets: async (user) => {
		try {
			const worksheets = await prisma.worksheet.findMany({
				where: {
					author: user
				}
			});
			return worksheets;
		} catch (error) {
			console.log(error, "error");
			throw new Error(error);
		}
	},
	updateWorksheet: async (id, title) => {
		try {
			const updatedWorksheet = await prisma.worksheet.update({
				where: {
					id: id,
				},
				data: {
					title: title,
				},
			});
			return updatedWorksheet;
		} catch (error) {
			console.log(error, "error in update worksheet");
			throw new Error(error);
		}
	},
	deleteWorksheet: async (id) => {
		console.log("delete runs");
		try {
			console.log(id, "id here");
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
