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

export type Form = {
  __typename?: "Form";
  _id: Scalars["ID"];
  questions: Array<Question>;
  title: Scalars["String"];
};

export type FormAnswerEntryInput = {
  id: Scalars["ID"];
  result?: InputMaybe<Array<Scalars["String"]>>;
};

export type FormInput = {
  _id?: InputMaybe<Scalars["ID"]>;
  questions: Array<QuestionInput>;
  title: Scalars["String"];
};

export type LoginResponse = {
  __typename?: "LoginResponse";
  _id: Scalars["ID"];
  name: Scalars["String"];
  token: Scalars["String"];
};

export type Mutation = {
  __typename?: "Mutation";
  /** Removes a form with an given ID */
  deleteForm?: Maybe<Scalars["Boolean"]>;
  login?: Maybe<LoginResponse>;
  /** Used to create or update a form including questions */
  saveForm?: Maybe<Form>;
  /** Submit the collected data of the user who filled the form */
  submitFormAnswer: Scalars["ID"];
};

export type MutationDeleteFormArgs = {
  formId: Scalars["ID"];
};

export type MutationLoginArgs = {
  password: Scalars["String"];
  username: Scalars["String"];
};

export type MutationSaveFormArgs = {
  form: FormInput;
};

export type MutationSubmitFormAnswerArgs = {
  data: Array<FormAnswerEntryInput>;
  formId: Scalars["ID"];
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
  _id?: InputMaybe<Scalars["ID"]>;
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
  _id?: InputMaybe<Scalars["ID"]>;
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

export type SubmitFormdataMutationVariables = Exact<{
  formId: Scalars["ID"];
  data: Array<FormAnswerEntryInput> | FormAnswerEntryInput;
}>;

export type SubmitFormdataMutation = {
  __typename?: "Mutation";
  submitFormAnswer: string;
};

export type GetFormEditorQueryVariables = Exact<{
  id: Scalars["ID"];
}>;

export type GetFormEditorQuery = {
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

export type FormEditorSaveFormMutationVariables = Exact<{
  form: FormInput;
}>;

export type FormEditorSaveFormMutation = {
  __typename?: "Mutation";
  saveForm?: {
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

export type FormEditorFormFragment = {
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
};

type FormEditorQuestion_SelectQuestion_Fragment = {
  __typename: "SelectQuestion";
  multiSelect: boolean;
  options: Array<string>;
  _id: string;
  question: string;
};

type FormEditorQuestion_TextQuestion_Fragment = {
  __typename: "TextQuestion";
  _id: string;
  question: string;
};

export type FormEditorQuestionFragment =
  | FormEditorQuestion_SelectQuestion_Fragment
  | FormEditorQuestion_TextQuestion_Fragment;

export type GetFormMainQueryVariables = Exact<{ [key: string]: never }>;

export type GetFormMainQuery = {
  __typename?: "Query";
  forms: Array<{ __typename?: "Form"; _id: string; title: string }>;
};

export type CreateFormMutationVariables = Exact<{
  formInput: FormInput;
}>;

export type CreateFormMutation = {
  __typename?: "Mutation";
  saveForm?: { __typename?: "Form"; _id: string; title: string } | null;
};

export type DeleteFormMutationVariables = Exact<{
  formId: Scalars["ID"];
}>;

export type DeleteFormMutation = {
  __typename?: "Mutation";
  deleteForm?: boolean | null;
};

export type LoginMutationVariables = Exact<{
  username: Scalars["String"];
  password: Scalars["String"];
}>;

export type LoginMutation = {
  __typename?: "Mutation";
  login?: {
    __typename?: "LoginResponse";
    _id: string;
    name: string;
    token: string;
  } | null;
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
export const FormEditorQuestionFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "FormEditorQuestion" },
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
} as unknown as DocumentNode<FormEditorQuestionFragment, unknown>;
export const FormEditorFormFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "FormEditorForm" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "Form" },
      },
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
                  name: { kind: "Name", value: "FormEditorQuestion" },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "FormEditorQuestion" },
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
} as unknown as DocumentNode<FormEditorFormFragment, unknown>;
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
export const SubmitFormdataDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "SubmitFormdata" },
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
          variable: { kind: "Variable", name: { kind: "Name", value: "data" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "ListType",
              type: {
                kind: "NonNullType",
                type: {
                  kind: "NamedType",
                  name: { kind: "Name", value: "FormAnswerEntryInput" },
                },
              },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "submitFormAnswer" },
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
                name: { kind: "Name", value: "data" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "data" },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  SubmitFormdataMutation,
  SubmitFormdataMutationVariables
>;
export const GetFormEditorDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetFormEditor" },
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
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "FormEditorForm" },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "FormEditorQuestion" },
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
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "FormEditorForm" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "Form" },
      },
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
                  name: { kind: "Name", value: "FormEditorQuestion" },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetFormEditorQuery, GetFormEditorQueryVariables>;
export const FormEditorSaveFormDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "FormEditorSaveForm" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "form" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "FormInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "saveForm" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "form" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "form" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "FormEditorForm" },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "FormEditorQuestion" },
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
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "FormEditorForm" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "Form" },
      },
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
                  name: { kind: "Name", value: "FormEditorQuestion" },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  FormEditorSaveFormMutation,
  FormEditorSaveFormMutationVariables
>;
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
            name: { kind: "Name", value: "formInput" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "FormInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "saveForm" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "form" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "formInput" },
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
export const DeleteFormDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "DeleteForm" },
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
            name: { kind: "Name", value: "deleteForm" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "formId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "formId" },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<DeleteFormMutation, DeleteFormMutationVariables>;
export const LoginDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "Login" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "username" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "password" },
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
            name: { kind: "Name", value: "login" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "username" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "username" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "password" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "password" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "_id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
                { kind: "Field", name: { kind: "Name", value: "token" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
