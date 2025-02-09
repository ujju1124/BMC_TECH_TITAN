import { SignIn } from "@clerk/nextjs";
import { WrapperLayout } from "../../sign-up/[[...sign-up]]/page";

export default function Page() {
  return (
    <WrapperLayout>
      <SignIn />
    </WrapperLayout>
  );
}
