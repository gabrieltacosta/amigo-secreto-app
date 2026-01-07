import { redirect } from "next/navigation";

export default function GroupsPage() {
  // Redirect to the new group route; replace with list view later if needed
  redirect("/dashboard/groups/new");
}
