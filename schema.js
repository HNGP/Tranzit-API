const axios = require('axios');
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNotNull,
    GraphQLFloat
} = require('graphql');

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
        id: {type: GraphQLString},
        title: {type: GraphQLString},
        connected: {type: GraphQLList(GraphQLString)},
        details: {type: detailType}

    })
}); 

//Root Query
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        stationById: {
            type: stationType,
            args: {
                id: {type: GraphQLString}
            },
            resolve(parentValue, args){
                return axios.get("http://localhost:3000/station/" + args.id)
                    .then(res => res.data);
            }
        },
        stations: {
            type: new GraphQLList(stationType),
            resolve(parentValue, args) {
                return axios.get("http://localhost:3000/station/")
                    .then(res => res.data);
            }
        },
        stationByName: {
            type: stationType,
            args: {
                name: {type: GraphQLString}
            },
            resolve(parentValue, args){
                return axios.get("http://localhost:3000/station?title=" + args.name)
                    .then(res => res.data);
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
});