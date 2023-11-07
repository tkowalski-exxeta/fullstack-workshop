/* eslint-disable */
import * as types from "./graphql";
import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
  "\n  fragment Questionnaire on Form {\n    title\n    questions {\n      _id\n      ...QuestionDisplay\n    }\n  }\n":
    types.QuestionnaireFragmentDoc,
  "\n  query FormDetails($id: ID!) {\n    formById(id: $id) {\n      _id\n      ...Questionnaire\n    }\n  }\n":
    types.FormDetailsDocument,
  "\n  fragment QuestionDisplay on Question {\n    __typename\n    _id\n    question\n    ... on SelectQuestion {\n      multiSelect\n      options\n    }\n  }\n":
    types.QuestionDisplayFragmentDoc,
  "\n  fragment FormListItem on Form {\n    _id\n    title\n  }\n":
    types.FormListItemFragmentDoc,
  "\n  query FormListPage {\n    forms {\n      _id\n      ...FormListItem\n    }\n  }\n":
    types.FormListPageDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  fragment Questionnaire on Form {\n    title\n    questions {\n      _id\n      ...QuestionDisplay\n    }\n  }\n",
): (typeof documents)["\n  fragment Questionnaire on Form {\n    title\n    questions {\n      _id\n      ...QuestionDisplay\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query FormDetails($id: ID!) {\n    formById(id: $id) {\n      _id\n      ...Questionnaire\n    }\n  }\n",
): (typeof documents)["\n  query FormDetails($id: ID!) {\n    formById(id: $id) {\n      _id\n      ...Questionnaire\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  fragment QuestionDisplay on Question {\n    __typename\n    _id\n    question\n    ... on SelectQuestion {\n      multiSelect\n      options\n    }\n  }\n",
): (typeof documents)["\n  fragment QuestionDisplay on Question {\n    __typename\n    _id\n    question\n    ... on SelectQuestion {\n      multiSelect\n      options\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  fragment FormListItem on Form {\n    _id\n    title\n  }\n",
): (typeof documents)["\n  fragment FormListItem on Form {\n    _id\n    title\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query FormListPage {\n    forms {\n      _id\n      ...FormListItem\n    }\n  }\n",
): (typeof documents)["\n  query FormListPage {\n    forms {\n      _id\n      ...FormListItem\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;
