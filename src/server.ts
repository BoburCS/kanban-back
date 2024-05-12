import mongoose from "mongoose";
import app from "./app";
import env from "./validateEnv";

const port = env.PORT;
const uri = env.DATABASE_URL;

mongoose
  .connect(uri, {
    serverApi: {
      version: "1",
      strict: true,
      deprecationErrors: true,
    },
  })
  .then(() => {
    console.log("Connected to database");
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to database: ", error);
  });
