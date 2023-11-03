import { useQuery } from "@tanstack/react-query";
import { client } from "../../gql/client";
import {
  FormDetailQuestionFragment,
  GetFormDetailsDocument,
} from "../../gql/graphql-operations";
import "./form-details.css";

interface Props {
  id: string;
  goBack(): void;
}
export const FormDetails: React.FC<Props> = ({ id, goBack }) => {
  const { data } = useQuery(
    ["form-detail", id],
    () => client.request(GetFormDetailsDocument, { id: id! }),
    { enabled: !!id }
  );
  const form = data?.formById;

  function submitForm(ev: React.MouseEvent) {
    ev.preventDefault();
  }

  return (
    <div className="form-detail-content">
      <button onClick={goBack}>Back</button>
      {form ? (
        <div>
          <h1>{form.title}</h1>
          {form.questions.map((q) => (
            <QuestionDisplay key={q._id} data={q} />
          ))}
          <button type="submit" onClick={(ev) => submitForm(ev)}>
            Submit Form
          </button>
        </div>
      ) : (
        <div>Form not found</div>
      )}
    </div>
  );
};

interface QuestionProps {
  data: FormDetailQuestionFragment;
}
export const QuestionDisplay: React.FC<QuestionProps> = ({ data }) => {
  switch (data.__typename) {
    case "SelectQuestion":
      return (
        <div className="form-detail-question">
          {data.question}
          <div>
            {data.options.map((opt, i) => (
              <label key={i} className="form-detail-option">
                {opt}
                <input type="checkbox" name={"cb" + i} value={opt} />
              </label>
            ))}
          </div>
        </div>
      );
    case "TextQuestion":
      return (
        <div className="form-detail-question">
          {data.question}
          <div>
            <input type="text" name={data._id} />
          </div>
        </div>
      );
    default:
      assertBadType(data);
  }
};
function assertBadType(__typename: never): never {
  throw new Error("Unknown type of question");
}
