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
  mutation SubmitFormdata($formId: ID!, $answers: [AnswerInput!]!) {
    submitAnswers(formId: $formId, answers: $answers)
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
        const answers = questions.map<FormData["answers"][number]>((q) => ({
          questionId: q._id,
          answer: "",
        }));
        methods.reset({ answers });
      }
    },
  });

  const [submitFormBase] = useMutation(submitFormdataDocument);

  const onSubmit = (data: FormData) => {
    console.log("onSubmit", data);
    if (id) {
      return submitFormBase({
        variables: {
          formId: id!,
          answers: data.answers.map((a) => ({
            questionId: a.questionId,
            answer: Array.isArray(a.answer) ? a.answer : [a.answer],
          })),
        },
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
            {form.questions.map((f, i) => (
              <QuestionDisplay key={f._id} data={f} index={i} />
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
