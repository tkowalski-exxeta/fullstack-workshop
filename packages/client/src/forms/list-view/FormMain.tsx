import "./form-main.css"
import { formService, FormOverview } from "../../data/forms"
import { useEffect, useState } from "react"

interface Props {
  onFormSelect(formId: string): void
}
export const FormMain: React.FC<Props> = ({ onFormSelect }) => {
  const [forms, setForms] = useState<FormOverview[]>()
  useEffect(() => {
    formService.getAllForms().then((allForms) => setForms(allForms))
  }, [])

  return (
    <div className="form-main">
      {forms?.map((f) => (
        <div
          key={f._id}
          className="form-main-item link"
          onClick={() => onFormSelect(f._id)}
        >
          {f.title}
        </div>
      ))}
    </div>
  )
}
