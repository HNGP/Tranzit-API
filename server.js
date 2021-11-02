const express = require("express");
const expressGraphQl = require("express-graphql").graphqlHTTP;
const schema = require("./schema.js");
const cors = require("cors");

const app = express();
app.use(cors());

app.use(
  "/graphql",
  expressGraphQl({
    schema: schema,
    graphiql: true,
  })
);

app.get("/", (req, res) => {
  return res.send("App is running");
});

app.listen(5000, () => console.log(`Server is running on port 5000`));
