import { useEffect, useState } from "react";
import { FormOverview, formService } from "../../data/FormService";
import { FormListItem } from "./FormListItem";
import "./FormListPage.css";

interface Props {
  onFormSelect(formId: string): void;
}
export const FormListPage: React.FC<Props> = ({ onFormSelect }) => {
  const [forms, setForms] = useState<FormOverview[]>();
  useEffect(() => {
    formService.getAllForms().then((allForms) => setForms(allForms));
  }, []);

  if (!forms) {
    return <div>Loading...</div>;
  }
  return (
    <div className="form-main">
      {forms?.map((f) => (
        <FormListItem key={f._id} item={f} onFormSelect={onFormSelect} />
      ))}
    </div>
  );
};
