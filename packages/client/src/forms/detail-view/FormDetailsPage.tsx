import { useEffect, useState } from "react";
import { FormDetails, formService } from "../../data/FormService";
import "./FormDetailsPage.css";
import { QuestionDisplay } from "./QuestionDisplay";

interface Props {
  id: string;
  goBack(): void;
}
export const FormDetailsPage: React.FC<Props> = ({ id, goBack }) => {
  const [form, setForm] = useState<FormDetails | undefined>();
  useEffect(() => {
    formService.getFormById(id).then((f) => setForm(f?.formById));
  }, [id]);

  function submitForm(ev: React.MouseEvent) {
    ev.preventDefault();
  }

  return (
    <div className="form-detail-content">
      <button onClick={goBack}>Back</button>
      {form ? (
        <div>
          <h1>{form.title}</h1>
          {form.questions.map((q) => (
            <QuestionDisplay key={q._id} data={q} />
          ))}
          <button type="submit" onClick={(ev) => submitForm(ev)}>
            Submit Form
          </button>
        </div>
      ) : (
        <div>Form not found</div>
      )}
    </div>
  );
};
