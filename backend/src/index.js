import { createServer } from "./server.js";
const server = createServer();

server.listen(8000, () => {
  console.log(`server is running on http://localhost:8000`);
});
