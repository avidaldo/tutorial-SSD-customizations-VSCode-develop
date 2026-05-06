import { Request, Response } from 'express';
import { createTask } from '../services/tasks.service';

const TITLE_MAX_LENGTH = 50;

/**
 * Handles POST /tasks requests.
 *
 * @spec REQ-TC-01
 * @spec REQ-TC-02
 * @spec REQ-TC-03
 * @spec REQ-TC-04
 */
export function handleCreateTask(req: Request, res: Response): void {
  const { title, status } = req.body as { title?: unknown; status?: unknown };

  // REQ-TC-02: title must be present and a string
  if (title === undefined || title === null || typeof title !== 'string') {
    // Edge case: missing title — behavior not yet specified in spec.
    // TODO: confirm expected status code and message with spec owner.
    res.status(400).json({ message: 'Title is required' });
    return;
  }

  // Edge case: empty string title — behavior not yet specified in spec.
  // TODO: confirm expected status code and message with spec owner.
  if (title.trim() === '') {
    res.status(400).json({ message: 'Title must not be empty' });
    return;
  }

  // REQ-TC-04: title must not exceed 50 characters
  if (title.length > TITLE_MAX_LENGTH) {
    res.status(400).json({ message: 'Title too long' });
    return;
  }

  const task = createTask({
    title,
    status: typeof status === 'string' ? status : undefined,
  });

  res.status(201).json(task);
}
