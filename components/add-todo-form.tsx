import { useTodoStore } from "@/store/todo-store";
import { Priority } from "@/lib/types";
import { ChevronDown, Plus } from "@tamagui/lucide-icons-2";
import { useState } from "react";
import { Button, Input, Popover, Text, XStack, YStack } from "tamagui";

const priorities: Priority[] = [
  {
    id: 0,
    label: "Low",
    priority: 0,
  },
  {
    id: 1,
    label: "Med",
    priority: 1,
  },
  {
    id: 2,
    label: "High",
    priority: 2,
  },
];

export function AddTodoForm() {
  const [input, setInput] = useState("");
  const [isPriorityPopoverOpen, setIsPriorityPopoverOpen] = useState(false);
  const [selectedPriority, setSelectedPriority] = useState<Priority>(
    priorities[0],
  );

  const addTodo = useTodoStore((state) => state.addTodo);

  function handleAddTodo() {
    if (input.trim() === "") return;

    addTodo(input, selectedPriority);
    setInput("");
    setSelectedPriority(priorities[0]);
  }

  return (
    <XStack columnGap="$3" mb="$4">
      <Input
        value={input}
        onChangeText={setInput}
        size="$5"
        flex={1}
        borderWidth="$0"
        rounded="$6"
        placeholderTextColor="$gray11"
        placeholder="Add a todo"
        fontSize="$4"
        color="$gray11"
        bg="$gray6"
      />
      <Popover
        open={isPriorityPopoverOpen}
        onOpenChange={setIsPriorityPopoverOpen}
        offset={8}
        allowFlip
      >
        <Popover.Trigger asChild>
          <Button
            iconAfter={ChevronDown}
            mb="$4"
            size="$5"
            borderWidth="$0"
            rounded="$6"
            bg="$gray6"
            width={85}
          >
            <Text>{selectedPriority.label}</Text>
          </Button>
        </Popover.Trigger>

        <Popover.Content
          bordered
          elevate
          enterStyle={{ opacity: 0, y: -8 }}
          exitStyle={{ opacity: 0, y: -8 }}
          p="$0"
        >
          <YStack p="$2" gap="$2">
            {priorities.map((priority) => (
              <Button
                key={priority.id}
                variant={
                  selectedPriority.id === priority.id ? "outlined" : undefined
                }
                onPress={() => {
                  setSelectedPriority(priority);
                  setIsPriorityPopoverOpen(false);
                }}
              >
                <Text>{priority.label}</Text>
              </Button>
            ))}
          </YStack>
        </Popover.Content>
      </Popover>

      <Button
        borderWidth="$0"
        icon={<Plus color="white" />}
        iconSize="$6"
        size="$5"
        width="$5"
        rounded="$6"
        bg="black"
        disabled={input.trim() === ""}
        disabledStyle={{
          bg: "$gray9",
        }}
        onPress={handleAddTodo}
      />
    </XStack>
  );
}
