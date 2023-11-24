import { FieldPath, useFormContext } from "react-hook-form";
import { FragmentType, graphql, useFragment } from "../../gql";
import "./FormDetailsPage.css";

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
`);

type QuestionId = string;
type Answer = string;
export type FormData = {
  answers: Record<QuestionId, Answer>;
};
interface QuestionProps {
  path: FieldPath<FormData>;
  data: FragmentType<typeof questionDisplayFragment>;
}
export const QuestionDisplay: React.FC<QuestionProps> = ({
  data: dataSrc,
  path,
}) => {
  const data = useFragment(questionDisplayFragment, dataSrc);
  const { register } = useFormContext<FormData>();

  switch (data.__typename) {
    case "TextQuestion":
      return (
        <div className="form-detail-question">
          {data.question}
          <div>
            <input
              type="text"
              placeholder={data.question}
              {...register(path)}
            />
          </div>
        </div>
      );
    case "SelectQuestion":
      return (
        <div className="form-detail-question">
          {data.question}
          <div>
            {data.multiSelect
              ? data.options?.map((opt, i) => (
                  <label key={i} className="form-detail-option">
                    {opt}
                    <input type="checkbox" value={opt} {...register(path)} />
                  </label>
                ))
              : data.options?.map((opt, i) => (
                  <label key={i} className="form-detail-option">
                    {opt}
                    <input type="radio" value={opt} {...register(path)} />
                  </label>
                ))}
          </div>
        </div>
      );
    default:
      assertBadType(data);
  }
};
function assertBadType(_data: never): never {
  throw new Error("Unknown type of question");
}
