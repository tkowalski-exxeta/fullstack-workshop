import { useQuery } from "@apollo/client";
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
interface Props {
  onFormSelect(formId: string): void;
}
export const FormListPage: React.FC<Props> = ({ onFormSelect }) => {
  const { data, loading } = useQuery(formListDocument);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="form-main">
      {data?.forms.map((f) => (
        <FormListItem key={f._id} item={f} onFormSelect={onFormSelect} />
      ))}
    </div>
  );
};
