require("dotenv").config();

import express from "express";
import cors from "cors";
import helmet from "helmet";
// routers go here
import auth from "./src/routers/auth";
import product from "./src/routers/product";

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/auth", auth);
app.use("/products", product);

const PORT = process.env.PORT || 5004;
app.listen(PORT, () => {
  console.log(`server started on ${PORT}`);
});
