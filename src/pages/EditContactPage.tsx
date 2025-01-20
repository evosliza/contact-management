import { useNavigate } from "@tanstack/react-router";
import { useContact } from "../api/contacts";
import { Route } from "../routes/contacts/$contactId/edit";
import { Contact } from "../types";
import ContactForm from "../components/ContactForm";

function EditContactPage() {
  const { contactId } = Route.useParams();
  const { data: contact } = useContact(contactId);

  const navigate = useNavigate({ from: "/contacts/$contactId" });

  const handleUpdateFormSubmit = async (newContact: Contact | null) => {
    if (!newContact) {
      return;
    }

    navigate({
      to: "/contacts/$contactId",
      params: { contactId: newContact.id as string },
    });
  };

  return (
    <ContactForm contact={contact} onFormSubmit={handleUpdateFormSubmit} />
  );
}

export default EditContactPage;
