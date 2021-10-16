const express = require("express");
const expressGraphQl = require("express-graphql").graphqlHTTP;
const schema = require("./schema.js");
const { findShortestPath } = require("./calculations/algo");
const data = require("./stations/delhi-data.json");

const app = express();

app.use(
  "/graphql",
  expressGraphQl({
    schema: schema,
    graphiql: true,
  })
);

app.get("/", (req, res) => {
  // const ans = getDistance(28.565307,77.122413,28.45437,77.07268);
  var source = "30";
  var destination = "16";

  let result = findShortestPath(data.stations, source, destination);

  return res.json(result);
});

app.listen(5000, () => console.log(`Server is running on port 5000`));
