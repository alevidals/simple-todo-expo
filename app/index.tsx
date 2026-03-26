import { AddTodoForm } from "@/components/add-todo-form";
import { TodoList } from "@/components/todo-list";
import { useTodoStore } from "@/store/todo-store";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, View } from "tamagui";

export default function Index() {
  const todos = useTodoStore((state) => state.todos);
  const hasTodos = todos.length > 0;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View p="$4" flex={1}>
        <Text fontSize="$10" fontWeight="bold" mb="$2">
          Todos
        </Text>
        <Text fontSize="$3" color="$gray11" mb="$4">
          You have {todos.length} {todos.length === 1 ? "todo" : "todos"}
        </Text>
        <AddTodoForm />
        {hasTodos ? (
          <TodoList />
        ) : (
          <View mt="$12">
            <Text fontSize="$4" color="$gray11" mt="$5" text="center">
              Congratulations 🎉! You have no todos. Add some tasks to get
              started.
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}
