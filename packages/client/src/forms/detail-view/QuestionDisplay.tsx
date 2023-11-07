import { useFragment, FragmentType, graphql } from "../../gql"
import "./FormDetails.css"

const questionDisplayFragment = graphql(/* GraphQL */ `
  fragment QuestionDisplay on Question {
    __typename
    _id
    question
    ... on SelectQuestion {
      multiSelect
      options
    }
  }
`)
interface QuestionProps {
  data: FragmentType<typeof questionDisplayFragment>
}
export const QuestionDisplay: React.FC<QuestionProps> = ({ data: dataSrc }) => {
  const data = useFragment(questionDisplayFragment, dataSrc)

  switch (data.__typename) {
    case "TextQuestion":
      return (
        <div className="form-detail-question">
          {data.question}
          <div>
            <input type="text" name={data._id} placeholder={data.question} />
          </div>
        </div>
      )
    case "SelectQuestion":
      return (
        <div className="form-detail-question">
          {data.question}
          <div>
            {data.multiSelect
              ? data.options?.map((opt, i) => (
                  <label key={i} className="form-detail-option">
                    {opt}
                    <input
                      type="checkbox"
                      name={`${data._id}-cb${i}`}
                      value={opt}
                    />
                  </label>
                ))
              : data.options?.map((opt, i) => (
                  <label key={i} className="form-detail-option">
                    {opt}
                    <input type="radio" name={data._id} value={opt} />
                  </label>
                ))}
          </div>
        </div>
      )
    default:
      assertBadType(data)
  }
}
function assertBadType(__typename: never): never {
  throw new Error("Unknown type of question")
}
