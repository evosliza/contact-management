import { useState } from "react";
import { useContacts } from "../api/contacts";
import ContactCard from "../components/ContactCard";
import Sidebar from "../components/Sidebar";
import { Contact } from "../types";

function ContactsListPage() {
  const { data, isFetching } = useContacts();

  const contacts = data || [];
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  const handleContactSelect = (contact: Contact) => {
    setSelectedContact(contact);
  };

  if (isFetching) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }

  return (
    <div className="flex h-screen bg-white w-full">
      <Sidebar contacts={contacts} onSelectContact={handleContactSelect} />
      <div className="flex-1 p-4 bg-white">
        {selectedContact ? (
          <ContactCard
            contact={selectedContact}
            onSelect={() => console.log("selected")}
          />
        ) : (
          <div className="text-center text-gray-500">
            Select a contact to see details
          </div>
        )}
      </div>
    </div>
  );
}

export default ContactsListPage;
