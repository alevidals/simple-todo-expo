import { Todo } from "@/lib/types";

export function sortTodosByPriority(todos: Todo[]) {
  return [...todos].sort((a, b) => b.priority.priority - a.priority.priority);
}
