require("dotenv").config();
const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Blog App",
    description: "This is a blog app.",
    version: "1.0.0",
  },
  host: `localhost:${process.env.PORT || 8080}`,
};

const outputFile = "./swagger-output.json";
const routes = [
  "./routes/user.js",
  "./routes/blog.js",
  "./routes/auth.js",
  "./routes/staticRoutes.js",
];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen(outputFile, routes, doc);
