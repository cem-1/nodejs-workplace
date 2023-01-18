const http = require("http");
const routes = require("./routes");

console.log("Nodemon started your server.");
const server = http.createServer(routes.handler);
console.log("Server is live!");

server.listen(3000);
