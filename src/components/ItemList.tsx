import { Item } from "../types";
import { ListItem, ListItemText, IconButton, Stack } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
/**
 * A list component that displays items with edit and delete actions.
 *
 * @param items - The list of items to render.
 * @param onEdit - Callback when the user clicks the edit button.
 * @param onDelete - Callback when the user clicks the delete button.
 */
const ItemList = ({
  items,
  onEdit,
  onDelete,
}: {
  items: Item[];
  onEdit: (item: Item) => void;
  onDelete: (id: number) => void;
}) => (
  <Stack spacing={1}>
    {items.map((item) => (
      <ListItem
        key={item.id}
        secondaryAction={
          <>
            <IconButton onClick={() => onEdit(item)}>
              <EditIcon />
            </IconButton>
            <IconButton onClick={() => onDelete(item.id)}>
              <DeleteIcon />
            </IconButton>
          </>
        }
      >
        <ListItemText primary={item.name} secondary={item.description} />
      </ListItem>
    ))}
  </Stack>
);

export default ItemList;
