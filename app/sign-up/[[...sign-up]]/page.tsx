import { SignUp } from "@clerk/nextjs";
import { PageLayout } from "@/components/layouts";

export default function Page() {
  return (
    <PageLayout>
      <div className="flex justify-center items-center min-h-[60vh] py-12">
        <SignUp path="/sign-up" routing="path" signInUrl="/sign-in" />
      </div>
    </PageLayout>
  );
}
