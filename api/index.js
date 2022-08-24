const path = require("path");
const { mergeTypeDefs, mergeResolvers } = require("@graphql-tools/merge");
const { loadFilesSync } = require("@graphql-tools/load-files");

const resolversArray = loadFilesSync(
  path.join(__dirname, "../**/*.resolver.*"),
  { extensions: ["js"] }
);

const typeDefsArray = loadFilesSync(path.join(__dirname, "../**/*.schema.*"), {
  extensions: ["js"],
});

const resolver = mergeResolvers(resolversArray);
const typeDefs = mergeTypeDefs(typeDefsArray);

module.exports = { resolver, typeDefs };
