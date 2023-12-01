import { useMutation, useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { DocumentType, graphql } from "../../gql";
import { FormListItem } from "./FormListItem";
import "./FormListPage.css";
import plusIcon from "./plus.svg";

const formListDocument = graphql(/* GraphQL */ `
  query FormListPage {
    forms {
      _id
      ...FormListItem
    }
  }
`);
const CreateFormDocument = graphql(/* GraphQL */ `
  mutation CreateForm($formInput: FormInput!) {
    saveForm(form: $formInput) {
      _id
      title
    }
  }
`);
type FormListPageDoc = DocumentType<typeof formListDocument>;
export const FormListPage: React.FC = () => {
  const navigate = useNavigate();
  const { data, loading, error } = useQuery(formListDocument);
  const [createForm] = useMutation(CreateFormDocument, {
    refetchQueries: [{ query: formListDocument }],
  });

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {String(error)}</div>;
  }
  const formList: FormListPageDoc["forms"] | undefined = data?.forms;
  if (!formList || formList.length === 0) {
    return <div>No forms found</div>;
  }
  return (
    <div className="form-main">
      {formList.map((f) => (
        <FormListItem
          key={f._id}
          item={f}
          onFormSelect={(id) => navigate(id)}
        />
      ))}
      <button
        className="add-form"
        onClick={() =>
          createForm({
            variables: { formInput: { title: "New Form", questions: [] } },
          })
        }
      >
        <img src={plusIcon} alt="plus icon" />
      </button>
    </div>
  );
};
