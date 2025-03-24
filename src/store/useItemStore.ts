import { create } from "zustand";
import { Item } from "../types";

/**
 * Zustand store interface for managing the selected item state.
 */
interface ItemStore {
  /**
   * The currently selected item. `null` if no item is selected.
   */
  selectedItem: Item | null;

  /**
   * Sets the currently selected item.
   *
   * @param item - The item to select, or `null` to clear selection.
   */
  setSelectedItem: (item: Item | null) => void;
}

/**
 * Zustand hook for accessing and updating the selected item state.
 *
 * This store is used to manage which item is currently being edited
 * or viewed across components.
 *
 * @returns An object with `selectedItem` and `setSelectedItem`.
 *
 * @example
 * const { selectedItem, setSelectedItem } = useItemStore();
 */
export const useItemStore = create<ItemStore>((set) => ({
  selectedItem: null,
  setSelectedItem: (item) => set({ selectedItem: item }),
}));
