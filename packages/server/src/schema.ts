export const typeDefinitions = /* GraphQL */ `
  type Mutation {
    "Creates a new form"
    createForm(form: FormInput!): Form

    "Allows to updates the details of an existing form"
    updateForm(formId: ID!, form: FormInput!): Form

    "Removes a form with an given ID"
    deleteForm(formId: ID!): Boolean

    "Attaches a new question to an existing form"
    createQuestion(formId: ID!, question: QuestionInput!): Question

    "Updates a question within an existing form"
    updateQuestion(
      formId: ID!
      questionId: ID!
      question: QuestionInput!
    ): Question

    "Removes a question from within an existing form"
    deleteQuestion(formId: ID!, questionId: ID!): Boolean
  }

  type Query {
    forms: [Form!]!
    formById(id: ID!): Form
  }

  interface Question {
    _id: ID!
    question: String!
  }

  input QuestionInput {
    select: SelectQuestionInput
    text: TextQuestionInput
  }

  type Form {
    _id: ID!
    questions: [Question!]!
    title: String!
  }

  input FormInput {
    title: String!
  }

  type SelectQuestion implements Question {
    _id: ID!
    question: String!
    multiSelect: Boolean!
    options: [String!]!
  }

  input SelectQuestionInput {
    multiSelect: Boolean!
    options: [String!]!
    question: String!
  }

  type TextQuestion implements Question {
    _id: ID!
    question: String!
  }

  input TextQuestionInput {
    question: String!
  }
`;
