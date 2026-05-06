export type TaskStatus = 'To-Do' | string;

export interface Task {
  id: number;
  title: string;
  status: TaskStatus;
}

export interface CreateTaskInput {
  title: string;
  status?: string;
}

const tasks: Task[] = [];
let nextId = 1;

/**
 * Creates a new task.
 *
 * @spec REQ-TC-02
 * @spec REQ-TC-03
 */
export function createTask(input: CreateTaskInput): Task {
  const task: Task = {
    id: nextId++,
    title: input.title,
    status: input.status ?? 'To-Do',
  };
  tasks.push(task);
  return task;
}

/** Resets the in-memory store. Intended for use in tests only. */
export function _resetStore(): void {
  tasks.length = 0;
  nextId = 1;
}
