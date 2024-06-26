import { auth } from '@/auth.config';
import { ROUTES } from '@/common/routes';
import { redirect } from 'next/navigation';
export default async function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth()

  if(!session?.user) redirect(ROUTES.LOGIN)

  return <>{children}</>;
}
