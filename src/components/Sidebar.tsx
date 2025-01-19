import { FC, useState } from "react";
import { Contact } from "../types";

interface SidebarProps {
  contacts: Contact[];
  onSelectContact: (contact: Contact) => void;
  onAddContact: () => void;
}

const Sidebar: FC<SidebarProps> = ({
  contacts,
  onSelectContact,
  onAddContact,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectContact = (contact: Contact) => {
    setSelectedContact(contact);
    onSelectContact(contact);
  };

  return (
    <div className="w-72 bg-gray-200 p-4">
      <div className="flex items-center mb-4">
        <input
          type="text"
          placeholder="Search contacts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-bar
          flex-grow
          p-2
          border
          border-gray-300
          rounded
          bg-white
          outline-none
          focus:ring-2
          focus:ring-blue-500
          text-gray-600
          "
        />
        <button
          onClick={onAddContact}
          className="mx-2 p-2 bg-white text-blue-500 border-blue-500 rounded"
        >
          New
        </button>
      </div>

      <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-400 -mx-4" />

      <ul className="contact-list">
        {filteredContacts.map((contact) => (
          <li
            key={contact.id}
            onClick={() => handleSelectContact(contact)}
            className={`contact-item p-2 cursor-pointer rounded ${
              selectedContact?.id === contact.id
                ? "bg-blue-500 text-white"
                : "text-black hover:bg-gray-300"
            }`}
          >
            {contact.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
