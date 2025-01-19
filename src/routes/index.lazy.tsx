import { createLazyFileRoute } from "@tanstack/react-router";
import ContactsListPage from "../pages/ContactsListPage";

export const Route = createLazyFileRoute("/")({
  component: ContactsListPage,
});
