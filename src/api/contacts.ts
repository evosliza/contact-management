import { Contact } from "../types";
import { useQuery } from "@tanstack/react-query";

// export const fetchContacts = async (): Promise<Contact[]> => {
//   const { data } = await axios.get("http://localhost:3000/contacts");
//   return data as Contact[];
// };

export function useContacts() {
  return useQuery({
    queryKey: ["contacts"],
    queryFn: async (): Promise<Array<Contact>> => {
      const response = await fetch("http://localhost:3000/contacts");
      return await response.json();
    },
  });
}

export const addContact = async (
  newContact: Partial<Contact>
): Promise<Contact> => {
  const response = await fetch("http://localhost:3000/contacts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newContact),
  });
  return await response.json();
};

export const updateContact = async (
  updatedContact: Partial<Contact>
): Promise<Contact> => {
  const response = await fetch(
    `http://localhost:3000/contacts/${updatedContact.id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedContact),
    }
  );
  return await response.json();
};

export const deleteContact = async (contactId: string) => {
  await fetch(`http://localhost:3000/contacts/${contactId}`, {
    method: "DELETE",
  });
};
