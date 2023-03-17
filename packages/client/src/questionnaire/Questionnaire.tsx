import { useState } from "react"
import { graphql } from "../gql"
import { useQuery } from "@tanstack/react-query"
import request from "graphql-request"

const createFormDocument = graphql(/* GraphQL */ `
  mutation CreateForm {
    createForm(form: { title: "form-1" }) {
      _id
      title
    }
  }
`)

const createQuestionsDocument = graphql(/* GraphQL */ `
  mutation CreateQuestion($formId: ID!) {
    q1: createQuestion(
      formId: $formId
      question: {
        select: {
          question: "Do you like GraphQL?"
          options: ["yes", "no"]
          multiSelect: false
        }
      }
    ) {
      __typename
    }
    q2: createQuestion(
      formId: $formId
      question: { text: { question: "What do you like about GraphQL?" } }
    ) {
      __typename
    }
  }
`)

const getQuestionnaireDocument = graphql(/* GraphQL */ `
  query GetQuestionnaire($formId: ID!) {
    questionnaire(id: $formId) {
      _id
      title
      questions {
        __typename
        ... on TextQuestion {
          _id
          question
        }
        ... on SelectQuestion {
          _id
          question
          options
          multiSelect
        }
      }
    }
  }
`)

export function QuestionnaireDetails() {
  const { data } = useQuery(["questionnaiers"], async () =>
    Promise.all([
      request("/graphql", getQuestionnaireDocument, {
        first: 10, // variables are typed too!
      }),
    ])
  )
  return <pre>{JSON.stringify(data, null, 2)}</pre>
}
