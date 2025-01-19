import { createFileRoute } from "@tanstack/react-router";
import CreateContactPage from "../../pages/CreateContactPage";

export const Route = createFileRoute("/contacts/create")({
  component: CreateContactPage,
});
