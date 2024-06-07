import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { vi } from "vitest";
import TasksFilter from "../src/components/TasksFilter";

describe("TasksFilter", () => {
  const mockHandleFilterChange = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("renders tabs correctly with initial filter", () => {
    render(
      <TasksFilter filter="all" handleFilterChange={mockHandleFilterChange} />
    );

    expect(screen.getByText(/All/i)).toBeInTheDocument();
    expect(screen.getByText(/Pending/i)).toBeInTheDocument();
    expect(screen.getByText(/Complete/i)).toBeInTheDocument();

    const allTab = screen.getByText(/All/i).closest("button");
    const pendingTab = screen.getByText(/Pending/i).closest("button");
    const completeTab = screen.getByText(/Complete/i).closest("button");

    expect(allTab).toHaveAttribute("aria-selected", "true");
    expect(pendingTab).toHaveAttribute("aria-selected", "false");
    expect(completeTab).toHaveAttribute("aria-selected", "false");
  });

  test("calls handleFilterChange when a tab is clicked", () => {
    render(
      <TasksFilter filter="all" handleFilterChange={mockHandleFilterChange} />
    );

    fireEvent.click(screen.getByText(/Pending/i));
    expect(mockHandleFilterChange).toHaveBeenCalledWith("pending");

    fireEvent.click(screen.getByText(/Complete/i));
    expect(mockHandleFilterChange).toHaveBeenCalledWith("complete");

    fireEvent.click(screen.getByText(/All/i));
    expect(mockHandleFilterChange).toHaveBeenCalledWith("all");
  });

  test("sets the correct tab as active based on filter prop", () => {
    const { rerender } = render(
      <TasksFilter filter="all" handleFilterChange={mockHandleFilterChange} />
    );

    const allTab = screen.getByText(/All/i).closest("button");
    const pendingTab = screen.getByText(/Pending/i).closest("button");
    const completeTab = screen.getByText(/Complete/i).closest("button");

    expect(allTab).toHaveAttribute("aria-selected", "true");
    expect(pendingTab).toHaveAttribute("aria-selected", "false");
    expect(completeTab).toHaveAttribute("aria-selected", "false");

    rerender(
      <TasksFilter
        filter="pending"
        handleFilterChange={mockHandleFilterChange}
      />
    );
    expect(allTab).toHaveAttribute("aria-selected", "false");
    expect(pendingTab).toHaveAttribute("aria-selected", "true");
    expect(completeTab).toHaveAttribute("aria-selected", "false");

    rerender(
      <TasksFilter
        filter="complete"
        handleFilterChange={mockHandleFilterChange}
      />
    );
    expect(allTab).toHaveAttribute("aria-selected", "false");
    expect(pendingTab).toHaveAttribute("aria-selected", "false");
    expect(completeTab).toHaveAttribute("aria-selected", "true");
  });
});
