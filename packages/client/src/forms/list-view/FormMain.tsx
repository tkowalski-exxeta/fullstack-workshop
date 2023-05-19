import { useQuery } from "@tanstack/react-query"
import { GetFormMainDocument } from "../../gql/graphql-operations"
import { client } from "../../gql/client"
import "./form-main.css"

interface Props {
  onFormSelect(formId: string): void
}
export const FormMain: React.FC<Props> = ({ onFormSelect }) => {
  const { data } = useQuery(["form-main"], () =>
    client.request(GetFormMainDocument)
  )
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
  )
}
