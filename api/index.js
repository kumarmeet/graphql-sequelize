const path = require("path");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const { mergeTypeDefs, mergeResolvers } = require("@graphql-tools/merge");
const { loadFilesSync } = require("@graphql-tools/load-files");

const resolversArray = loadFilesSync(
  path.join(__dirname, "../**/*.resolver.*")
);
const typeDefsArray = loadFilesSync(path.join(__dirname, "../**/*.schema.*"));

const resolver = mergeResolvers(resolversArray);
const typeDefs = mergeTypeDefs(typeDefsArray);

module.exports = makeExecutableSchema({ resolver, typeDefs });
