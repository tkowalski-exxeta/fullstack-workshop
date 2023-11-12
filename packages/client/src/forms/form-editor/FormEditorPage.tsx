import { useParams } from "react-router-dom";

export const FormEditorPage: React.FC = () => {
  const { id } = useParams();
  return <div className="form-editor-content">FormEditor #{id}</div>;
};
