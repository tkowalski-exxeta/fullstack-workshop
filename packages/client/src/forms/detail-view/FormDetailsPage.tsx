import { useQuery } from "@apollo/client";
import { useNavigate, useParams } from "react-router-dom";
import { graphql } from "../../gql";
import "./FormDetailsPage.css";
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

export const FormDetailsPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { data } = useQuery(formDetailsDocument, { variables: { id: id! } });
  const form = data?.formById;

  function submitForm(ev: React.MouseEvent) {
    ev.preventDefault();
  }
  function goBack() {
    navigate(-1);
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
