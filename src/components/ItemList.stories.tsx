import ItemList from "./ItemList";
import type { Meta, StoryObj } from "@storybook/react";
import { Item } from "../types";

const meta: Meta<typeof ItemList> = {
  title: "Components/ItemList",
  component: ItemList,
};

export default meta;

type Story = StoryObj<typeof ItemList>;

const sampleItems: Item[] = [
  { id: 1, name: "Item 1", description: "First item" },
  { id: 2, name: "Item 2", description: "Second item" },
];

export const Default: Story = {
  args: {
    items: sampleItems,
    onEdit: (item) => console.log("Edit:", item),
    onDelete: (id) => console.log("Delete:", id),
  },
};
