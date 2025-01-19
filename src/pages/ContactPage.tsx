import { deleteContact, useContact, useContacts } from "../api/contacts";
import ContactCard from "../components/ContactCard";
import { Route } from "../routes/contacts/$contactId";
import { useState } from "react";
import ConfirmationModal from "../components/ConfirmationModal"; // Assuming you have a ConfirmationModal component
import { Contact } from "../types";
import { useNavigate } from "@tanstack/react-router";

function ContactPage() {
  const { contactId } = Route.useParams();
  const { data: contact } = useContact(contactId);
  const { refetch } = useContacts();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [contactToDelete, setContactToDelete] = useState<Contact | null>(null);

  const handleDelete = (contact: Contact) => {
    setContactToDelete(contact);
    setIsModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!contactToDelete) {
      return;
    }
    await deleteContact(contactToDelete?.id);
    setIsModalOpen(false);
    refetch();
    navigate({
      to: "/contacts",
    });
  };

  return (
    <div className="p-4 h-full w-full flex items-start bg-white">
      <ContactCard contact={contact} onDelete={handleDelete} />
      {isModalOpen && (
        <ConfirmationModal
          message="Are you sure you want to delete this contact?"
          onConfirm={confirmDelete}
          onCancel={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}

export default ContactPage;
