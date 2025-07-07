import UserDialog from "@/components/user-dialog";
import UsersTable from "@/components/users-table";

export default async function HomePage() {
  return (
    <div className='flex flex-col gap-4 max-w-7xl mx-auto p-4 md:p-24'>
      <h1 className='text-center font-bold text-2xl'>Users</h1>

      <UserDialog />
      <UsersTable />
    </div>
  );
}

