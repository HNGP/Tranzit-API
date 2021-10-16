const axios = require("axios");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNotNull,
  GraphQLFloat,
} = require("graphql");
const { findNearestStation } = require("./calculations/geolocation");
const delhi = require("./stations/delhi-data.json");

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

//Root Query
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    // stationById: {
    //   type: stationType,
    //   args: {
    //     id: { type: GraphQLString },
    //   },
    //   resolve(parentValue, args) {
    //     return axios
    //       .get("http://localhost:3000/stations/" + args.id)
    //       .then((res) => res.data);
    //   },
    // },
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
        return delhi.stations.map((station) => station);
      },
    },
    // stationByName: {
    //   type: stationType,
    //   args: {
    //     name: { type: GraphQLString },
    //   },
    //   resolve(parentValue, args) {
    //     return axios
    //       .get("http://localhost:3000/stations?title=" + args.name)
    //       .then((res) => res.data);
    //   },
    // },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
