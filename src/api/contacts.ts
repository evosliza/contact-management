import { Contact } from "../types";
import {
  UseBaseMutationResult,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

export function useContacts(queryParams?: Record<string, string>) {
  const queryString = queryParams
    ? "?" + new URLSearchParams(queryParams).toString()
    : "";
  return useQuery({
    queryKey: ["contacts", queryParams],
    queryFn: async (): Promise<Array<Contact>> => {
      const response = await fetch(
        `http://localhost:3000/contacts${queryString}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return await response.json();
    },
  });
}

export const useContact = (contactId: string | number) => {
  return useQuery({
    queryKey: ["contacts", contactId],
    queryFn: async () => {
      const response = await fetch(
        `http://localhost:3000/contacts/${contactId}`
      );
      return await response.json();
    },
  });
};

export const addContact = async (newContact: Partial<Contact>) => {
  const contact = await fetch("http://localhost:3000/contacts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newContact),
  });

  return contact.json();
};

export const useAddContact = (): UseBaseMutationResult<
  unknown,
  unknown,
  Partial<Contact>,
  unknown
> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (contact: Partial<Contact>) => addContact(contact),
    onSuccess: () => {
      queryClient.invalidateQueries(["contacts"]);
    },
  });
};

const updateContact = async (
  contactId: string | number,
  contact: Partial<Contact>
) => {
  const cupdatedContact = await fetch(
    `http://localhost:3000/contacts/${contactId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contact),
    }
  );

  return cupdatedContact.json();
};

export const useUpdateContact = (): UseBaseMutationResult<
  unknown,
  unknown,
  Contact,
  unknown
> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (contact: Contact) => updateContact(contact.id, contact),
    onSuccess: () => {
      queryClient.invalidateQueries(["contacts"]);
    },
  });
};

const deleteContact = async (contactId: string) => {
  console.log("Deleting contact", contactId);
  return await fetch(`http://localhost:3000/contacts/${contactId}`, {
    method: "DELETE",
  });
};

export const useDeleteContact = (): UseBaseMutationResult<
  unknown,
  unknown,
  string,
  unknown
> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (contactId) => deleteContact(contactId),
    onSuccess: () => {
      queryClient.invalidateQueries(["contacts"]);
    },
  });
};
