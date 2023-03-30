import { useQuery } from "@tanstack/react-query";
import request from "graphql-request";
import { useNavigate, useParams } from "react-router-dom";
import { graphql } from "../gql";
import { QuestionInput } from "../gql/graphql";

const createFormDocument = graphql(/* GraphQL */ `
  mutation CreateForm($title: String!) {
    createForm(form: { title: $title }) {
      _id
      title
    }
  }
`);

const createQuestionDocument = graphql(/* GraphQL */ `
  mutation CreateQuestion($formId: ID!, $question: QuestionInput!) {
    q1: createQuestion(formId: $formId, question: $question) {
      _id
      __typename
    }
  }
`);

const getFormDocument = graphql(/* GraphQL */ `
  query GetForm($formId: ID!) {
    form(id: $formId) {
      _id
      title
      questions {
        __typename
        ... on TextQuestion {
          _id
          text
        }
        ... on SelectQuestion {
          _id
          text
          options
          multiSelect
        }
      }
    }
  }
`);

function createForm(title: string) {
  return request("/graphql", createFormDocument, { title });
}
function createQuestion(formId: string, question: QuestionInput) {
  return request("/graphql", createQuestionDocument, { formId, question });
}

let i = 0;
const questions: QuestionInput[] = [
  {
    select: {
      question: "Do you like GraphQL?",
      options: ["yes", "no"],
      multiSelect: false,
    },
  },
  {
    text: {
      question: "What do you like about GraphQL?",
    },
  },
];

export function FormMain() {
  const navigate = useNavigate();
  return (
    <div>
      <button
        onClick={() =>
          createForm("sample form").then((data) =>
            navigate(data.createForm?._id!)
          )
        }
      >
        Create Form
      </button>
    </div>
  );
}

export function FormDetails() {
  const { id } = useParams();
  const formId = id!;
  const navigate = useNavigate();
  const { data } = useQuery(["forms"], async () =>
    request("/graphql", getFormDocument, { formId })
  );
  return (
    <div>
      <button
        onClick={() =>
          createForm("sample form").then((data) =>
            navigate(data.createForm?._id!)
          )
        }
      >
        Create Form
      </button>
      <button onClick={() => createQuestion(formId, questions[i++]).then()}>
        Create Questions
      </button>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
