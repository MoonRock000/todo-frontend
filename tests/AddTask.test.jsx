import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { vi } from "vitest";
import AddTask from "../src/components/AddTask";
import { createTask } from "../src/api/tasksApi";

vi.mock("../src/api/tasksApi", () => ({
  createTask: vi.fn(),
}));

describe("AddTask", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("renders AddTask form correctly", () => {
    render(<AddTask setTodos={vi.fn()} />);

    expect(screen.getByPlaceholderText(/Add Task.../i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Add/i })).toBeInTheDocument();
  });

  test("submits the form and adds a task successfully", async () => {
    const mockSetTodos = vi.fn();
    const mockTask = { id: 1, title: "New Task", status: "pending" };

    createTask.mockResolvedValue({
      data: {
        tasks: [mockTask],
      },
    });

    render(<AddTask setTodos={mockSetTodos} />);

    const input = screen.getByPlaceholderText(/Add Task.../i);
    const addButton = screen.getByRole("button", { name: /Add/i });

    fireEvent.change(input, { target: { value: "New Task" } });
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(createTask).toHaveBeenCalledWith("New Task");
      expect(mockSetTodos).toHaveBeenCalledWith([mockTask]);
      expect(screen.getByPlaceholderText(/Add Task.../i).value).toBe("");
      expect(screen.getByText(/Task Added Successfully/i)).toBeInTheDocument();
    });
  });

  test("shows an error message when task creation fails", async () => {
    const mockSetTodos = vi.fn();
    const mockError = {
      response: {
        data: {
          errors: ["Title cannot be blank"],
        },
      },
    };

    createTask.mockRejectedValue(mockError);

    render(<AddTask setTodos={mockSetTodos} />);

    const input = screen.getByPlaceholderText(/Add Task.../i);
    const addButton = screen.getByRole("button", { name: /Add/i });

    fireEvent.change(input, { target: { value: "" } });
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(createTask).toHaveBeenCalledWith("");
      expect(mockSetTodos).not.toHaveBeenCalled();
      expect(
        screen.getByText(/Error: Failed to add task: /i)
      ).toBeInTheDocument();
    });
  });
});
