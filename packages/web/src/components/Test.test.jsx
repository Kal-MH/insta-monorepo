import render from "@/utils/test/render";
import { screen, within } from "@testing-library/react";
import Test from "./Test";

it("Test components has 'Test' text", async () => {
  await render(<Test />);

  expect(screen.getByTestId("test")).toBeInTheDocument();
});
