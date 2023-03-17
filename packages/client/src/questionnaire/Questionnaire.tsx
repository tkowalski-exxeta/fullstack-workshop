import { useState } from "react"
import { graphql } from "../gql"
import { useQuery } from "@tanstack/react-query"
import request from "graphql-request"
import { QuestionInput } from "../gql/graphql"

const createFormDocument = graphql(/* GraphQL */ `
  mutation CreateForm($title: String!) {
    createForm(form: { title: $title }) {
      _id
      title
    }
  }
`)

const createQuestionDocument = graphql(/* GraphQL */ `
  mutation CreateQuestion($formId: ID!, $question: QuestionInput!) {
    q1: createQuestion(formId: $formId, question: $question) {
      _id
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

function createForm(form: any) {
  request("/graphql", createFormDocument, { form })
}
function createQuestion(question: QuestionInput) {
  request("/graphql", createQuestionDocument, { question })
}

export function QuestionnaireDetails() {
  const { data } = useQuery(["questionnaiers"], async () =>
    Promise.all([
      request("/graphql", getQuestionnaireDocument, {
        formId: "",
      }),
    ])
  )
  return <pre>{JSON.stringify(data, null, 2)}</pre>
}
