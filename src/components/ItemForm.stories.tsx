import ItemForm from "./ItemForm";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof ItemForm> = {
  title: "Components/ItemForm",
  component: ItemForm,
};

export default meta;

type Story = StoryObj<typeof ItemForm>;

export const Default: Story = {
  args: {
    onSubmit: (item) => alert(JSON.stringify(item)),
  },
};
