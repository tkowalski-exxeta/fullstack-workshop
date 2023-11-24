import { useMutation } from "@apollo/client";
import { useId } from "react";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import { graphql } from "../../gql";
import { FormInput } from "../../gql/graphql";
import cls from "./FormEditor.module.css";
import { QuestionEditor } from "./QuestionEditor";

const FormEditorSaveFormDocument = graphql(/* GraphQL */ `
  mutation FormEditorSaveForm($form: FormInput!) {
    saveForm(form: $form) {
      ...FormEditorForm
    }
  }

  fragment FormEditorForm on Form {
    _id
    title
    questions {
      ...FormEditorQuestion
    }
  }

  fragment FormEditorQuestion on Question {
    __typename
    _id
    question
    ... on SelectQuestion {
      multiSelect
      options
    }
  }
`);

interface FormEditorProps {
  form: FormInput;
}
export const FormEditor: React.FC<FormEditorProps> = ({ form }) => {
  const titleId = useId();

  const [saveFormBase] = useMutation(FormEditorSaveFormDocument);
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
    return saveFormBase({
      variables: {
        form: formData,
      },
    });
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
