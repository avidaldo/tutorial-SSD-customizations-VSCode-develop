import { Request, Response } from 'express';
import { handleCreateTask } from './tasks.controller';
import * as tasksService from '../services/tasks.service';

jest.mock('../services/tasks.service');

const mockCreateTask = tasksService.createTask as jest.MockedFunction<typeof tasksService.createTask>;

function makeRes(): { status: jest.Mock; json: jest.Mock } & Partial<Response> {
  const res = { json: jest.fn(), status: jest.fn() } as unknown as { status: jest.Mock; json: jest.Mock };
  (res.status as jest.Mock).mockReturnValue(res);
  return res;
}

function makeReq(body: unknown): Request {
  return { body } as Request;
}

beforeEach(() => {
  jest.clearAllMocks();
});

afterEach(() => {
  jest.restoreAllMocks();
});

// ---------------------------------------------------------------------------

describe('REQ-TC-01 / REQ-TC-02 / REQ-TC-03 / REQ-TC-04: POST /tasks handler', () => {
  describe('REQ-TC-02: title validation', () => {
    it('returns 201 with the created task when title is valid', () => {
      const task = { id: 1, title: 'Buy milk', status: 'To-Do' };
      mockCreateTask.mockReturnValue(task);

      const req = makeReq({ title: 'Buy milk' });
      const res = makeRes();

      handleCreateTask(req as Request, res as unknown as Response);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(task);
    });
  });

  describe('REQ-TC-03: default status', () => {
    it('calls createTask with no status when status is omitted', () => {
      mockCreateTask.mockReturnValue({ id: 1, title: 'Buy milk', status: 'To-Do' });

      const req = makeReq({ title: 'Buy milk' });
      const res = makeRes();

      handleCreateTask(req as Request, res as unknown as Response);

      expect(mockCreateTask).toHaveBeenCalledWith({ title: 'Buy milk', status: undefined });
    });

    it('passes status through when status is provided', () => {
      mockCreateTask.mockReturnValue({ id: 1, title: 'Buy milk', status: 'Done' });

      const req = makeReq({ title: 'Buy milk', status: 'Done' });
      const res = makeRes();

      handleCreateTask(req as Request, res as unknown as Response);

      expect(mockCreateTask).toHaveBeenCalledWith({ title: 'Buy milk', status: 'Done' });
    });
  });

  describe('REQ-TC-04: title length limit', () => {
    it('returns 400 with "Title too long" when title exceeds 50 characters', () => {
      const req = makeReq({ title: 'A'.repeat(51) });
      const res = makeRes();

      handleCreateTask(req as Request, res as unknown as Response);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Title too long' });
      expect(mockCreateTask).not.toHaveBeenCalled();
    });

    it('accepts a title of exactly 50 characters', () => {
      const task = { id: 1, title: 'A'.repeat(50), status: 'To-Do' };
      mockCreateTask.mockReturnValue(task);

      const req = makeReq({ title: 'A'.repeat(50) });
      const res = makeRes();

      handleCreateTask(req as Request, res as unknown as Response);

      expect(res.status).toHaveBeenCalledWith(201);
    });
  });

  describe('edge cases', () => {
    // TODO (spec open question): confirm expected status code and message for missing title.
    it('Missing title — returns 400 when title is absent', () => {
      const req = makeReq({});
      const res = makeRes();

      handleCreateTask(req as Request, res as unknown as Response);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(mockCreateTask).not.toHaveBeenCalled();
    });

    // TODO (spec open question): confirm expected status code and message for empty string title.
    it('Empty string title — returns 400 when title is an empty string', () => {
      const req = makeReq({ title: '' });
      const res = makeRes();

      handleCreateTask(req as Request, res as unknown as Response);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(mockCreateTask).not.toHaveBeenCalled();
    });
  });
});

// ---------------------------------------------------------------------------

describe('REQ-TC-03: tasks.service.createTask default status', () => {
  it('defaults status to "To-Do" when status is not provided', () => {
    const { createTask, _resetStore } = jest.requireActual<typeof tasksService>('../services/tasks.service');
    _resetStore();

    const task = createTask({ title: 'Buy milk' });
    expect(task.status).toBe('To-Do');
  });

  it('uses the provided status when given', () => {
    const { createTask, _resetStore } = jest.requireActual<typeof tasksService>('../services/tasks.service');
    _resetStore();

    const task = createTask({ title: 'Buy milk', status: 'Done' });
    expect(task.status).toBe('Done');
  });
});
