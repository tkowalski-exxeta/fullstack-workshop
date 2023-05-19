import { useState } from "react"
import { FormMain } from "../forms/FormMain"
import { FormDetails } from "../forms/FormDetails"

export const FormPage: React.FC = () => {
  const [formId, setSelectedForm] = useState<string>()

  return !formId ? (
    <FormMain onFormSelect={setSelectedForm} />
  ) : (
    <FormDetails id={formId} />
  )
}
