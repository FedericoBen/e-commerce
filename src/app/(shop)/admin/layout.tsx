import { auth } from "@/auth.config";
import { ROUTES } from "@/common/routes";
import { redirect } from "next/navigation";
export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) redirect(ROUTES.LOGIN);
  if(session.user.role !== 'admin') redirect(ROUTES.ROOT);

  return <>{children}</>;
}
