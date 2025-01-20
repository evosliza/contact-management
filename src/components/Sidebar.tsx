import { FC, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "@tanstack/react-router";
import { Route } from "../routes/__root";
import { useContacts } from "../api/contacts";

const Sidebar: FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { data: contacts, error } = useContacts({ name_like: searchTerm });

  const { contactId = "" }: { contactId?: string } = Route.useParams();

  if (error) {
    return <div>Error loading contacts</div>;
  }

  return (
    <div className="w-96 bg-gray-200 p-4">
      <div className="flex items-center mb-4 relative">
        <input
          type="text"
          placeholder="Search contacts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-bar
          flex-grow
          p-2
          pl-10
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
        <FaSearch className="absolute left-3 text-gray-400" />

        <Link to="/contacts/create" className="ml-auto">
          <button className="mx-2 p-2 bg-white text-blue-500 border-blue-500 rounded">
            New
          </button>
        </Link>
      </div>

      <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-400 -mx-4" />

      <ul className="contact-list">
        {contacts?.length === 0 && (
          <li className="text-gray-600">No contacts found</li>
        )}
        {contacts?.map((contact) => (
          <Link
            to="/contacts/$contactId"
            params={{ contactId: contact.id }}
            key={contact?.id}
            className="ml-auto"
          >
            <li
              className={`contact-item p-2 cursor-pointer rounded ${
                contactId && contactId === contact.id
                  ? "bg-blue-500 text-white"
                  : "text-black hover:bg-gray-300"
              }`}
            >
              {contact.name}
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
