import { FormDetailQuestionFragment } from "../../gql/graphql-operations"

interface QuestionProps {
  data: FormDetailQuestionFragment
}
export const QuestionDisplay: React.FC<QuestionProps> = ({ data }) => {
  switch (data.__typename) {
    case "SelectQuestion":
      return (
        <div className="form-detail-question">
          {data.question}
          <div>
            {data.options.map((opt, i) => (
              <label key={i} className="form-detail-option">
                {opt}
              </label>
            ))}
          </div>
        </div>
      )
    case "TextQuestion":
      return <div className="form-detail-question">{data.question}</div>
    default:
      assertBadType(data)
  }
}
function assertBadType(__typename: never): never {
  throw new Error("Unknown type of question")
}
