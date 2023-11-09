import { FormOverview } from "../../data/FormService";
import "./FormListPage.css";

interface Props {
  item: FormOverview;
  onFormSelect(formId: string): void;
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
  );
};
