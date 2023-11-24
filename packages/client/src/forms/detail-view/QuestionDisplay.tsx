import { useFormContext } from "react-hook-form";
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

export type FormData = {
  answers: {
    id: string;
    result: string | string[];
  }[];
};
interface QuestionProps {
  index: number;
  data: FragmentType<typeof questionDisplayFragment>;
}
export const QuestionDisplay: React.FC<QuestionProps> = ({
  data: dataSrc,
  index,
}) => {
  const data = useFragment(questionDisplayFragment, dataSrc);
  const { register } = useFormContext<FormData>();

  switch (data.__typename) {
    case "TextQuestion":
      return (
        <div className="form-detail-question">
          {data.question}
          <input type="hidden" {...register(`answers.${index}.id`)} />
          <div>
            <input
              type="text"
              placeholder={data.question}
              {...register(`answers.${index}.result`)}
            />
          </div>
        </div>
      );
    case "SelectQuestion":
      return (
        <div className="form-detail-question">
          {data.question}
          <input type="hidden" {...register(`answers.${index}.id`)} />
          <div>
            {data.multiSelect
              ? data.options?.map((opt, i) => (
                  <label key={i} className="form-detail-option">
                    {opt}
                    <input
                      type="checkbox"
                      value={opt}
                      {...register(`answers.${index}.result`)}
                    />
                  </label>
                ))
              : data.options?.map((opt, i) => (
                  <label key={i} className="form-detail-option">
                    {opt}
                    <input
                      type="radio"
                      value={opt}
                      {...register(`answers.${index}.result`)}
                    />
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
