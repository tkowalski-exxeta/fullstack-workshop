import { useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { DocumentType, graphql } from "../../gql";
import { mockForms } from "../../mocks/handlers";
import { FormListItem } from "./FormListItem";
import "./FormListPage.css";

const formListDocument = graphql(/* GraphQL */ `
  query FormListPage {
    forms {
      _id
      ...FormListItem
    }
  }
`);
type FormListPageDoc = DocumentType<typeof formListDocument>;
export const FormListPage: React.FC = () => {
  const navigate = useNavigate();
  const { data, loading } = useQuery(formListDocument);
  console.log("Rendering FormListPage", data, loading);
  if (loading) {
    return <div>Loading...</div>;
  }
  const formList: NonNullable<FormListPageDoc["forms"]> =
    data?.forms ?? (mockForms as any);
  // if (!data?.forms || data.forms.length === 0) {
  //   return <div>No forms found</div>;
  // }
  return (
    <div className="form-main">
      {formList.map((f) => (
        <FormListItem
          key={f._id}
          item={f}
          onFormSelect={(id) => navigate(id)}
        />
      ))}
      {JSON.stringify(formList)}
    </div>
  );
};
