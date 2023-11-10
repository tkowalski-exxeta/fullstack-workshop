import { useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { graphql } from "../../gql";
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

export const FormListPage: React.FC = () => {
  const navigate = useNavigate();
  const { data, loading } = useQuery(formListDocument);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="form-main">
      {data?.forms.map((f) => (
        <FormListItem
          key={f._id}
          item={f}
          onFormSelect={(id) => navigate(id)}
        />
      ))}
    </div>
  );
};
