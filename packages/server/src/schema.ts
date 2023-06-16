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
    Creates a new form
    """
    createForm(form: FormInput!): Form

    """
    Attaches a new question to an existing form
    """
    createQuestion(formId: ID!, question: QuestionInput!): Question

    """
    Removes a form with an given ID
    """
    deleteForm(formId: ID!): Boolean

    """
    Removes a question from within an existing form
    """
    deleteQuestion(formId: ID!, questionId: ID!): Boolean

    """
    Allows to updates the details of an existing form
    """
    updateForm(form: FormInput!, formId: ID!): Form

    """
    Updates a question within an existing form
    """
    updateQuestion(
      formId: ID!
      question: QuestionInput!
      questionId: ID!
    ): Question
  }

  type Form {
    _id: ID!
    questions: [Question!]!
    title: String!
  }
  input FormInput {
    title: String!
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
    multiSelect: Boolean!
    options: [String!]!
    question: String!
  }
  input TextQuestionInput {
    question: String!
  }

  type LoginResponse {
    _id: ID!
    name: String!
    token: String!
  }
`
