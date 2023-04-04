import { useQuery } from "@tanstack/react-query";
import request from "graphql-request";
import { Link, useNavigate, useParams } from "react-router-dom";
import { graphql } from "../gql";
import { Form, QuestionInput } from "../gql/graphql";

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
function createQuestion(formId: string, question: QuestionInput) {
  return request("/graphql", createQuestionDocument, { formId, question });
}

let i = 0;
const questions: QuestionInput[] = [
  {
    select: {
      text: "Do you like GraphQL?",
      options: ["yes", "no"],
      multiSelect: false,
    },
  },
  {
    text: {
      text: "What do you like about GraphQL?",
    },
  },
];

export const FormList: React.FC<{ forms: Form[] }> = ({ forms }) => {
  return (
    <ul className="flex gap-6 p-6">
      {!!forms && forms.map((form) => <FormListItem form={form} />)}
      <CreateFormItem />
    </ul>
  );
};

export const FormListItem: React.FC<{ form: Form }> = ({ form }) => {
  return (
    <li key={form._id} className="list-none">
      <Link to={`admin/forms/${form._id}`}>
        <FormCard title={form.title} />
      </Link>
    </li>
  );
};

export const CreateFormItem: React.FC = () => {
  return (
    <li>
      <Link>
        <FormCard title="Create form" />
      </Link>
    </li>
  );
};

export const FormCard: React.FC<{ title: String; image?: String }> = ({
  title,
  image,
}) => {
  return (
    <div className="border border-gray-700 w-48 rounded">
      <div className="h-36 border-b border-gray-700"></div>
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
  const { data } = useQuery(["forms"], async () =>
    request("/graphql", getFormDocument, { formId })
  );
  return (
    <div className="flex flex-col items-stretch container mx-auto gap-4 grow max-w-3xl">
      <h1 className="text-4xl pt-10 pb-4">{data?.form?.title}</h1>
      {!!data?.form &&
        data.form.questions.map((q) => (
          <div className="bg-gray-700 w-full p-6 text-lg rounded drop-shadow">
            {q.text}
          </div>
        ))}

      <button onClick={() => createQuestion(formId, questions[i++]).then()}>
        Add Question
      </button>
    </div>
  );
}

export const FormDisplay: React.FC = () => (
  <div>TODO: Implement form-display</div>
);
