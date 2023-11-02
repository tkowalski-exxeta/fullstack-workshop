import { useEffect, useState } from "react"
import "./form-details.css"
import {
  formService,
  FormDetails as FormDetailResponse,
  Question,
} from "../../data/forms"

interface Props {
  id: string
  goBack(): void
}
export const FormDetails: React.FC<Props> = ({ id, goBack }) => {
  const [form, setForm] = useState<FormDetailResponse | undefined>()
  useEffect(() => {
    formService.getFormById(id).then((f) => setForm(f?.formById))
  }, [id])

  function submitForm(ev: React.MouseEvent) {
    ev.preventDefault()
  }

  return (
    <div className="form-detail-content">
      <button onClick={goBack}>Back</button>
      {form ? (
        <div>
          <h1>{form.title}</h1>
          {form.questions.map((q) => (
            <QuestionDisplay key={q._id} data={q} />
          ))}
          <button type="submit" onClick={(ev) => submitForm(ev)}>
            Submit Form
          </button>
        </div>
      ) : (
        <div>Form not found</div>
      )}
    </div>
  )
}

interface QuestionProps {
  data: Question
}
export const QuestionDisplay: React.FC<QuestionProps> = ({ data }) => {
  switch (data.type) {
    case "select":
      return (
        <div className="form-detail-question">
          {data.question}
          <div>
            {data.options.map((opt, i) => (
              <label key={i} className="form-detail-option">
                {opt}
                <input type="checkbox" name={"cb" + i} value={opt} />
              </label>
            ))}
          </div>
        </div>
      )
    case "text":
      return (
        <div className="form-detail-question">
          {data.question}
          <div>
            <input type="text" name={data._id} title="question-text" />
          </div>
        </div>
      )
    default:
      assertBadType(data)
  }
}
function assertBadType(_data: never): never {
  throw new Error("Unknown type of question")
}
