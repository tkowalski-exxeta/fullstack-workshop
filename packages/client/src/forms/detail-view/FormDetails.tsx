import { useQuery } from "@apollo/client";
import { graphql } from "../../gql";
import "./FormDetails.css";
import { QuestionDisplay } from "./QuestionDisplay";

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

interface Props {
  id: string;
  goBack(): void;
}
export const FormDetails: React.FC<Props> = ({ id, goBack }) => {
  const { data } = useQuery(formDetailsDocument, { variables: { id } });
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
