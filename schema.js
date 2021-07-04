const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNotNull,
    GraphQLFloat
} = require('graphql');

// const map = [
//     {
//         "id": 1,
//         "name": "Adarsh Nagar",
//         "connected": [2],
//         "details": {
//           "line": ["Yellow Line"],
//           "layout": "Elevated",
//           "longitude": 77.169385,
//           "latitude": 28.718104
//         }
//     },
//     {
//         "id": 2,
//         "name": "AIIMS", 
//         "connected": [1],
//         "details": {
//           "line": ["Yellow Line"],
//           "layout": "Underground",
//           "longitude": 77.20771,
//           "latitude": 28.56892
//         }
//     }
// ]

//Station Type
const detailType = new GraphQLObjectType({
    name: 'Detail',
    fields: () => ({
        line: {type: new GraphQLList(GraphQLString)},
        layout: {type: GraphQLString},
        longitude: {type: GraphQLFloat},
        latitude: {type: GraphQLFloat}

    })
}); 
const stationType = new GraphQLObjectType({
    name: 'Station',
    fields: () => ({
        id: {type: GraphQLInt},
        name: {type: GraphQLString},
        connected: {type: GraphQLList(GraphQLInt)},
        details: {type: detailType}

    })
}); 

//Root Query
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        station: {
            type: stationType,
            args: {
                id: {type: GraphQLInt}
            },
            resolve(parentValue, args){
                for(let i = 0; i<map.length;i++){
                    if(map[i].id == args.id){
                        return map[i];
                    }
                }
            }
        },
        station: {
            type: new GraphQLList(stationType),
            resolve(parentValue, args) {
                return map;
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
});