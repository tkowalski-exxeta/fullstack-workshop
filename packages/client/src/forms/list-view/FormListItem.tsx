import { FragmentType, graphql, useFragment } from "../../gql"
import "./FormListPage.css"

const formListItemFragment = graphql(/* GraphQL */ `
  fragment FormListItem on Form {
    _id
    title
  }
`)
interface Props {
  item: FragmentType<typeof formListItemFragment>
  onFormSelect(formId: string): void
}
export const FormListItem: React.FC<Props> = ({
  item: itemSrc,
  onFormSelect,
}) => {
  const item = useFragment(formListItemFragment, itemSrc)
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
