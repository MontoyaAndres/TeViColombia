import * as multer from "multer";
import * as path from "path";

const storage = multer.diskStorage({
	destination: (_, __, cb) => {
		cb(null, path.join(__dirname, "../uploads"));
	},
	filename: (_, file, cb) => {
		cb(null, new Date().toISOString() + file.originalname);
	}
});

const fileFilter = (_: any, file: any, cb: any) => {
	// reject a file
	if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
		cb(null, true);
	} else {
		cb(null, false);
	}
};

const upload = multer({
	storage,
	fileFilter
});

export default upload;
