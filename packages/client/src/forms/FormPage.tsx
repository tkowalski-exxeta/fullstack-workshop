import { useState } from "react";
import { FormDetailsPage } from "./detail-view/FormDetailsPage";
import { FormListPage } from "./list-view/FormListPage";

export const FormPage: React.FC = () => {
  const [formId, setSelectedForm] = useState<string>();

  return !formId ? (
    <FormListPage onFormSelect={setSelectedForm} />
  ) : (
    <FormDetailsPage id={formId} goBack={() => setSelectedForm(undefined)} />
  );
};
