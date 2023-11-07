import { useQuery } from "@tanstack/react-query"
import { client } from "../../gql/client"
import { QuestionDisplay } from "./QuestionDisplay"
import "./FormDetails.css"
import { graphql, useFragment } from "../../gql"

const QuestionnaireFragement = graphql(/* GraphQL */ `
  fragment Questionnaire on Form {
    title
    questions {
      _id
      ...QuestionDisplay
    }
  }
`)
const formDetailsDocument = graphql(/* GraphQL */ `
  query FormDetails($id: ID!) {
    formById(id: $id) {
      _id
      ...Questionnaire
    }
  }
`)

interface Props {
  id: string
  goBack(): void
}
export const FormDetails: React.FC<Props> = ({ id, goBack }) => {
  const { data } = useQuery({
    queryKey: ["form-detail", id],
    queryFn: () => client.request(formDetailsDocument, { id: id! }),
    enabled: !!id,
  })
  const form = useFragment(QuestionnaireFragement, data?.formById)

  function submitForm(ev: React.MouseEvent) {
    ev.preventDefault()
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
  )
}
