import { QuestionDisplayFragment } from "../../gql/graphql-operations";
import "./form-details.css";

interface QuestionProps {
  data: QuestionDisplayFragment;
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
                <input type="checkbox" name={"cb" + i} value={opt} />
              </label>
            ))}
          </div>
        </div>
      );
    case "TextQuestion":
      return (
        <div className="form-detail-question">
          {data.question}
          <div>
            <input type="text" name={data._id} />
          </div>
        </div>
      );
    default:
      assertBadType(data);
  }
};
function assertBadType(__typename: never): never {
  throw new Error("Unknown type of question");
}
