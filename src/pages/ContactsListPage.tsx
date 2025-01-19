import { useState } from "react";
import { deleteContact, useContacts } from "../api/contacts";
import ContactCard from "../components/ContactCard";
import Sidebar from "../components/Sidebar";
import { Contact } from "../types";
import ContactCreateForm from "../components/ContactCreateForm";
import ConfirmationModal from "../components/ConfirmationModal";

function ContactsListPage() {
  const { data, isFetching, refetch } = useContacts();

  const contacts = data || [];
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [contactToDelete, setContactToDelete] = useState<Contact | null>(null);

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

  const handleContactDelete = async (contact: Contact) => {
    setContactToDelete(contact);
    setIsModalOpen(true);
  };

  const confirmDelete = async () => {
    if (contactToDelete) {
      await deleteContact(contactToDelete.id);
      refetch();
      setSelectedContact(null);
      setIsModalOpen(false);
      setContactToDelete(null);
    }
  };

  const cancelDelete = () => {
    setIsModalOpen(false);
    setContactToDelete(null);
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
            onEdit={handleContactEdit}
            onDelete={handleContactDelete}
          />
        ) : (
          <div className="text-center text-gray-500">
            Select a contact to see details
          </div>
        )}
      </div>
      {isModalOpen && (
        <ConfirmationModal
          message="Are you sure you want to delete this contact?"
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
    </div>
  );
}

export default ContactsListPage;
