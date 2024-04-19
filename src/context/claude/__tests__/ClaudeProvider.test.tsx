import { http } from "msw";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { server } from "@/mocks/server";
import userEvent from "@testing-library/user-event";
import ClaudeProvider from "../claude-provider";

describe("Claude Provider", () => {
  describe("getMessages function", () => {
    it("makes a succesful API call", async () => {
      render(
        <ClaudeProvider>
          <div>Test child</div>
        </ClaudeProvider>
      );

      // Simulate form submission
      const textArea = screen.getByPlaceholderText("Reply to Mfon.ai...");
      await userEvent.type(textArea, "Test message");
      fireEvent.submit(textArea);

      // Wait for the API request to complete
      await waitFor(() => screen.findByText("Test message"));

      // Verify that the message returned from the API is displayed
      expect(screen.getByText("Test message")).toBeInTheDocument();
    });
  });
});
