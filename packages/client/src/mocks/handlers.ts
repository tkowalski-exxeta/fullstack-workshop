import { HttpResponse, graphql } from "msw";

// Mock Data
export const mockForms = [
  {
    _id: "6479b7e2762f4f829cb7c316",
    title: "Test Form",
  },
  {
    _id: "648c5d0b7c4bc517ee1bcd9b",
    title: "Untitled Form",
  },
];
const backend = graphql.link("http://localhost:4000/graphql");

// Define handlers that catch the corresponding requests and returns the mock data.
export const handlers = [
  backend.operation((args) => {
    console.log("Intercepted a GraphQL operation:", args);
    return HttpResponse.json({ data: { forms: mockForms } });
  }),
  backend.query("FormListPage", ({ query }) => {
    console.log('Intercepted a "FormListPage" GraphQL query:', query);
    return HttpResponse.json({
      data: { forms: mockForms },
    });
  }),
];
