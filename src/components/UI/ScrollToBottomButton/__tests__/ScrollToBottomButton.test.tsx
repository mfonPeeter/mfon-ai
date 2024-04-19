import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ScrollToBottomButton from "@/components/UI/ScrollToBottomButton/ScrollToBottomButton";

describe("ScrollToBottomButton Component", () => {
  it("renders scroll button", () => {
    // Mock Ref object representing the feedback container
    const feedbackContainerRef = { current: document.createElement("div") };
    // Set an arbitrary height for the text area
    const textAreaHeight = 100;

    render(
      <ScrollToBottomButton
        feedbackContainerRef={feedbackContainerRef}
        textAreaHeight={textAreaHeight}
      />
    );

    const scrollButton = screen.getByRole("button");
    expect(scrollButton).toBeInTheDocument();
  });
});
