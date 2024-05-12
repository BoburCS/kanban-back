import app from "./app"; 
import env from "./validateEnv";
import mongoose from "mongoose";

const port = env.PORT;

mongoose
  .connect(env.DATABASE_URL)
  .then(() => {
    console.log("Connected to database");
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to database: ", error);
  });
