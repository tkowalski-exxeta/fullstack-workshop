/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Mutation = {
  __typename?: "Mutation";
  createForm?: Maybe<Questionnaire>;
  createQuestion?: Maybe<Question>;
};

export type MutationCreateFormArgs = {
  form: QuestionnaireInput;
};

export type MutationCreateQuestionArgs = {
  formId: Scalars["ID"];
  question: QuestionInput;
};

export type Query = {
  __typename?: "Query";
  questionnaire?: Maybe<Questionnaire>;
};

export type QueryQuestionnaireArgs = {
  id: Scalars["ID"];
};

export type Question = {
  _id: Scalars["ID"];
  question: Scalars["String"];
};

export type QuestionInput = {
  select?: InputMaybe<SelectQuestionInput>;
  text?: InputMaybe<TextQuestionInput>;
};

export type Questionnaire = {
  __typename?: "Questionnaire";
  _id: Scalars["ID"];
  questions: Array<Question>;
  title: Scalars["String"];
};

export type QuestionnaireInput = {
  title: Scalars["String"];
};

export type SelectQuestion = Question & {
  __typename?: "SelectQuestion";
  _id: Scalars["ID"];
  multiSelect: Scalars["Boolean"];
  options: Array<Scalars["String"]>;
  question: Scalars["String"];
};

export type SelectQuestionInput = {
  multiSelect: Scalars["Boolean"];
  options: Array<Scalars["String"]>;
  question: Scalars["String"];
};

export type TextQuestion = Question & {
  __typename?: "TextQuestion";
  _id: Scalars["ID"];
  question: Scalars["String"];
};

export type TextQuestionInput = {
  question: Scalars["String"];
};

export type CreateFormMutationVariables = Exact<{
  title: Scalars["String"];
}>;

export type CreateFormMutation = {
  __typename?: "Mutation";
  createForm?: {
    __typename?: "Questionnaire";
    _id: string;
    title: string;
  } | null;
};

export type CreateQuestionMutationVariables = Exact<{
  formId: Scalars["ID"];
  question: QuestionInput;
}>;

export type CreateQuestionMutation = {
  __typename?: "Mutation";
  q1?:
    | { __typename: "SelectQuestion"; _id: string }
    | { __typename: "TextQuestion"; _id: string }
    | null;
};

export type GetQuestionnaireQueryVariables = Exact<{
  formId: Scalars["ID"];
}>;

export type GetQuestionnaireQuery = {
  __typename?: "Query";
  questionnaire?: {
    __typename?: "Questionnaire";
    _id: string;
    title: string;
    questions: Array<
      | {
          __typename: "SelectQuestion";
          _id: string;
          question: string;
          options: Array<string>;
          multiSelect: boolean;
        }
      | { __typename: "TextQuestion"; _id: string; question: string }
    >;
  } | null;
};

export const CreateFormDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "CreateForm" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "title" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "createForm" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "form" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "title" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "title" },
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "_id" } },
                { kind: "Field", name: { kind: "Name", value: "title" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CreateFormMutation, CreateFormMutationVariables>;
export const CreateQuestionDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "CreateQuestion" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "formId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "question" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "QuestionInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            alias: { kind: "Name", value: "q1" },
            name: { kind: "Name", value: "createQuestion" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "formId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "formId" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "question" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "question" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "_id" } },
                { kind: "Field", name: { kind: "Name", value: "__typename" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  CreateQuestionMutation,
  CreateQuestionMutationVariables
>;
export const GetQuestionnaireDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetQuestionnaire" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "formId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "questionnaire" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "formId" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "_id" } },
                { kind: "Field", name: { kind: "Name", value: "title" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "questions" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "__typename" },
                      },
                      {
                        kind: "InlineFragment",
                        typeCondition: {
                          kind: "NamedType",
                          name: { kind: "Name", value: "TextQuestion" },
                        },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "_id" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "question" },
                            },
                          ],
                        },
                      },
                      {
                        kind: "InlineFragment",
                        typeCondition: {
                          kind: "NamedType",
                          name: { kind: "Name", value: "SelectQuestion" },
                        },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "_id" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "question" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "options" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "multiSelect" },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetQuestionnaireQuery,
  GetQuestionnaireQueryVariables
>;
