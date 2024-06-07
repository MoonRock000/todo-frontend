import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { vi } from "vitest";
import Header from "../src/components/Header";
import { deleteToken, getToken, getUser } from "../src/storage/sessionStorage";

// Mock sessionStorage functions
vi.mock("../src/storage/sessionStorage", () => ({
  deleteToken: vi.fn(),
  getToken: vi.fn(),
  getUser: vi.fn(),
}));

const mockNavigate = vi.fn();
vi.mock("react-router", () => ({
  ...vi.importActual("react-router"),
  useNavigate: () => mockNavigate,
}));

describe("Header", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("renders header correctly", () => {
    // Mock getUser to return a value
    getUser.mockReturnValue("John Doe");
    // Mock getToken to return a value
    getToken.mockReturnValue("testToken");

    render(<Header />);

    expect(screen.getByText(/Todo List Application/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Hey John Doe, Let's Hustle and finish some tasks!/i)
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Log Out/i })
    ).toBeInTheDocument();
  });

  test("renders header without log out button if user not logged in", () => {
    // Mock getUser to return null
    getUser.mockReturnValue(null);

    render(<Header />);

    expect(screen.getByText(/Todo List Application/i)).toBeInTheDocument();
    expect(screen.queryByText(/Hey/i)).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /Log Out/i })
    ).not.toBeInTheDocument();
  });

  test("log out button calls deleteToken and navigates to home page", () => {
    // Mock getUser to return a value
    getUser.mockReturnValue("John Doe");
    // Mock getToken to return a value
    getToken.mockReturnValue("testToken");

    render(<Header />);

    fireEvent.click(screen.getByRole("button", { name: /Log Out/i }));

    expect(deleteToken).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });
});
