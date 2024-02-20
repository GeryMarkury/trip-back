import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import logger from "morgan";
import { tripsRouter, authRouter } from "./routes/index.js";

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use("/users", authRouter);
app.use("/trips", tripsRouter);

app.use((req, res) => {
	res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
	res.status(500).json({
		message: err.message,
		stack: err.stack,
	});
});

export default app;
