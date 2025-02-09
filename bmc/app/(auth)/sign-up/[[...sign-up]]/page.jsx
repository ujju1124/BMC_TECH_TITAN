import { SignUp } from "@clerk/nextjs";

export const WrapperLayout = ({ children }) => {
  return (
    <div className="min-h-screen w-screen flex justify-center items-center">
      {children}
    </div>
  );
};

export default function Page() {
  return (
    <WrapperLayout>
      <SignUp />
    </WrapperLayout>
  );
}
