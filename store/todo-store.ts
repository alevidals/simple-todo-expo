import { Priority, Todo } from "@/lib/types";
import { sortTodosByPriority } from "@/lib/utils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type TodoStore = {
  todos: Todo[];
  addTodo: (text: string, priority: Priority) => void;
  toggleTodo: (id: number) => void;
  removeTodo: (id: number) => void;
};

export const useTodoStore = create<TodoStore>()(
  persist(
    (set) => ({
      todos: [],
      addTodo: (text, priority) =>
        set((state) => ({
          todos: sortTodosByPriority([
            ...state.todos,
            { id: Date.now(), text, completed: false, priority },
          ]),
        })),
      toggleTodo: (id) =>
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo,
          ),
        })),
      removeTodo: (id) =>
        set((state) => ({
          todos: state.todos.filter((todo) => todo.id !== id),
        })),
    }),
    {
      name: "todo-storage",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
