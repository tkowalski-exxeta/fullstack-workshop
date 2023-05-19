import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Form = {
  __typename?: "Form";
  _id: Scalars["ID"];
  questions: Array<Question>;
  title: Scalars["String"];
};

export type FormInput = {
  title: Scalars["String"];
};

export type Mutation = {
  __typename?: "Mutation";
  /** Creates a new form */
  createForm?: Maybe<Form>;
  /** Attaches a new question to an existing form */
  createQuestion?: Maybe<Question>;
  /** Removes a form with an given ID */
  deleteForm?: Maybe<Scalars["Boolean"]>;
  /** Removes a question from within an existing form */
  deleteQuestion?: Maybe<Scalars["Boolean"]>;
  /** Allows to updates the details of an existing form */
  updateForm?: Maybe<Form>;
  /** Updates a question within an existing form */
  updateQuestion?: Maybe<Question>;
};

export type MutationCreateFormArgs = {
  form: FormInput;
};

export type MutationCreateQuestionArgs = {
  formId: Scalars["ID"];
  question: QuestionInput;
};

export type MutationDeleteFormArgs = {
  formId: Scalars["ID"];
};

export type MutationDeleteQuestionArgs = {
  formId: Scalars["ID"];
  questionId: Scalars["ID"];
};

export type MutationUpdateFormArgs = {
  form: FormInput;
  formId: Scalars["ID"];
};

export type MutationUpdateQuestionArgs = {
  formId: Scalars["ID"];
  question: QuestionInput;
  questionId: Scalars["ID"];
};

export type Query = {
  __typename?: "Query";
  formById?: Maybe<Form>;
  forms: Array<Form>;
};

export type QueryFormByIdArgs = {
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

export type GetFormDetailsQueryVariables = Exact<{
  id: Scalars["ID"];
}>;

export type GetFormDetailsQuery = {
  __typename?: "Query";
  formById?: {
    __typename?: "Form";
    _id: string;
    title: string;
    questions: Array<
      | {
          __typename: "SelectQuestion";
          multiSelect: boolean;
          options: Array<string>;
          _id: string;
          question: string;
        }
      | { __typename: "TextQuestion"; _id: string; question: string }
    >;
  } | null;
};

type FormDetailQuestion_SelectQuestion_Fragment = {
  __typename: "SelectQuestion";
  multiSelect: boolean;
  options: Array<string>;
  _id: string;
  question: string;
};

type FormDetailQuestion_TextQuestion_Fragment = {
  __typename: "TextQuestion";
  _id: string;
  question: string;
};

export type FormDetailQuestionFragment =
  | FormDetailQuestion_SelectQuestion_Fragment
  | FormDetailQuestion_TextQuestion_Fragment;

export type GetFormMainQueryVariables = Exact<{ [key: string]: never }>;

export type GetFormMainQuery = {
  __typename?: "Query";
  forms: Array<{ __typename?: "Form"; _id: string; title: string }>;
};

export const FormDetailQuestionFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "FormDetailQuestion" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "Question" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          { kind: "Field", name: { kind: "Name", value: "_id" } },
          { kind: "Field", name: { kind: "Name", value: "question" } },
          {
            kind: "InlineFragment",
            typeCondition: {
              kind: "NamedType",
              name: { kind: "Name", value: "SelectQuestion" },
            },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "multiSelect" } },
                { kind: "Field", name: { kind: "Name", value: "options" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<FormDetailQuestionFragment, unknown>;
export const GetFormDetailsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetFormDetails" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
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
            name: { kind: "Name", value: "formById" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
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
                        kind: "FragmentSpread",
                        name: { kind: "Name", value: "FormDetailQuestion" },
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
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "FormDetailQuestion" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "Question" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          { kind: "Field", name: { kind: "Name", value: "_id" } },
          { kind: "Field", name: { kind: "Name", value: "question" } },
          {
            kind: "InlineFragment",
            typeCondition: {
              kind: "NamedType",
              name: { kind: "Name", value: "SelectQuestion" },
            },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "multiSelect" } },
                { kind: "Field", name: { kind: "Name", value: "options" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetFormDetailsQuery, GetFormDetailsQueryVariables>;
export const GetFormMainDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetFormMain" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "forms" },
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
} as unknown as DocumentNode<GetFormMainQuery, GetFormMainQueryVariables>;
