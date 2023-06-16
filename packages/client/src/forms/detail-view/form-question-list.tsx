import { GetFormDetailsQuery } from "../../gql/graphql-operations"
import "./form-details.css"
import { QuestionDisplay } from "./question-display"

interface FormQuestionListProps {
  form: Exclude<GetFormDetailsQuery["formById"], null | undefined>
}

export const FormQuestionList: React.FC<FormQuestionListProps> = ({ form }) => {
  // const navigate = useNavigate()

  return (
    <form>
      <h1>{form.title}</h1>
      {form.questions.map((q, i) => (
        <QuestionDisplay key={q._id} data={q} />
      ))}
      {/* <button type="submit">Submit Form</button> */}
    </form>
  )
}
