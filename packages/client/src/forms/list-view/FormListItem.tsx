import { FragmentType, graphql, useFragment } from "../../gql";
import "./FormListPage.css";

const formListItemFragment = graphql(/* GraphQL */ `
  fragment FormListItem on Form {
    _id
    title
  }
`);
interface Props {
  item: FragmentType<typeof formListItemFragment>;
  onFormSelect(formId: string): void;
}
export const FormListItem: React.FC<Props> = ({ item, onFormSelect }) => {
  const formItem = useFragment(formListItemFragment, item);
  return (
    <div
      className="form-main-item link"
      onClick={() => onFormSelect(formItem._id)}
    >
      {formItem.title}
    </div>
  );
};
