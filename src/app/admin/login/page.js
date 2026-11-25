import Image from "next/image";
import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/auth";
import { images } from "@/data/images";
import LoginForm from "@/components/admin/LoginForm";

export const metadata = { title: "Admin login", robots: { index: false, follow: false } };

export default async function LoginPage() {
  if (await isAdmin()) redirect("/admin");
  return (
    <div className="relative isolate flex min-h-screen items-center justify-center bg-[#14284b] px-5 py-10">
      <Image src={images.hero} alt="" fill priority sizes="100vw" className="-z-10 object-cover" />
      <div className="absolute inset-0 -z-10 bg-[#14284b]/65" />
      <LoginForm />
    </div>
  );
}
