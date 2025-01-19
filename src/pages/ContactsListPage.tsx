import { FaAddressBook } from "react-icons/fa";

function ContactsListPage() {
  return (
    <div className="flex bg-white w-full">
      <div className="flex flex-row p-4 bg-white text-gray-400 justify-center">
        <FaAddressBook className="text-6xl text-gray-400" />
        <span>Select Contact to see the data...</span>
      </div>
    </div>
  );
}

export default ContactsListPage;
