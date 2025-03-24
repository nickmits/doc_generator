import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchItems,
  createItem,
  updateItem,
  deleteItem,
} from "../services/services";
import { useItemStore } from "../store/useItemStore";
import { Box, Typography, CircularProgress, Stack } from "@mui/material";
import ItemForm from "./ItemForm";
import ItemList from "./ItemList";
import { Item } from "../types";

/**
 * `ItemsPage` is the main component responsible for managing
 * CRUD operations (Create, Read, Update, Delete) on `Item` entities.
 *
 * It integrates React Query for data fetching and mutation,
 * Zustand for local UI state (selected item), and renders the form
 * and list components.
 *
 * @component
 * @example
 * return <ItemsPage />
 *
 * @remarks
 * This component fetches a list of items on mount, allows creation of new items,
 * editing of existing items, and deletion. It uses optimistic updates and refetching
 * strategies through React Query.
 */
const ItemsPage = () => {
  const queryClient = useQueryClient();
  const { selectedItem, setSelectedItem } = useItemStore();

  /**
   * Query to fetch the list of items.
   *
   * - Sorted by ID in descending order.
   * - Stale for 5 minutes.
   * - Retries up to 2 times on failure.
   */
  const {
    data: items,
    isLoading,
    isFetching,
    error,
    refetch,
  } = useQuery({
    queryKey: ["items"],
    queryFn: fetchItems,
    enabled: true,
    staleTime: 1000 * 60 * 5,
    refetchInterval: false,
    retry: 2,
    select: (data) => data.sort((a, b) => b.id - a.id),
  });

  /**
   * Mutation for creating a new item.
   * On success, it prepends the new item to the cached list.
   */
  const createMutation = useMutation({
    mutationFn: createItem,
    onSuccess: (newItem) => {
      queryClient.setQueryData<Item[]>(["items"], (old = []) => [
        { ...newItem, id: Date.now() },
        ...old,
      ]);
    },
  });

  /**
   * Mutation for updating an existing item.
   * On success, it invalidates the `items` query to refetch the updated list.
   */
  const updateMutation = useMutation({
    mutationKey: ["updateItem"],
    mutationFn: updateItem,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["items"] }),
  });

  /**
   * Mutation for deleting an item.
   * On success, it invalidates the `items` query to refresh the list.
   */
  const deleteMutation = useMutation({
    mutationKey: ["deleteItem"],
    mutationFn: deleteItem,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["items"] }),
  });

  /**
   * Handles form submission for creating or updating an item.
   * If a `selectedItem` is present, it triggers the update mutation;
   * otherwise, it creates a new item.
   *
   * @param item - The item data from the form (partial for creation/edit).
   */
  const handleSubmit = (item: Partial<Item>) => {
    if (selectedItem) {
      updateMutation.mutate({ ...selectedItem, ...item });
    } else {
      createMutation.mutate(item);
    }
    setSelectedItem(null);
  };

  /**
   * Handles deletion of an item by ID.
   *
   * @param id - The ID of the item to delete.
   */
  const handleDelete = (id: number) => deleteMutation.mutate(id);

  if (isLoading) return <CircularProgress />;

  return (
    <Box p={4}>
      <Typography variant='h4'>Items CRUD</Typography>
      <Stack spacing={3} mt={4}>
        <ItemForm onSubmit={handleSubmit} />
        <ItemList
          items={items ?? []}
          onEdit={setSelectedItem}
          onDelete={handleDelete}
        />
      </Stack>
    </Box>
  );
};

export default ItemsPage;
