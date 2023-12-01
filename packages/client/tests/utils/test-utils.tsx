import { render } from "@testing-library/react";
import React from "react";
// eslint-disable-next-line react-refresh/only-export-components
export * from "@testing-library/react";
export { default as userEvent } from "@testing-library/user-event";

function customRender(ui: React.ReactElement, options = {}) {
  return render(ui, {
    // wrap provider(s) here if needed
    wrapper: ({ children }) => (
      // <ApolloProvider client={client}>{children}</ApolloProvider>
      <>{children}</>
    ),
    ...options,
  });
}

export { customRender as render };
