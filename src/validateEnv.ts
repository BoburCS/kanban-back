import { cleanEnv } from "envalid";
import { str, port } from "envalid/dist/validators";

export default cleanEnv(process.env, {
  DATABASE_URL: str(),
  PORT: port(),
  FRONTEND_URL: str(),
});
