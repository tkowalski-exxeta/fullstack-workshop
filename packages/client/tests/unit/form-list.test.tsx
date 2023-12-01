import { FormListPage } from "../../src/forms";
import { render, screen } from "../utils/test-utils";

it("simple add", async () => {
  render(<FormListPage />);
  const plusBtn = await screen.findByText("Test Form");
  expect(plusBtn).toBeInTheDocument();
});
