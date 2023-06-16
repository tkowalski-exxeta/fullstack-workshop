import { UseFormRegisterReturn } from "react-hook-form";
import { FormDetailQuestionFragment } from "../../gql/graphql-operations";

interface QuestionProps {
  data: FormDetailQuestionFragment;
  register: UseFormRegisterReturn<any>;
}
export const QuestionDisplay: React.FC<QuestionProps> = ({
  data,
  register,
}) => {
  switch (data.__typename) {
    case "SelectQuestion":
      const type = data.multiSelect ? "checkbox" : "radio";
      return (
        <div className="form-detail-question">
          {data.question}
          <div>
            {data.options.map((opt, i) => (
              <label key={i} className="form-detail-option">
                {opt}
                <input {...register} type={type} value={opt} />
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
            <input type="text" {...register} />
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
