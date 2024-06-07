import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import UserSignupForm from "../src/components/SignUpForm";
import { vi } from "vitest";

vi.mock("../api/userAuth");
vi.mock("../storage/sessionStorage");

const mockNavigate = vi.fn();
vi.mock("react-router", () => ({
  ...vi.importActual("react-router"),
  useNavigate: () => mockNavigate,
}));

describe("UserSignUpForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("renders form correctly", () => {
    render(
      <MemoryRouter>
        <UserSignupForm toggleShowSignUp={vi.fn()} showSignUp={true} />
      </MemoryRouter>
    );

    expect(screen.getAllByText(/Sign Up/i)[0]).toBeInTheDocument();
    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Sign Up/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Already have an account??/i })
    ).toBeInTheDocument();
  });

  test("form validation works", async () => {
    render(
      <MemoryRouter>
        <UserSignupForm toggleShowSignUp={vi.fn()} showSignUp={true} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole("button", { name: /Sign Up/i }));

    await waitFor(() => {
      expect(screen.getByText(/Email is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Name is required/i)).toBeInTheDocument();
      expect(
        screen.getByText(/Password must be at least 8 characters/i)
      ).toBeInTheDocument();
    });

    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: "invalidemail" },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: "short" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Sign Up/i }));

    await waitFor(() => {
      expect(
        screen.getByText(/Email must be a valid email address/i)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/Password must be at least 8 characters/i)
      ).toBeInTheDocument();
    });
  });

  test("toggle button functionality works", () => {
    const toggleShowSignUp = vi.fn();

    render(
      <MemoryRouter>
        <UserSignupForm
          toggleShowSignUp={toggleShowSignUp}
          showSignUp={false}
        />
      </MemoryRouter>
    );

    fireEvent.click(
      screen.getByRole("button", { name: /Already have an account?/i })
    );

    expect(toggleShowSignUp).toHaveBeenCalledWith(true);
  });
});
