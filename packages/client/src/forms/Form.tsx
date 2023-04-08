import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import request from "graphql-request"
import { Link, useNavigate, useParams, redirect } from "react-router-dom"
import { graphql } from "../gql"
import { Form, QuestionInput } from "../gql/graphql"
import React, { useEffect, useState } from "react"
import { EditableText } from "./EditableText"
import { FormQuestion } from "./FormQuestion"

const createFormDocument = graphql(/* GraphQL */ `
  mutation CreateForm($title: String!) {
    createForm(form: { title: $title }) {
      _id
      title
    }
  }
`);

const updateFormDocument = graphql(/* GraphQL */ `
  mutation UpdateForm($title: String!, $formId: ID!) {
    updateForm(form: {title: $title}, formId: $formId) {
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

const updateQuestionDocument = graphql(/* GraphQL */ `
  mutation UpdateQuestion($formId: ID!, $questionId: ID!, $question: QuestionInput!) {
    q1: updateQuestion(formId: $formId, questionId: $questionId, question: $question) {
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

const getForms = graphql(`
  query GetForms {
    forms {
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
// function updateForm(formId: string, title: string) {
//   return request("/graphql", updateFormDocument, { formId, title });
// }

function useCreateQuestion() {
  const queryClient = useQueryClient();
  const question: QuestionInput = {
    text: {
      text: "What do you like about GraphQL?",
    },
  }
  return useMutation<unknown, unknown, {formId: string}>({
    mutationFn: ({formId}) => request("/graphql", createQuestionDocument, { formId, question }),
    onSettled: () => queryClient.invalidateQueries(["forms"])
  })
}

export const FormList: React.FC<{ forms: Form[] }> = ({ forms }) => {
  return (
    <ul className="flex flex-wrap gap-6 p-6">
      {!!forms && forms.map((form, index) => <FormListItem key={index} form={form} />)}
      <CreateFormItem />
    </ul>
  );
};

export const FormListItem: React.FC<{ form: Form }> = ({ form }) => {
  return (
    <li key={form._id} className="list-none">
      <Link to={`admin/forms/${form._id}`}>
        <FormCard title={form.title} image={"list-bullet.svg"} />
      </Link>
    </li>
  );
};

export const CreateFormItem: React.FC = () => {  
  const navigate = useNavigate();

  async function createFormAndReturnUrl(title: string) {
    try {
      var response = await createForm(title).then();
      var form = response.createForm;
      navigate(`/admin/forms/${form?._id}`);
    } catch (error) {
      console.error("Creating a new form failed due to error: ", error);
    }
  }
  return (
    <li>
      <Link onClick={() => createFormAndReturnUrl("Untitled")}>
        <FormCard title="Create form" image={"plus.svg"} />
      </Link>
    </li>
  );
};

export const FormCard: React.FC<{ title: String; image: String }> = ({
  title,
  image,
}) => {
  return (
    <div className="border border-gray-700 w-48 rounded">
      <div className="flex h-36 border-b border-gray-700">
        <img className="flex-auto invert-[0.5]" src={`/src/assets/${image}`} height={120} width={120}/>
      </div>
      <div className="p-2">{title}</div>
    </div>
  );
};

export function FormMain() {
  const navigate = useNavigate();
  const { data } = useQuery(["forms"], async () =>
    request("/graphql", getForms)
  );
  return <div>{!!data && <FormList forms={data.forms} />}</div>;
}

export function FormDetails() {
  const { id } = useParams();
  const formId = id!;
  const navigate = useNavigate();

  const createQuestionMutation = useCreateQuestion();

  const { data } = useQuery(["forms"], async () =>
    request("/graphql", getFormDocument, { formId })
  );
  return (   
    <> 
      {!!data?.form &&
        <div className="flex flex-col items-stretch container mx-auto gap-4 grow max-w-3xl">
          <h1 className="text-4xl pt-10 pb-4">
            <EditableText text={data.form.title}  setText={(text:string) => console.log(text)}/>
          </h1>
          {data.form.questions.map((q, index) => (
              <FormQuestion key={index} {...q} />
            ))}

          <button className="mb-6" onClick={() => createQuestionMutation.mutate({formId})}>
            Add Question
          </button>
        </div>
        }
    </>
  );
}

export const FormDisplay: React.FC = () => (
  <div>TODO: Implement form-display</div>
);
