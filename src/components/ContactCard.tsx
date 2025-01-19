import { Contact } from "../types";

interface ContactCardProps {
  contact: Contact;
  onSelect: (contact: Contact) => void;
}

const ContactCard: React.FC<ContactCardProps> = ({ contact, onSelect }) => {
  return (
    <div
      className="flex items-center p-4 border-b cursor-pointer hover:bg-gray-100"
      onClick={() => onSelect(contact)}
    >
      <img
        src={contact.profilePicture}
        alt={contact.name}
        className="w-12 h-12 rounded-full mr-4"
      />
      <div>
        <h3 className="font-semibold">{contact.name}</h3>
        <p className="text-sm text-gray-600">@{contact.userName}</p>
        <p className="text-sm text-gray-500">{contact.description}</p>
      </div>
    </div>
  );
};

export default ContactCard;
