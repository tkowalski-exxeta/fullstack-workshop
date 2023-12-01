// import { it } from 'vitest'
import React from "react";
import { FormListPage } from "../../src/forms";
import { render, screen } from "../utils/test-utils";

it("simple add", async () => {
  render(<FormListPage />);
  const plusBtn = await screen.findByRole("button", { name: "plus icon" });
  expect(plusBtn).toBeInTheDocument();
});
