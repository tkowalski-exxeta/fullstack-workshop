import { useQuery } from "@tanstack/react-query";
import { client } from "../../gql/client";
import { GetFormMainDocument } from "../../gql/graphql-operations";
import "./form-main.css";

interface Props {
  onFormSelect(formId: string): void;
}
export const FormMain: React.FC<Props> = ({ onFormSelect }) => {
  const { data, isLoading } = useQuery(["form-main"], () =>
    client.request(GetFormMainDocument)
  );
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="form-main">
      {data?.forms.map((f) => (
        <div
          key={f._id}
          className="form-main-item link"
          onClick={() => onFormSelect(f._id)}
        >
          {f.title}
        </div>
      ))}
    </div>
  );
};
