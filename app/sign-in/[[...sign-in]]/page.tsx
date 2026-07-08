import { SignIn } from "@clerk/nextjs";
import { PageLayout } from "@/components/layouts";

export default function Page() {
  return (
    <PageLayout>
      <div className="flex justify-center items-center min-h-[60vh] py-12">
        <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" />
      </div>
    </PageLayout>
  );
}
