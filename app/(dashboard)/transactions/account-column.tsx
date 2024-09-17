import { useEditAccount } from "@/modules/account/hooks/use-edit-account";

export const AccountColumn = ({ account }: { account: any }) => {
  const { onOpen } = useEditAccount();

  const onClick = () => {
    onOpen(account);
  };

  return (
    <div
      onClick={onClick}
      className="flex items-center cursor-pointer hover:underline"
    >
      {account.name}
    </div>
  );
};
