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
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
};

export type Form = {
  __typename?: "Form";
  _id: Scalars["ID"]["output"];
  questions: Array<Question>;
  title: Scalars["String"]["output"];
};

export type FormInput = {
  title: Scalars["String"]["input"];
};

export type Mutation = {
  __typename?: "Mutation";
  /** Creates a new form */
  createForm?: Maybe<Form>;
  /** Attaches a new question to an existing form */
  createQuestion?: Maybe<Question>;
  /** Removes a form with an given ID */
  deleteForm?: Maybe<Scalars["Boolean"]["output"]>;
  /** Removes a question from within an existing form */
  deleteQuestion?: Maybe<Scalars["Boolean"]["output"]>;
  /** Allows to updates the details of an existing form */
  updateForm?: Maybe<Form>;
  /** Updates a question within an existing form */
  updateQuestion?: Maybe<Question>;
};

export type MutationCreateFormArgs = {
  form: FormInput;
};

export type MutationCreateQuestionArgs = {
  formId: Scalars["ID"]["input"];
  question: QuestionInput;
};

export type MutationDeleteFormArgs = {
  formId: Scalars["ID"]["input"];
};

export type MutationDeleteQuestionArgs = {
  formId: Scalars["ID"]["input"];
  questionId: Scalars["ID"]["input"];
};

export type MutationUpdateFormArgs = {
  form: FormInput;
  formId: Scalars["ID"]["input"];
};

export type MutationUpdateQuestionArgs = {
  formId: Scalars["ID"]["input"];
  question: QuestionInput;
  questionId: Scalars["ID"]["input"];
};

export type Query = {
  __typename?: "Query";
  formById?: Maybe<Form>;
  forms: Array<Form>;
};

export type QueryFormByIdArgs = {
  id: Scalars["ID"]["input"];
};

export type Question = {
  _id: Scalars["ID"]["output"];
  question: Scalars["String"]["output"];
};

export type QuestionInput = {
  select?: InputMaybe<SelectQuestionInput>;
  text?: InputMaybe<TextQuestionInput>;
};

export type SelectQuestion = Question & {
  __typename?: "SelectQuestion";
  _id: Scalars["ID"]["output"];
  multiSelect: Scalars["Boolean"]["output"];
  options: Array<Scalars["String"]["output"]>;
  question: Scalars["String"]["output"];
};

export type SelectQuestionInput = {
  multiSelect: Scalars["Boolean"]["input"];
  options: Array<Scalars["String"]["input"]>;
  question: Scalars["String"]["input"];
};

export type TextQuestion = Question & {
  __typename?: "TextQuestion";
  _id: Scalars["ID"]["output"];
  question: Scalars["String"]["output"];
};

export type TextQuestionInput = {
  question: Scalars["String"]["input"];
};

export type FormDetailsQueryVariables = Exact<{
  id: Scalars["ID"]["input"];
}>;

export type FormDetailsQuery = {
  __typename: "Query";
  formById?: {
    __typename: "Form";
    _id: string;
    title: string;
    questions: Array<
      | ({ __typename: "SelectQuestion"; _id: string } & {
          " $fragmentRefs"?: {
            QuestionDisplay_SelectQuestion_Fragment: QuestionDisplay_SelectQuestion_Fragment;
          };
        })
      | ({ __typename: "TextQuestion"; _id: string } & {
          " $fragmentRefs"?: {
            QuestionDisplay_TextQuestion_Fragment: QuestionDisplay_TextQuestion_Fragment;
          };
        })
    >;
  } | null;
};

type QuestionDisplay_SelectQuestion_Fragment = {
  __typename: "SelectQuestion";
  multiSelect: boolean;
  options: Array<string>;
  _id: string;
  question: string;
} & { " $fragmentName"?: "QuestionDisplay_SelectQuestion_Fragment" };

type QuestionDisplay_TextQuestion_Fragment = {
  __typename: "TextQuestion";
  _id: string;
  question: string;
} & { " $fragmentName"?: "QuestionDisplay_TextQuestion_Fragment" };

export type QuestionDisplayFragment =
  | QuestionDisplay_SelectQuestion_Fragment
  | QuestionDisplay_TextQuestion_Fragment;

export type FormListItemFragment = {
  __typename: "Form";
  _id: string;
  title: string;
} & { " $fragmentName"?: "FormListItemFragment" };

export type FormListPageQueryVariables = Exact<{ [key: string]: never }>;

export type FormListPageQuery = {
  __typename: "Query";
  forms: Array<
    { __typename: "Form"; _id: string } & {
      " $fragmentRefs"?: { FormListItemFragment: FormListItemFragment };
    }
  >;
};

export const QuestionDisplayFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "QuestionDisplay" },
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
                { kind: "Field", name: { kind: "Name", value: "__typename" } },
                { kind: "Field", name: { kind: "Name", value: "multiSelect" } },
                { kind: "Field", name: { kind: "Name", value: "options" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<QuestionDisplayFragment, unknown>;
export const FormListItemFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "FormListItem" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "Form" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          { kind: "Field", name: { kind: "Name", value: "_id" } },
          { kind: "Field", name: { kind: "Name", value: "title" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<FormListItemFragment, unknown>;
export const FormDetailsDocument = {
  __meta__: { hash: "7ce769e8cee799b8f1471fe60aab025d14f531ac" },
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "FormDetails" },
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
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
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
                { kind: "Field", name: { kind: "Name", value: "__typename" } },
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
                      { kind: "Field", name: { kind: "Name", value: "_id" } },
                      {
                        kind: "FragmentSpread",
                        name: { kind: "Name", value: "QuestionDisplay" },
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
      name: { kind: "Name", value: "QuestionDisplay" },
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
                { kind: "Field", name: { kind: "Name", value: "__typename" } },
                { kind: "Field", name: { kind: "Name", value: "multiSelect" } },
                { kind: "Field", name: { kind: "Name", value: "options" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<FormDetailsQuery, FormDetailsQueryVariables>;
export const FormListPageDocument = {
  __meta__: { hash: "c11f70503e2cb7937fe154826673f3da6f00a31a" },
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "FormListPage" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "forms" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "__typename" } },
                { kind: "Field", name: { kind: "Name", value: "_id" } },
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "FormListItem" },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "FormListItem" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "Form" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          { kind: "Field", name: { kind: "Name", value: "_id" } },
          { kind: "Field", name: { kind: "Name", value: "title" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<FormListPageQuery, FormListPageQueryVariables>;
