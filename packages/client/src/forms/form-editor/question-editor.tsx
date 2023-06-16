import {
  Control,
  UseFormRegister,
  UseFormSetValue,
  useFieldArray,
  useWatch,
} from "react-hook-form";
import { FormInput } from "../../gql/graphql-operations";
import { ChangeEvent } from "react";
import cls from "./form-editor.module.css";

interface QuestionProps<TData extends object> {
  index: number;
  control: Control<TData>;
  register: UseFormRegister<TData>;
  setValue: UseFormSetValue<TData>;
}

export const QuestionEditor: React.FC<QuestionProps<FormInput>> = (props) => {
  const { index, control, setValue } = props;

  const question = useWatch({ name: `questions.${index}`, control });
  const questionType = question.text ? "text" : "select";

  function changeQuestionType(event: ChangeEvent<HTMLSelectElement>): void {
    const val = event.target.value;
    if (val === "text") {
      if (question.select) {
        setValue(
          `questions.${index}`,
          {
            text: {
              _id: question.select._id,
              question: question.select.question,
            },
          },
          { shouldDirty: true }
        );
      }
    } else if (val === "select") {
      if (question.text) {
        setValue(
          `questions.${index}`,
          {
            select: {
              _id: question.text._id,
              question: question.text.question,
              multiSelect: false,
              options: [],
            },
          },
          { shouldDirty: true }
        );
      }
    }
  }

  return (
    <div className="form-detail-question">
      <select value={questionType} onChange={changeQuestionType}>
        <option value="select">Multiple Choice</option>
        <option value="text">Freitext</option>
      </select>

      {question.text ? (
        <TextQuestionEditor {...props} />
      ) : question.select ? (
        <SelectQuestionEditor {...props} />
      ) : null}
    </div>
  );
};

const TextQuestionEditor: React.FC<QuestionProps<FormInput>> = ({
  index,
  register,
}) => {
  return <input {...register(`questions.${index}.text.question`)} />;
};

const SelectQuestionEditor: React.FC<QuestionProps<FormInput>> = ({
  index,
  control,
  register,
}) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `questions.${index}.select.options` as any,
  });
  return (
    <>
      <input {...register(`questions.${index}.select.question`)} />
      <label>
        Allow multiple answers
        <input
          type="checkbox"
          {...register(`questions.${index}.select.multiSelect`)}
        />
      </label>
      <div>
        {fields.map((field, i) => {
          return (
            <div key={field.id} style={{ margin: 4 }}>
              <span className={cls.mr2}>{i}</span>
              <input
                type="text"
                {...register(`questions.${index}.select.options.${i}`)}
              />
            </div>
          );
        })}
        <button onClick={() => append("")} className={cls.ml3}>
          Add
        </button>
      </div>
    </>
  );
};
