import { useState } from "react"
import { FormMain } from "../forms/list-view/FormMain"
import { FormDetails } from "../forms/detail-view/FormDetails"

export const FormPage: React.FC = () => {
  const [formId, setSelectedForm] = useState<string>()

  return !formId ? (
    <FormMain onFormSelect={setSelectedForm} />
  ) : (
    <FormDetails id={formId} goBack={() => setSelectedForm(undefined)} />
  )
}
