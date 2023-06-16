import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { client } from "../../gql/client";
import {
  FormAnswerEntryInput,
  GetFormDetailsDocument,
} from "../../gql/graphql-operations";
import "./form-details.css";
import { FormQuestionList } from "./form-question-list";

export const FormDetails: React.FC = () => {
  const { id } = useParams();
  const { data } = useQuery(
    ["form-detail", id],
     // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    () => client.request(GetFormDetailsDocument, { id: id! }),
    { enabled: !!id }
  );
  const form = data?.formById ?? undefined;
  const formValues: FormAnswerEntryInput[] =
    form?.questions?.map((q) => ({ id: q._id, result: undefined })) ?? [];

  return (
    <div className="form-detail-content">
      {form ? (
        <FormQuestionList form={form} values={formValues} />
      ) : (
        <div>Form not found</div>
      )}
    </div>
  );
};
