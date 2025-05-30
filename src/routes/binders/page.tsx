import Table from "@/components/ui/data-display/table/Table";
import TableBody from "@/components/ui/data-display/table/TableBody";
import TableCell from "@/components/ui/data-display/table/TableCell";
import TableHeader from "@/components/ui/data-display/table/TableHeader";
import TableHead from "@/components/ui/data-display/table/TableHead";
import TableRow from "@/components/ui/data-display/table/TableRow";
import Heading from "@/components/ui/typography/heading/Heading";
import SubHeading from "@/components/ui/typography/heading/SubHeading";

import cn from "@/utilities/cn";

type User = {
  handle: string;
  name: string;
  email: string;
  role: string;
};

const users: User[] = [
  {
    handle: "johndoe",
    name: "John Doe",
    email: "john.doe@example.com",
    role: "Admin",
  },
  {
    handle: "lesliealexander",
    name: "Leslie Alexander",
    email: "leslie.alexander@example.com",
    role: "Admin",
  },
  {
    handle: "michaelfoster",
    name: "Michael Foster",
    email: "michael.foster@example.com",
    role: "Owner",
  },
]

function Example({ users }: { users: User[] }) {
  return (
    <Table striped className={cn("w-6xl [--gutter:--spacing(6)] sm:[--gutter:--spacing(8)]")}>
      <TableHead>
        <TableRow>
          <TableHeader>Name</TableHeader>
          <TableHeader>Email</TableHeader>
          <TableHeader>Role</TableHeader>
        </TableRow>
      </TableHead>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.handle}>
            <TableCell className={cn("font-medium")}>{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell className={cn("text-zinc-500")}>{user.role}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
export default function BindersPage() {
  return (
    <>
      <Heading className={cn("")}>Binders</Heading>
      <SubHeading className={cn("")}>Binders</SubHeading>
      <Example users={users} />
    </>
  )
}