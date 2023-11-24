import { useMutation, useQuery } from "@apollo/client";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { graphql } from "../../gql";
import "./FormDetailsPage.css";
import { FormData, QuestionDisplay } from "./QuestionDisplay";

const formDetailsDocument = graphql(/* GraphQL */ `
  query FormDetails($id: ID!) {
    formById(id: $id) {
      _id
      title
      questions {
        _id
        ...QuestionDisplay
      }
    }
  }
`);

const submitFormdataDocument = graphql(/* GraphQL */ `
  mutation SubmitFormdata($formId: ID!, $data: [FormAnswerEntryInput!]!) {
    submitFormAnswer(formId: $formId, data: $data)
  }
`);

export const FormDetailsPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const methods = useForm<FormData>();

  const { data } = useQuery(formDetailsDocument, {
    variables: { id: id! },
    onCompleted(data) {
      if (data.formById) {
        const questions = data?.formById?.questions;
        const answers = Object.fromEntries(questions.map((q) => [q._id, ""]));
        methods.reset({ answers });
      }
    },
  });

  const [submitFormBase] = useMutation(submitFormdataDocument);

  const onSubmit = (data: any) => {
    console.log("onSubmit", data);
    // TODO: fix type
    if (id) {
      return submitFormBase({
        variables: { formId: id!, data },
        onCompleted: () => navigate("/thank-you"),
      });
    }
  };

  const form = data?.formById;
  return (
    <div className="form-detail-content">
      <button onClick={() => navigate(-1)}>Back</button>
      {form ? (
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <h1>{form.title}</h1>
            {form.questions.map((f) => (
              <QuestionDisplay key={f._id} data={f} />
            ))}
            <button type="submit">Submit Form</button>
          </form>
        </FormProvider>
      ) : (
        <div>Form not found</div>
      )}
    </div>
  );
};
