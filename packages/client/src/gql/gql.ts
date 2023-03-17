/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core"
import * as types from "./graphql"

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
  '\n  mutation CreateForm {\n    createForm(form: { title: "form-1" }) {\n      _id\n      title\n    }\n  }\n':
    types.CreateFormDocument,
  '\n  mutation CreateQuestion($formId: ID!) {\n    q1: createQuestion(\n      formId: $formId\n      question: {\n        select: {\n          question: "Do you like GraphQL?"\n          options: ["yes", "no"]\n          multiSelect: false\n        }\n      }\n    ) {\n      __typename\n    }\n    q2: createQuestion(\n      formId: $formId\n      question: { text: { question: "What do you like about GraphQL?" } }\n    ) {\n      __typename\n    }\n  }\n':
    types.CreateQuestionDocument,
  "\n  query GetQuestionnaire($formId: ID!) {\n    questionnaire(id: $formId) {\n      _id\n      title\n      questions {\n        __typename\n        ... on TextQuestion {\n          _id\n          question\n        }\n        ... on SelectQuestion {\n          _id\n          question\n          options\n          multiSelect\n        }\n      }\n    }\n  }\n":
    types.GetQuestionnaireDocument,
}

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
export function graphql(source: string): unknown

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation CreateForm {\n    createForm(form: { title: "form-1" }) {\n      _id\n      title\n    }\n  }\n'
): (typeof documents)['\n  mutation CreateForm {\n    createForm(form: { title: "form-1" }) {\n      _id\n      title\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation CreateQuestion($formId: ID!) {\n    q1: createQuestion(\n      formId: $formId\n      question: {\n        select: {\n          question: "Do you like GraphQL?"\n          options: ["yes", "no"]\n          multiSelect: false\n        }\n      }\n    ) {\n      __typename\n    }\n    q2: createQuestion(\n      formId: $formId\n      question: { text: { question: "What do you like about GraphQL?" } }\n    ) {\n      __typename\n    }\n  }\n'
): (typeof documents)['\n  mutation CreateQuestion($formId: ID!) {\n    q1: createQuestion(\n      formId: $formId\n      question: {\n        select: {\n          question: "Do you like GraphQL?"\n          options: ["yes", "no"]\n          multiSelect: false\n        }\n      }\n    ) {\n      __typename\n    }\n    q2: createQuestion(\n      formId: $formId\n      question: { text: { question: "What do you like about GraphQL?" } }\n    ) {\n      __typename\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query GetQuestionnaire($formId: ID!) {\n    questionnaire(id: $formId) {\n      _id\n      title\n      questions {\n        __typename\n        ... on TextQuestion {\n          _id\n          question\n        }\n        ... on SelectQuestion {\n          _id\n          question\n          options\n          multiSelect\n        }\n      }\n    }\n  }\n"
): (typeof documents)["\n  query GetQuestionnaire($formId: ID!) {\n    questionnaire(id: $formId) {\n      _id\n      title\n      questions {\n        __typename\n        ... on TextQuestion {\n          _id\n          question\n        }\n        ... on SelectQuestion {\n          _id\n          question\n          options\n          multiSelect\n        }\n      }\n    }\n  }\n"]

export function graphql(source: string) {
  return (documents as any)[source] ?? {}
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never
