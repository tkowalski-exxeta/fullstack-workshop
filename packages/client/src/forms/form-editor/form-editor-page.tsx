import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FormEditor } from "./form-editor";
import { client } from "../../gql/client";
import {
  FormInput,
  GetFormEditorDocument,
  GetFormEditorQuery,
  QuestionInput,
} from "../../gql/graphql-operations";

type FormData = NonNullable<GetFormEditorQuery["formById"]>;

export const FormEditorPage: React.FC = () => {
  const { id } = useParams();
  const { data } = useQuery(
    ["form-detail", id],
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    () => client.request(GetFormEditorDocument, { id: id! }),
    { enabled: !!id }
  );
  const form = data?.formById;
  const formInput = useMemo(() => (form ? toFormInput(form) : null), [form]);

  return formInput ? ( //
    <div className="form-editor-content">
      <FormEditor form={formInput} />
    </div>
  ) : (
    <div>No form found</div>
  );
};

function toFormInput(formData: FormData) {
  const questionInput = formData.questions.map<QuestionInput>((q) => {
    switch (q.__typename) {
      case "TextQuestion":
        return {
          text: {
            _id: q._id && q._id.length === 36 ? undefined : q._id,
            question: q.question,
          },
        };
      case "SelectQuestion":
        return {
          select: {
            _id: q._id && q._id.length === 36 ? undefined : q._id,
            question: q.question,
            multiSelect: q.multiSelect,
            options: q.options,
          },
        };
    }
  });
  const form: FormInput = {
    _id: formData._id,
    title: formData.title,
    questions: questionInput,
  };
  return form;
}
