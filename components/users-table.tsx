import { memo } from "react";
import { getUsers } from "@/server/users";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import EditUserButton from "./edit-user-button";
import DeleteUserButton from "./delete-user-button";

const UserTable = async () => {
  const users = await getUsers();

  return (
    <Table>
      <TableCaption>A list of all the registered users.</TableCaption>

      <TableHeader>
        <TableRow>
          <TableHead className='w-[100px]'>Email</TableHead>
          <TableHead>Username</TableHead>
          <TableHead>Created At</TableHead>
          <TableHead className='text-center'>Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {users?.map((user) => (
          <TableRow key={user.id}>
            <TableCell className='font-medium'>{user.email}</TableCell>
            <TableCell>{user.username}</TableCell>
            <TableCell>{user.createdAt?.toLocaleString()}</TableCell>
            <TableCell className='text-center'>
              <EditUserButton user={user} />
              <DeleteUserButton userId={user.id} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

UserTable.displayName = "UserTable";

export default memo(UserTable);
