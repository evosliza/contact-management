import { useNavigate } from "@tanstack/react-router";
import ContactForm from "../components/ContactForm";
import { Contact } from "../types";

function CreateContactPage() {
  const navigate = useNavigate({ from: "/contacts/$contactId" });

  const handleCreateFormSubmit = async (newContact: Contact | null) => {
    if (!newContact) {
      return;
    }

    navigate({
      to: "/contacts/$contactId",
      params: { contactId: newContact.id as string },
    });
  };

  return <ContactForm onFormSubmit={handleCreateFormSubmit} />;
}

export default CreateContactPage;
