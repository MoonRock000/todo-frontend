import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Progress from "../src/components/Progress";

describe("Progress", () => {
  test("renders progress correctly", () => {
    const todos = [
      { id: 1, status: "complete" },
      { id: 2, status: "pending" },
      { id: 3, status: "complete" },
      { id: 4, status: "pending" },
    ];

    render(<Progress todos={todos} />);

    expect(screen.getByText(/50.00% Completed!/i)).toBeInTheDocument();
    expect(
      screen.getByText(/More than halfway! Awesome work!/i)
    ).toBeInTheDocument();
  });

  test("renders progress when no todos", () => {
    const todos = [];

    render(<Progress todos={todos} />);

    expect(screen.getByText(/0% Completed!/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Let's start and keep going!/i)
    ).toBeInTheDocument();
  });
});
