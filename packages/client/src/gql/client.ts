import { GraphQLClient } from "graphql-request";

export const client = new GraphQLClient("http://127.0.0.1/graphql", { headers: {}});
