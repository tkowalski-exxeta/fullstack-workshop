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
  "\n  mutation CreateForm($title: String!) {\n    createForm(form: { title: $title }) {\n      _id\n      title\n    }\n  }\n":
    types.CreateFormDocument,
  "\n  mutation UpdateForm($title: String!, $formId: ID!) {\n    updateForm(form: { title: $title }, formId: $formId) {\n      _id\n      title\n    }\n  }\n":
    types.UpdateFormDocument,
  "\n  mutation DeleteForm($formId: ID!) {\n    deleteForm(formId: $formId)\n  }\n":
    types.DeleteFormDocument,
  "\n  mutation CreateQuestion($formId: ID!, $question: QuestionInput!) {\n    q1: createQuestion(formId: $formId, question: $question) {\n      _id\n      __typename\n    }\n  }\n":
    types.CreateQuestionDocument,
  "\n  mutation UpdateQuestion(\n    $formId: ID!\n    $questionId: ID!\n    $question: QuestionInput!\n  ) {\n    q1: updateQuestion(\n      formId: $formId\n      questionId: $questionId\n      question: $question\n    ) {\n      _id\n      __typename\n    }\n  }\n":
    types.UpdateQuestionDocument,
  "\n  mutation DeleteQuestion($formId: ID!, $questionId: ID!) {\n    deleteQuestion(formId: $formId, questionId: $questionId)\n  }\n":
    types.DeleteQuestionDocument,
  "\n  query GetForm($formId: ID!) {\n    form(id: $formId) {\n      _id\n      title\n      questions {\n        __typename\n        ... on TextQuestion {\n          _id\n          text\n        }\n        ... on SelectQuestion {\n          _id\n          text\n          options\n          multiSelect\n        }\n      }\n    }\n  }\n":
    types.GetFormDocument,
  "\n  query GetForms {\n    forms {\n      _id\n      title\n      questions {\n        __typename\n        ... on TextQuestion {\n          _id\n          text\n        }\n        ... on SelectQuestion {\n          _id\n          text\n          options\n          multiSelect\n        }\n      }\n    }\n  }\n":
    types.GetFormsDocument,
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
  source: "\n  mutation CreateForm($title: String!) {\n    createForm(form: { title: $title }) {\n      _id\n      title\n    }\n  }\n"
): (typeof documents)["\n  mutation CreateForm($title: String!) {\n    createForm(form: { title: $title }) {\n      _id\n      title\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation UpdateForm($title: String!, $formId: ID!) {\n    updateForm(form: { title: $title }, formId: $formId) {\n      _id\n      title\n    }\n  }\n"
): (typeof documents)["\n  mutation UpdateForm($title: String!, $formId: ID!) {\n    updateForm(form: { title: $title }, formId: $formId) {\n      _id\n      title\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation DeleteForm($formId: ID!) {\n    deleteForm(formId: $formId)\n  }\n"
): (typeof documents)["\n  mutation DeleteForm($formId: ID!) {\n    deleteForm(formId: $formId)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation CreateQuestion($formId: ID!, $question: QuestionInput!) {\n    q1: createQuestion(formId: $formId, question: $question) {\n      _id\n      __typename\n    }\n  }\n"
): (typeof documents)["\n  mutation CreateQuestion($formId: ID!, $question: QuestionInput!) {\n    q1: createQuestion(formId: $formId, question: $question) {\n      _id\n      __typename\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation UpdateQuestion(\n    $formId: ID!\n    $questionId: ID!\n    $question: QuestionInput!\n  ) {\n    q1: updateQuestion(\n      formId: $formId\n      questionId: $questionId\n      question: $question\n    ) {\n      _id\n      __typename\n    }\n  }\n"
): (typeof documents)["\n  mutation UpdateQuestion(\n    $formId: ID!\n    $questionId: ID!\n    $question: QuestionInput!\n  ) {\n    q1: updateQuestion(\n      formId: $formId\n      questionId: $questionId\n      question: $question\n    ) {\n      _id\n      __typename\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation DeleteQuestion($formId: ID!, $questionId: ID!) {\n    deleteQuestion(formId: $formId, questionId: $questionId)\n  }\n"
): (typeof documents)["\n  mutation DeleteQuestion($formId: ID!, $questionId: ID!) {\n    deleteQuestion(formId: $formId, questionId: $questionId)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query GetForm($formId: ID!) {\n    form(id: $formId) {\n      _id\n      title\n      questions {\n        __typename\n        ... on TextQuestion {\n          _id\n          text\n        }\n        ... on SelectQuestion {\n          _id\n          text\n          options\n          multiSelect\n        }\n      }\n    }\n  }\n"
): (typeof documents)["\n  query GetForm($formId: ID!) {\n    form(id: $formId) {\n      _id\n      title\n      questions {\n        __typename\n        ... on TextQuestion {\n          _id\n          text\n        }\n        ... on SelectQuestion {\n          _id\n          text\n          options\n          multiSelect\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query GetForms {\n    forms {\n      _id\n      title\n      questions {\n        __typename\n        ... on TextQuestion {\n          _id\n          text\n        }\n        ... on SelectQuestion {\n          _id\n          text\n          options\n          multiSelect\n        }\n      }\n    }\n  }\n"
): (typeof documents)["\n  query GetForms {\n    forms {\n      _id\n      title\n      questions {\n        __typename\n        ... on TextQuestion {\n          _id\n          text\n        }\n        ... on SelectQuestion {\n          _id\n          text\n          options\n          multiSelect\n        }\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;
