import { useQuery } from "@tanstack/react-query";
import { graphql } from "../../gql";
import { client } from "../../gql/client";
import { FormListItem } from "./FormListItem";
import "./FormListPage.css";

const formListDocument = graphql(`
  query FormListPage {
    forms {
      _id
      title
      ...FormListItem
    }
  }
`);

interface Props {
  onFormSelect(formId: string): void;
}
export const FormListPage: React.FC<Props> = ({ onFormSelect }) => {
  const { data, isLoading } = useQuery({
    queryKey: ["form-main"],
    queryFn: () => client.request(formListDocument),
  });
  if (isLoading) {
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
