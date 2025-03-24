// ItemForm.tsx
import { useEffect, useState } from "react";
import { TextField, Button, Stack } from "@mui/material";
import { useItemStore } from "../store/useItemStore";
import { Item } from "../types";

/**
 * Props for the ItemForm component.
 */
export interface ItemFormProps {
  /**
   * Handles form submission with partial item data.
   */
  onSubmit: (item: Partial<Item>) => void;
}

/**
 * A form component for creating or updating an Item.
 */
export default function ItemForm({ onSubmit }: ItemFormProps) {
  const { selectedItem } = useItemStore();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (selectedItem) {
      setName(selectedItem.name);
      setDescription(selectedItem.description);
    } else {
      setName("");
      setDescription("");
    }
  }, [selectedItem]);

  const handleSubmit = () => {
    onSubmit({ name, description });
    setName("");
    setDescription("");
  };

  return (
    <Stack spacing={2}>
      <TextField
        label='Name'
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
        label='Description'
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <Button variant='contained' onClick={handleSubmit}>
        {selectedItem ? "Update" : "Create"}
      </Button>
    </Stack>
  );
}
