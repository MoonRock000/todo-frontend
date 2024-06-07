import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { vi } from "vitest";
import { toast } from "react-toastify";
import TasksList from "../src/components/TasksList";
import { deleteTask, editTask } from "../src/api/tasksApi";

// Mock the deleteTask and editTask API functions
vi.mock("../src/api/tasksApi", () => ({
  deleteTask: vi.fn(),
  editTask: vi.fn(),
}));

// Mock the toast notifications
vi.mock("react-toastify", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

describe("TasksList", () => {
  const mockSetTodos = vi.fn();
  const mockTodos = [
    { id: 1, description: "Task 1", status: "pending" },
    { id: 2, description: "Task 2", status: "complete" },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("renders tasks correctly", () => {
    render(<TasksList todos={mockTodos} setTodos={mockSetTodos} />);

    expect(screen.getByText(/Task 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Status: Pending/i)).toBeInTheDocument();
    expect(screen.getByText(/Task 2/i)).toBeInTheDocument();
    expect(screen.getByText(/Status: Complete/i)).toBeInTheDocument();
  });

  test("deletes a task successfully", async () => {
    deleteTask.mockResolvedValue({
      data: {
        tasks: mockTodos.slice(1),
      },
    });

    render(<TasksList todos={mockTodos} setTodos={mockSetTodos} />);

    fireEvent.click(screen.getAllByText(/Delete/i)[0]);

    await waitFor(() => {
      expect(deleteTask).toHaveBeenCalledWith(1);
      expect(mockSetTodos).toHaveBeenCalledWith(mockTodos.slice(1));
      expect(toast.success).toHaveBeenCalledWith("Task Deleted Successfully!");
    });
  });

  test("shows error message when task deletion fails", async () => {
    deleteTask.mockRejectedValue({
      response: {
        data: {
          error: "Unable to delete task",
        },
      },
    });

    render(<TasksList todos={mockTodos} setTodos={mockSetTodos} />);

    fireEvent.click(screen.getAllByText(/Delete/i)[0]);

    await waitFor(() => {
      expect(deleteTask).toHaveBeenCalledWith(1);
      expect(mockSetTodos).not.toHaveBeenCalled();
      expect(toast.error).toHaveBeenCalledWith(
        "Could not delete task: Unable to delete task"
      );
    });
  });

  test("edits a task status successfully", async () => {
    const editedTask = { ...mockTodos[0], status: "complete" };

    editTask.mockResolvedValue({
      data: {
        tasks: [editedTask, mockTodos[1]],
      },
    });

    render(<TasksList todos={mockTodos} setTodos={mockSetTodos} />);

    fireEvent.click(screen.getAllByText(/Mark As Complete/i)[0]);

    await waitFor(() => {
      expect(editTask).toHaveBeenCalledWith(editedTask);
      expect(mockSetTodos).toHaveBeenCalledWith([editedTask, mockTodos[1]]);
      expect(toast.success).toHaveBeenCalledWith("Task marked successfully!");
    });
  });

  test("shows error message when task status editing fails", async () => {
    editTask.mockRejectedValue({
      response: {
        data: {
          errors: ["Unable to edit task"],
        },
      },
    });

    render(<TasksList todos={mockTodos} setTodos={mockSetTodos} />);

    fireEvent.click(screen.getAllByText(/Mark As Complete/i)[0]);

    await waitFor(() => {
      expect(editTask).toHaveBeenCalledWith({
        ...mockTodos[0],
        status: "complete",
      });
      expect(mockSetTodos).not.toHaveBeenCalled();
      expect(toast.error).toHaveBeenCalledWith(
        "Could not edit task: Unable to edit task"
      );
    });
  });

  test("opens the edit modal with correct task", () => {
    render(<TasksList todos={mockTodos} setTodos={mockSetTodos} />);

    fireEvent.click(screen.getAllByText(/Edit/i)[0]);

    expect(screen.getByText(/Edit Task/i)).toBeInTheDocument();
    expect(screen.getByText(/Description: Task 1/i)).toBeInTheDocument();
  });
});
