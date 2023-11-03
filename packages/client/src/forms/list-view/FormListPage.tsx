import { useQuery } from "@tanstack/react-query";
import { client } from "../../gql/client";
import { FormListPageDocument } from "../../gql/graphql-operations";
import { FormListItem } from "./FormListItem";
import "./form-list-page.css";

interface Props {
  onFormSelect(formId: string): void;
}
export const FormListPage: React.FC<Props> = ({ onFormSelect }) => {
  const { data, isLoading } = useQuery({
    queryKey: ["form-main"],
    queryFn: () => client.request(FormListPageDocument),
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
