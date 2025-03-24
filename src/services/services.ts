import { Item } from "../types";

const BASE_URL = "https://jsonplaceholder.typicode.com/posts";

/**
 * @module services
 * This module provides service functions to fetch, create, update, and delete items
 * from a placeholder REST API.
 */

/**
 * Fetches a list of items from the API.
 * @returns A promise that resolves with an array of items.
 */
export const fetchItems = async (): Promise<Item[]> => {
  const res = await fetch(BASE_URL);
  const data = await res.json();
  return data.slice(0, 10).map((d: any) => ({
    id: d.id,
    name: d.title,
    description: d.body,
  }));
};

/**
 * Fetches a single item by its ID.
 *
 * @param id - The ID of the item to fetch.
 * @returns A promise that resolves with the item.
 */
export const fetchItemById = async (id: number): Promise<Item> => {
  const res = await fetch(`${BASE_URL}/${id}`);
  const data = await res.json();
  return {
    id: data.id,
    name: data.title,
    description: data.body,
  };
};

/**
 * Sends a POST request to create a new item.
 *
 * @param item - The partial item data (without an ID) to create.
 * @returns A promise that resolves with the created item.
 */
export const createItem = async (item: Partial<Item>): Promise<Item> => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    body: JSON.stringify({
      title: item.name,
      body: item.description,
    }),
    headers: { "Content-Type": "application/json" },
  });
  return res.json();
};

/**
 * Sends a PUT request to update an existing item.
 *
 * @param item - The full item object, including its ID.
 * @returns A promise that resolves with the updated item.
 */
export const updateItem = async (item: Item): Promise<Item> => {
  const res = await fetch(`${BASE_URL}/${item.id}`, {
    method: "PUT",
    body: JSON.stringify({
      title: item.name,
      body: item.description,
    }),
    headers: { "Content-Type": "application/json" },
  });
  return res.json();
};

/**
 * Sends a DELETE request to remove an item by ID.
 *
 * @param id - The ID of the item to delete.
 * @returns A promise that resolves with the deleted item's ID.
 * @throws Will throw an error if the request fails.
 */
export const deleteItem = async (id: number): Promise<{ id: number }> => {
  const res = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Delete failed");
  return { id };
};
