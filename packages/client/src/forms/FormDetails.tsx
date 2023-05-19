import { useQuery } from "@tanstack/react-query"
import { client } from "../gql/client"
import { GetFormDetailsDocument } from "../gql/graphql-operations"

interface Props {
  id: string
}
export const FormDetails: React.FC<Props> = ({ id }) => {

  const { data } = useQuery(
    ["form-detail", id],
    () => client.request(GetFormDetailsDocument, { id: id! }),
    { enabled: !!id }
  )

  return <div className="layout-content">{JSON.stringify(data)}</div>
}
