import { useTodoStore } from "@/store/todo-store";
import { X } from "@tamagui/lucide-icons-2";
import {
  Button,
  ColorTokens,
  ListItem,
  ScrollView,
  Text,
  View,
  XStack,
  YGroup,
  YStack,
} from "tamagui";

function PriorityBadge({ priority }: { priority: string }) {
  let bgColor: ColorTokens = "$gray5";
  if (priority === "High") bgColor = "$red5";
  else if (priority === "Med") bgColor = "$yellow5";

  return (
    <View px="$2" py="$1" rounded="$4" bg={bgColor}>
      <Text>{priority}</Text>
    </View>
  );
}

export function TodoList() {
  const todos = useTodoStore((state) => state.todos);
  const toggleTodo = useTodoStore((state) => state.toggleTodo);
  const removeTodo = useTodoStore((state) => state.removeTodo);

  function handleToggleTodo(id: number) {
    toggleTodo(id);
  }

  function handleRemoveTodo(id: number) {
    removeTodo(id);
  }

  return (
    <ScrollView flex={1}>
      <YGroup size="$4" rowGap="$3">
        {todos.map((todo) => (
          <YStack key={todo.id}>
            <ListItem
              rounded="$6"
              onPress={() => handleToggleTodo(todo.id)}
              accessibilityRole="checkbox"
              accessibilityState={{ checked: todo.completed }}
              bg={todo.completed ? "$gray5" : "white"}
              transition="bouncy"
              pressStyle={{
                scale: 0.95,
                bg: "white",
              }}
              enterStyle={{
                scale: 1.5,
                y: -10,
                opacity: 0,
              }}
              animationDuration={200}
            >
              <XStack items="center" gap="$4" rounded="$6">
                <Text
                  flex={1}
                  fontSize="$4"
                  textDecorationLine={todo.completed ? "line-through" : "none"}
                >
                  {todo.text}
                </Text>
                <PriorityBadge priority={todo.priority.label} />
                <Button
                  borderWidth="$0"
                  variant="outlined"
                  icon={<X color="$gray11" />}
                  iconSize="$6"
                  width="$4"
                  onPress={() => handleRemoveTodo(todo.id)}
                />
              </XStack>
            </ListItem>
          </YStack>
        ))}
      </YGroup>
    </ScrollView>
  );
}
