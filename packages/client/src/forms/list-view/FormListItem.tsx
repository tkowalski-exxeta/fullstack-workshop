import { FormListItemFragment } from "../../gql/graphql-operations"
import "./FormListPage.css"

interface Props {
  item: FormListItemFragment
  onFormSelect(formId: string): void
}
export const FormListItem: React.FC<Props> = ({ item, onFormSelect }) => {
  return (
    <div
      key={item._id}
      className="form-main-item link"
      onClick={() => onFormSelect(item._id)}
    >
      {item.title}
    </div>
  )
}
