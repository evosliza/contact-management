import { createFileRoute } from "@tanstack/react-router";
import ContactsListPage from "../../pages/ContactsListPage";

export const Route = createFileRoute("/contacts/")({
  component: ContactsListPage,
});
