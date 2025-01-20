import { FaAddressBook } from "react-icons/fa";

function ContactsListPage() {
  return (
    <div className="flex bg-white w-full">
      <div className="flex flex-row p-4 bg-white text-gray-400 justify-center">
        <FaAddressBook className="text-2xl text-gray-400" />
        <span>Select Contact to see the data or create one...</span>
      </div>
    </div>
  );
}

export default ContactsListPage;
