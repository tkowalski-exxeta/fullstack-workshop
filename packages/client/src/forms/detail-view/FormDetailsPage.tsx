import { useLoaderData, useNavigate } from "react-router-dom";
import { DocumentType, graphql } from "../../gql";
import { client } from "../../gql/client";
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

export async function loader({ params }: any) {
  const { id } = params;
  const { data } = await client.query({
    query: formDetailsDocument,
    variables: { id: id! },
  });
  return data?.formById;
}

export const FormDetailsPage: React.FC = () => {
  const navigate = useNavigate();
  // const { id } = useParams<{ id: string }>();
  const form = useLoaderData() as DocumentType<
    typeof formDetailsDocument
  >["formById"];
  // const { data } = useQuery(formDetailsDocument, { variables: { id: id! } });
  // const form = data?.formById;

  function submitForm(ev: React.MouseEvent) {
    ev.preventDefault();
  }
  function goBack() {
    navigate(-1);˚
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
