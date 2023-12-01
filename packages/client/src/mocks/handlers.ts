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

// Define handlers that catch the corresponding requests and returns the mock data.
export const handlers = [
  graphql.operation((args) => {
    console.log("Intercepted a GraphQL operation:", args);
    return HttpResponse.json({ data: { forms: mockForms } });
  }),
  graphql.query("FormListPage", ({ query }) => {
    console.log('Intercepted a "FormListPage" GraphQL query:', query);
    return HttpResponse.json({
      data: { forms },
    });
  }),
];
