const express = require("express");
const expressGraphQl = require('express-graphql').graphqlHTTP;
const schema = require('./schema.js');

const app = express();

app.use('/graphql', expressGraphQl({
    schema: schema,
    graphiql: true
}));


app.listen(5000, () => console.log(`Server is running on port 5000`));