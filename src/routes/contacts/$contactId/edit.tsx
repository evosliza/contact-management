import { createFileRoute } from "@tanstack/react-router";
import EditContactPage from "../../../pages/EditContactPage";

export const Route = createFileRoute("/contacts/$contactId/edit")({
  component: EditContactPage,
});
