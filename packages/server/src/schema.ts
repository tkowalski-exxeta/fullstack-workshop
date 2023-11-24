export const typeDefinitions = /* GraphQL */ `
  type Query {
    formById(id: ID!): Form
    forms: [Form!]!
  }

  type Mutation {
    """
    Allows the user to login
    """
    login(username: String!, password: String!): LoginResponse

    """
    Used to create or update a form including questions
    """
    saveForm(form: FormInput!): Form

    """
    Removes a form with an given ID
    """
    deleteForm(formId: ID!): Boolean

    """
    Submit the collected data of the user who filled the form
    """
    submitAnswers(formId: ID!, answers: [AnswerInput!]!): ID!
  }

  type Form {
    _id: ID!
    questions: [Question!]!
    title: String!
  }
  input FormInput {
    _id: ID
    title: String!
    questions: [QuestionInput!]!
  }

  interface Question {
    _id: ID!
    question: String!
  }
  type SelectQuestion implements Question {
    _id: ID!
    multiSelect: Boolean!
    options: [String!]!
    question: String!
  }
  type TextQuestion implements Question {
    _id: ID!
    question: String!
  }

  input QuestionInput {
    select: SelectQuestionInput
    text: TextQuestionInput
  }
  input SelectQuestionInput {
    _id: ID
    multiSelect: Boolean!
    options: [String!]!
    question: String!
  }
  input TextQuestionInput {
    _id: ID
    question: String!
  }

  input AnswerInput {
    questionId: ID!
    answer: [String!]
  }

  type LoginResponse {
    _id: ID!
    name: String!
    token: String!
  }
`;
