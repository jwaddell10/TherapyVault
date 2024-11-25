const PDFDocument = require("pdfkit")
const doc = new PDFDocument;

module.exports = function convertJPGToPDF(file) {
    const pdfDoc = new PDFDocument({
        size: [595.28, 841.89],
        margins: {
            top: 10,
            bottom: 10,
            left: 10,
            right: 10,
        },
    });
    let pdfBuffer = [];

    pdfDoc.on("data", (chunk) => pdfBuffer.push(chunk));
    pdfDoc.on("end", async () => {
        pdfBuffer = Buffer.concat(pdfBuffer);

        const result = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                {
                    folder: "worksheets",
                    resource_type: "auto",
                },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                }
            );

            const readableStream = new Readable();
            readableStream.push(pdfBuffer);
            readableStream.push(null);
            readableStream.pipe(uploadStream);
        });

        // TODO: Save worksheet details to database
        const worksheet = await db.createWorksheet(
            verifiedUser.user,
            req.body.title,
            parseInt(req.body.folderId),
            result.secure_url
        );

        res.json({
            message: "File converted to PDF and uploaded successfully",
            url: result.secure_url,
        });
    });
}