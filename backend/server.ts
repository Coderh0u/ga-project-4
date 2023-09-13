require("dotenv").config();

import express from "express";
import cors from "cors";
import helmet from "helmet";
// routers go here
import auth from "./src/routers/auth";
import product from "./src/routers/product";
import moderator from "./src/routers/mod_log";
import orders from "./src/routers/orders";
import search from "./src/routers/search";

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/auth", auth);
app.use("/products", product);

app.use("/moderator", moderator);

app.use("/orders", orders);

app.use('/api', search);

const PORT = process.env.PORT || 5004;
app.listen(PORT, () => {
  console.log(`server started on ${PORT}`);
});
