import { describe, expect, test } from "vitest";
import { FormListPage } from "../../src/forms";
import { render, screen } from "../utils/test-utils";

describe("FormListPage - server returns 5 items", () => {
  test("simple add", async () => {
    render(<FormListPage />);
    const item = await screen.findByText("Test Form");
    expect(item).toBeInTheDocument();
  });
});
