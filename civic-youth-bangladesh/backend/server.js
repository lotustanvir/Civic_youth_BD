import "dotenv/config";
import app from "./src/app.js";
import env from "./src/config/env.js";

const server = app.listen(env.PORT, () => {
  console.log(`CYB Backend running on port ${env.PORT} in ${env.NODE_ENV} mode`);
});

process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err);
  server.close(() => process.exit(1));
});
