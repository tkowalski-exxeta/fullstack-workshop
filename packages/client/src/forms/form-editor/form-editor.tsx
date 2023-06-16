import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import { client } from "../../gql/client";
import {
  FormEditorSaveFormDocument,
  FormInput,
} from "../../gql/graphql-operations";
import cls from "./form-editor.module.css";
import { QuestionEditor } from "./question-editor";
import { useId } from "react";

interface FormEditorProps {
  form: FormInput;
}
export const FormEditor: React.FC<FormEditorProps> = ({ form }) => {
  const titleId = useId();
  const formMethods = useForm({ values: form });
  const {
    register,
    formState: { isDirty },
  } = formMethods;

  const { fields, append } = useFieldArray({
    control: formMethods.control,
    name: "questions", // unique name for your Field Array
  });

  function addQuestion() {
    append({ text: { question: "" } });
  }
  function saveForm(formData: FormInput) {
    return client.request(FormEditorSaveFormDocument, { form: formData });
  }
  return (
    <div className={cls["form-editor-content"]}>
      <FormProvider {...formMethods}>
        <form onSubmit={formMethods.handleSubmit(saveForm)}>
          <label htmlFor={titleId}>Title</label>
          <input
            id={titleId}
            type="text"
            {...register("title")}
            className={cls.titleInput}
          />

          {fields.map((q, i) => (
            <QuestionEditor key={q.id} index={i} {...formMethods} />
          ))}

          <div className={cls.mb2}>
            <button onClick={addQuestion}>Add question</button>
          </div>

          <button type="submit" disabled={!isDirty} className="primary">
            Save Form
          </button>
        </form>
      </FormProvider>
    </div>
  );
};
