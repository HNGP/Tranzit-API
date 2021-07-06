const express = require("express");
const expressGraphQl = require('express-graphql').graphqlHTTP;
const { Graph } = require('dijkstra-floydwarshall-graph');
const schema = require('./schema.js');

const app = express();
const graph = new Graph();

app.use('/graphql', expressGraphQl({
    schema: schema,
    graphiql: true
}));

// app.get('/', (req, res) => {
//     graph.addNode("Dwarka Sec 21") 
//      .addNode("Dwarka Sec 08")
//      .addNode("Dwarka Sec 09")
//      .addNode("Dwarka Sec 10")

//     graph.addRoute("Dwarka Sec 21","Dwarka Sec 08", 3)
//     graph.addRoute("Dwarka Sec 08","Dwarka Sec 21", 3)
//     graph.addRoute("Dwarka Sec 08","Dwarka Sec 09", 2)
//     graph.addRoute("Dwarka Sec 09","Dwarka Sec 08", 2)
//     graph.addRoute("Dwarka Sec 09","Dwarka Sec 10", 1)
//     graph.addRoute("Dwarka Sec 10","Dwarka Sec 09", 1)

//     result = graph.findMatricesFloydWarshall();


//     return res.json(result);
// })


app.listen(5000, () => console.log(`Server is running on port 5000`));