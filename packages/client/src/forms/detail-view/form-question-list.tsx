import { useForm } from "react-hook-form";
import { client } from "../../gql/client";
import {
  FormAnswerEntryInput,
  GetFormDetailsQuery,
  SubmitFormdataDocument,
} from "../../gql/graphql-operations";
import "./form-details.css";
import { QuestionDisplay } from "./question-display";
import { useNavigate } from "react-router-dom";

interface FormQuestionListProps {
  form: Exclude<GetFormDetailsQuery["formById"], null | undefined>;
  values: FormAnswerEntryInput[];
}

export const FormQuestionList: React.FC<FormQuestionListProps> = ({
  form,
  values,
}) => {
  const navigate = useNavigate();
  const methods = useForm({ values });
  const onSubmit = (data: FormAnswerEntryInput[]) => {
    console.log(data);
    return client
      .request(SubmitFormdataDocument, { formId: form._id, data })
      .then(() => navigate("/thank-you"));
  };
  return (
    <form onSubmit={methods.handleSubmit(onSubmit)}>
      <h1>{form.title}</h1>
      {form.questions.map((q, i) => (
        <QuestionDisplay
          key={q._id}
          data={q}
          register={methods.register(`${i}.result`)}
        />
      ))}
      <button type="submit">Submit Form</button>
    </form>
  );
};
