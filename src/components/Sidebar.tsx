import { FC, useState } from "react";
import { Contact } from "../types";

interface SidebarProps {
  contacts: Contact[];
  onSelectContact: (contact: Contact) => void;
}

const Sidebar: FC<SidebarProps> = ({ contacts, onSelectContact }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="sidebar">
      <input
        type="text"
        placeholder="Search contacts..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-bar"
      />
      <ul className="contact-list">
        {filteredContacts.map((contact) => (
          <li
            key={contact.id}
            onClick={() => onSelectContact(contact)}
            className="contact-item"
          >
            {contact.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
