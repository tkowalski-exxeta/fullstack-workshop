import { useQuery } from "@apollo/client";
import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { graphql, useFragment } from "../../gql";
import {
  FormEditorFormFragment,
  FormInput,
  QuestionInput,
} from "../../gql/graphql";
import { FormEditor, formEditorFormDocument } from "./FormEditor";
import { questionEditorFragment } from "./QuestionEditor";

const GetFormEditorDocument = graphql(/* GraphQL */ `
  query GetFormEditor($id: ID!) {
    formById(id: $id) {
      ...FormEditorForm
    }
  }
`);

export const FormEditorPage: React.FC = () => {
  const { id } = useParams();
  const { data } = useQuery(GetFormEditorDocument, {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    variables: { id: id! },
    skip: !id,
  });
  const form = useFragment(formEditorFormDocument, data?.formById);
  const formInput = useMemo(() => (form ? toFormInput(form) : null), [form]);

  return formInput ? ( //
    <div className="form-editor-content">
      <FormEditor form={formInput} />
    </div>
  ) : (
    <div>No form found</div>
  );
};

function toFormInput(formData: FormEditorFormFragment) {
  const questionInput = formData.questions.map<QuestionInput>((question) => {
    const q = useFragment(questionEditorFragment, question);
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
