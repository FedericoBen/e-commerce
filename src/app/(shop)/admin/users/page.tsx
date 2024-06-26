import styles from "./AdminUsers.module.scss";
import Title from "@/components/ui/basics/Title/Title";
import TableUsers from "@/components/admin/table-users/TableUsers";
import { getPaginatedUsers } from "@/actions/users/get-paginated-users";

export default async function AdminUsersPage() {
  const { users } = await getPaginatedUsers();

  return (
    <div className={styles.container_page}>
      <Title title="Admin users" />
      <TableUsers
        users={
          users?.map(({ name, id, email, role }) => ({
            name,
            id,
            email,
            role,
          })) || []
        }
      />
    </div>
  );
}
