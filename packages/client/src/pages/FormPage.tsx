import { useState } from "react";
import { FormDetails } from "../forms/detail-view/FormDetails";
import { FormListPage } from "../forms/list-view/FormListPage";

export const FormPage: React.FC = () => {
  const [formId, setSelectedForm] = useState<string>();

  return !formId ? (
    <FormListPage onFormSelect={setSelectedForm} />
  ) : (
    <FormDetails id={formId} goBack={() => setSelectedForm(undefined)} />
  );
};
