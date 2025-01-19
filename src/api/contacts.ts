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

// export const addContact = async (
//   newContact: Partial<Contact>
// ): Promise<Contact> => {
//   const { data } = await axios.post(
//     "http://localhost:3000/contacts",
//     newContact
//   );
//   return data as Contact;
// };

// export const updateContact = async (
//   updatedContact: Partial<Contact>
// ): Promise<Contact> => {
//   const { data } = await axios.put(
//     `http://localhost:3000/contacts/${updatedContact.id}`,
//     updatedContact
//   );
//   return data as Contact;
// };

// export const deleteContact = async (contactId: string) => {
//   await axios.delete(`http://localhost:3000/contacts/${contactId}`);
// };
