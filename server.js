const express = require("express");
const expressGraphQl = require('express-graphql').graphqlHTTP;
const schema = require('./schema.js');
const { distance } = require('./distance/distance.js');
const { GraphVertex } = require('./algo/GraphVertex');
const { GraphEdge } = require('./algo/GraphEdge');
const { Graph } = require('./algo/Graph');
const { floydWarshall } = require('./algo/floydWarshall');

const app = express();

app.use('/graphql', expressGraphQl({
    schema: schema,
    graphiql: true
}));
app.get('/',(req ,res)=>{
    // const ans=getDistance(28.565307,77.122413,28.45437,77.07268);
    const vertexA = new GraphVertex('A');
    const vertexB = new GraphVertex('B');
    const vertexC = new GraphVertex('C');
    const vertexD = new GraphVertex('D');
    const vertexE = new GraphVertex('E');
    const vertexF = new GraphVertex('F');
    const vertexG = new GraphVertex('G');
    const vertexH = new GraphVertex('H');

    const edgeAB = new GraphEdge(vertexA, vertexB, 4);
    const edgeAE = new GraphEdge(vertexA, vertexE, 7);
    const edgeAC = new GraphEdge(vertexA, vertexC, 3);
    const edgeBC = new GraphEdge(vertexB, vertexC, 6);
    const edgeBD = new GraphEdge(vertexB, vertexD, 5);
    const edgeEC = new GraphEdge(vertexE, vertexC, 8);
    const edgeED = new GraphEdge(vertexE, vertexD, 2);
    const edgeDC = new GraphEdge(vertexD, vertexC, 11);
    const edgeDG = new GraphEdge(vertexD, vertexG, 10);
    const edgeDF = new GraphEdge(vertexD, vertexF, 2);
    const edgeFG = new GraphEdge(vertexF, vertexG, 3);
    const edgeEG = new GraphEdge(vertexE, vertexG, 5);

    const graph = new Graph();

    graph
      .addVertex(vertexA)
      .addVertex(vertexB)
      .addVertex(vertexC)
      .addVertex(vertexD)
      .addVertex(vertexE)
      .addVertex(vertexF)
      .addVertex(vertexG)
      .addVertex(vertexH);

    graph
      .addEdge(edgeAB)
      .addEdge(edgeAE)
      .addEdge(edgeAC)
      .addEdge(edgeBC)
      .addEdge(edgeBD)
      .addEdge(edgeEC)
      .addEdge(edgeED)
      .addEdge(edgeDC)
      .addEdge(edgeDG)
      .addEdge(edgeDF)
      .addEdge(edgeFG)
      .addEdge(edgeEG);

    return(
        res.send(graph)
    );
});


app.listen(5000, () => console.log(`Server is running on port 5000`));