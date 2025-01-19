import { useState } from "react";
import { useContacts } from "../api/contacts";
import ContactCard from "../components/ContactCard";
import Sidebar from "../components/Sidebar";
import { Contact } from "../types";
import ContactCreateForm from "../components/ContactCreateForm";

function ContactsListPage() {
  const { data, isFetching, refetch } = useContacts();

  const contacts = data || [];
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const handleContactSelect = (contact: Contact) => {
    setSelectedContact(contact);
    setIsCreating(false);
  };

  const handleCreateNewContact = () => {
    setSelectedContact(null);
    setIsCreating(true);
  };

  const handleContactCreate = async (newContact: Contact) => {
    refetch();
    setSelectedContact(newContact);
    setIsCreating(false);
  };

  const handleContactEdit = (contact: Contact) => {
    setSelectedContact(contact);
    setIsCreating(true);
  };

  if (isFetching) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }

  return (
    <div className="flex h-screen bg-white w-full">
      <Sidebar
        contacts={contacts}
        onSelectContact={handleContactSelect}
        onAddContact={handleCreateNewContact}
      />
      <div className="flex-1 p-4 bg-white">
        {isCreating ? (
          <ContactCreateForm
            onFormClose={handleContactCreate}
            contact={selectedContact}
          />
        ) : selectedContact ? (
          <ContactCard
            contact={selectedContact}
            onSelect={() => console.log("selected")}
            onEdit={handleContactEdit}
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
