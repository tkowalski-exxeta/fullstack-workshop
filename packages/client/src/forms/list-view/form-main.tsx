import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { client } from "../../gql/client";
import {
  CreateFormDocument,
  GetFormMainDocument,
  DeleteFormDocument,
} from "../../gql/graphql-operations";
import cls from "./form-main.module.css";
import placeholder from "../icons/placeholder.svg";
import plusIcon from "../icons/plus.svg";
import deleteIcon from "../icons/delete.svg";

export const FormMain: React.FC = () => {
  const queryClient = useQueryClient();

  const { data } = useQuery(["form-main"], () =>
    client.request(GetFormMainDocument)
  );

  const { mutate: createForm } = useMutation(
    () =>
      client.request(CreateFormDocument, {
        formInput: { title: "Untitled Form", questions: [] },
      }),
    {
      onSuccess() {
        queryClient.invalidateQueries({ queryKey: ["form-main"] });
      },
    }
  );

  const { mutate: deleteForm } = useMutation(
    (formId: string) =>
      client.request(DeleteFormDocument, {
        formId,
      }),
    {
      onSuccess() {
        queryClient.invalidateQueries({ queryKey: ["form-main"] });
      },
    }
  );

  const handleDelete =
    (formId: string) => (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      deleteForm(formId);
    };

  return (
    <div className={cls["form-main"]}>
      {data?.forms.map((f) => (
        <Link
          key={f._id}
          to={f._id}
          className={`${cls["form-main-item"]} link`}
          aria-label={f.title}
        >
          <img src={placeholder} alt="placeholder" />
          <div className={cls["title"]}>
            {f.title}
            <button className="icon" onClick={handleDelete(f._id)}>
              <img src={deleteIcon} alt="delete icon" />
            </button>
          </div>
        </Link>
      ))}
      <button className={cls["add-form"]} onClick={() => createForm()}>
        <img src={plusIcon} alt="plus icon" />
      </button>
    </div>
  );
};
