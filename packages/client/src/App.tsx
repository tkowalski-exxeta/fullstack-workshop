import { client } from "./gql/client"
import { MainLayout } from "./layout/MainLayout"
import { FormPage } from "./pages/FormPage"
import { ApolloProvider } from "@apollo/client"

function App() {
  return (
    <ApolloProvider client={client}>
      <MainLayout>
        <FormPage />
      </MainLayout>
    </ApolloProvider>
  )
}

export default App
