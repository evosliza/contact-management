import { Contact } from "../types";

interface ContactCardProps {
  contact: Contact;
  onSelect: (contact: Contact) => void;
}

const ContactCard: React.FC<ContactCardProps> = ({ contact, onSelect }) => {
  return (
    <div
      className="flex
      items-center
      p-4
      border
      rounded
      cursor-pointer
      hover:bg-gray-100
      max-w-80"
      onClick={() => onSelect(contact)}
    >
      <img
        src={contact.profilePicture}
        alt={contact.name}
        className="w-20 h-20 rounded-full mr-4"
      />
      <div>
        <h3 className="font-semibold text-gray-600">{contact.name}</h3>
        <p className="text-sm text-gray-600">@{contact.userName}</p>
        <p className="text-sm text-gray-500">{contact.description}</p>
        <div className="flex mt-2">
          <button className="bg-white text-blue-500 px-2 py-1 border-blue-500 rounded mr-2 text-xs">
            Edit
          </button>
          <button className="bg-white text-red-500 border-red-500 px-2 py-1 rounded text-xs">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactCard;
