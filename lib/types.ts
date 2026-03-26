export type Priority = {
  id: number;
  label: "Low" | "Med" | "High";
  priority: 0 | 1 | 2;
};

export type Todo = {
  id: number;
  text: string;
  completed: boolean;
  priority: Priority;
};
