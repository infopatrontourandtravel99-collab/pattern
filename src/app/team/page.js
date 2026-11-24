import { redirect } from "next/navigation";

// The team now lives on the About Us page.
export default function TeamRedirect() {
  redirect("/about#team");
}
