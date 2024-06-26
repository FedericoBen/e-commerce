"use client";
import { changeUserRole } from "@/actions/users/change-user-role";
import styles from "./TableUsers.module.scss";

interface TableUsersProps {
  users: { id: string; email: string; name: string; role: string }[];
}

const TableUsers = ({ users }: TableUsersProps) => {
  return (
    <table className={styles.table_users}>
      <tbody>
        <tr className={styles.header_table}>
          <th>Email</th>
          <th>Full Name</th>
          <th>Update</th>
        </tr>
        {users.map((user) => (
          <tr key={user.id} className={styles.row_table}>
            <td>{user.email}</td>
            <td>{user.name}</td>
            <td>
              <select
                value={user.role}
                className={styles.select_role}
                onChange={(e) => changeUserRole(user.id, e.target.value)}
              >
                <option value="admin">admin</option>
                <option value="user">user</option>
              </select>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableUsers;
