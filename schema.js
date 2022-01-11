const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLFloat,
} = require("graphql");
const { findNearestStation } = require("./calculations/geolocation");
const { findShortestPath } = require("./calculations/algo");
const delhi = require("./stations/delhi-data.json");
const delhiComplete = require("./scripts/delhi-stations.json");

//Station Type
const detailType = new GraphQLObjectType({
  name: "Detail",
  fields: () => ({
    line: { type: new GraphQLList(GraphQLString) },
    layout: { type: GraphQLString },
    longitude: { type: GraphQLFloat },
    latitude: { type: GraphQLFloat },
  }),
});
const stationType = new GraphQLObjectType({
  name: "Station",
  fields: () => ({
    id: { type: GraphQLString },
    title: { type: GraphQLString },
    connected: { type: GraphQLList(GraphQLString) },
    details: { type: detailType },
  }),
});
const nearestStationType = new GraphQLObjectType({
  name: "nearestStation",
  fields: () => ({
    nearestStation: { type: GraphQLString },
    distance: { type: GraphQLFloat },
  }),
});
const stationListType = new GraphQLObjectType({
  name: "StationList",
  fields: () => ({
    station: { type: GraphQLString },
    lines: { type: new GraphQLList(GraphQLString) },
  }),
});
const routeType = new GraphQLObjectType({
  name: "Route",
  fields: () => ({
    time: { type: GraphQLFloat },
    stationsList: { type: new GraphQLList(stationListType) },
    fare: { type: GraphQLInt },
    interchange: { type: GraphQLInt },
  }),
});

//Root Query
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    nearestStation: {
      type: nearestStationType,
      args: {
        latitude: { type: GraphQLFloat },
        longitude: { type: GraphQLFloat },
      },
      resolve(parentValue, args) {
        return findNearestStation(args.latitude, args.longitude);
      },
    },
    stations: {
      type: new GraphQLList(stationType),
      resolve(parentValue, args) {
        return delhiComplete;
      },
    },
    route: {
      type: routeType,
      args: {
        source: { type: GraphQLInt },
        destination: { type: GraphQLInt },
      },
      resolve(parentValue, args) {
        return findShortestPath(
          parseInt(args.source, 10),
          parseInt(args.destination, 10)
        );
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
