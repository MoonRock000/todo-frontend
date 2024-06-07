import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import UserLoginForm from "../src/components/LoginForm";
import { vi } from "vitest";

vi.mock("../api/userAuth");
vi.mock("../storage/sessionStorage");

const mockNavigate = vi.fn();
vi.mock("react-router", () => ({
  ...vi.importActual("react-router"),
  useNavigate: () => mockNavigate,
}));

describe("UserLoginForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("renders form correctly", () => {
    render(
      <MemoryRouter>
        <UserLoginForm toggleShowSignUp={vi.fn()} showSignUp={false} />
      </MemoryRouter>
    );

    expect(screen.getAllByText(/Log In/i)[0]).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Log In/i })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Need an account?/i })
    ).toBeInTheDocument();
  });

  test("form validation works", async () => {
    render(
      <MemoryRouter>
        <UserLoginForm toggleShowSignUp={vi.fn()} showSignUp={false} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole("button", { name: /Log In/i }));

    await waitFor(() => {
      expect(screen.getByText(/Email is required/i)).toBeInTheDocument();
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
    fireEvent.click(screen.getByRole("button", { name: /Log In/i }));

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
        <UserLoginForm toggleShowSignUp={toggleShowSignUp} showSignUp={false} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole("button", { name: /Need an account?/i }));

    expect(toggleShowSignUp).toHaveBeenCalledWith(true);
  });
});
