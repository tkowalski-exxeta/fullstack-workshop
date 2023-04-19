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

const deleteFormDocument = graphql(/* GraphQL */ `
  mutation DeleteForm($formId: ID!) {
    deleteForm(formId: $formId)
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

const deleteQuestionDocument = graphql(/* GraphQL */ `
  mutation DeleteQuestion($formId: ID!, $questionId: ID!) {
    deleteQuestion(formId: $formId, questionId: $questionId)
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

function useUpdateForm(formId: string) {
  const queryClient = useQueryClient();
  return useMutation<unknown, unknown, { title: string}>({
    mutationFn: ({title}) => request("/graphql", updateFormDocument, { formId, title }),
    onSettled: () => queryClient.invalidateQueries(["forms"])
  })
}

function useDeleteForm(formId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => request("/graphql", deleteFormDocument, { formId }),
    onSettled: () => queryClient.invalidateQueries(["forms"])
  });
}

function useCreateQuestion(formId: string) {
  const queryClient = useQueryClient();
  const question: QuestionInput = {
    text: {
      text: "Untitled Question",
    },
  }
  return useMutation({
    mutationFn: () => request("/graphql", createQuestionDocument, { formId, question }),
    onSettled: () => queryClient.invalidateQueries(["forms"])
  })
}

function useUpdateQuestion(formId: string) {
  const queryClient = useQueryClient();
  return useMutation<unknown, unknown, {questionId: string, question: QuestionInput}>({
    mutationFn: ({questionId, question}) => request("/graphql", updateQuestionDocument, { formId, questionId, question }),
    onSettled: () => queryClient.invalidateQueries(["forms"])
  })
}

function useDeleteQuestion(formId: string) {
  const queryClient = useQueryClient();
  return useMutation<unknown, unknown, {questionId: string}>({
    mutationFn: ({questionId}) => request("/graphql", deleteQuestionDocument, { formId, questionId }),
    onSettled: () => queryClient.invalidateQueries(["forms"])
  });
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
  const navigate = useNavigate();
  return (
    <li key={form._id} className="list-none">
        <FormCard formId={form._id} title={form.title} image={"list-bullet.svg"}/>
    </li>
  );
};

export const CreateFormItem: React.FC = () => {  
  const navigate = useNavigate();
  return (
    <li>
      <FormCard title="Create form" image={"plus.svg"} />
    </li>
  );
};

export const FormCard: React.FC<{ formId?: string, title: string; image: string; }> = ({
  formId,
  title,
  image,
}) => {
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

  const onClickCard = () => {
    if (formId) {
      navigate(`/admin/forms/${formId}`);
    } else {
      createFormAndReturnUrl("Untitled");
    }
  }

  const deleteFormMutation = useDeleteForm(formId ?? "");

  return (
    <div className="border border-gray-700 w-48 rounded">
      <div className="flex h-36 border-b border-gray-700 cursor-pointer" onClick={onClickCard}>
        <img className="flex-auto invert-[0.5]" src={`/src/assets/${image}`} height={120} width={120}/>
      </div>
      <div className="flex justify-between">
        <div onClick={onClickCard} className="p-2 text-ellipsis overflow-hidden flex-grow cursor-pointer">{title}</div>
        {!!formId &&
          <img onClick={() => deleteFormMutation.mutate()} title="Delete form" className="m-1 flex-none invert-[0.5] cursor-pointer" src={"/src/assets/trash.svg"} height={20} width={20}/>
        }        
      </div>
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

  const createQuestionMutation = useCreateQuestion(formId);
  const updateFormMutation = useUpdateForm(formId);
  const updateQuestionMutation = useUpdateQuestion(formId);
  const deleteQuestionMutation = useDeleteQuestion(formId);

  const { data } = useQuery(["forms"], async () =>
    request("/graphql", getFormDocument, { formId })
  );
  return (   
    <> 
      {!!data?.form &&
        <div className="flex flex-col items-stretch container mx-auto gap-4 grow max-w-3xl">
          <h1 className="text-4xl pt-10 pb-4">
            <EditableText text={data.form.title}  onChangeText={(title:string) => updateFormMutation.mutate({title})}/>
          </h1>
          {data.form.questions.map((q, index) => (
              <FormQuestion key={index} {...q} updateQuestion={(question: QuestionInput) => updateQuestionMutation.mutate({questionId: q._id, question})}  deleteQuestion={() => deleteQuestionMutation.mutate({questionId: q._id})}/>
            ))}

          <button className="mb-6" onClick={() => createQuestionMutation.mutate()}>
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
