import { SignIn } from "@clerk/nextjs";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function Page() {
  return (
    <div className="min-h-screen flex">
      {/* Left Panel: Auth Form */}
      <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:px-20 xl:px-24 bg-white dark:bg-slate-950 relative">
        <div className="absolute top-8 left-8">
          <Link href="/" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </div>
        <div className="mx-auto w-full max-w-sm lg:w-96 flex flex-col items-center">
          <div className="w-12 h-12 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold text-xl mb-8 shadow-sm">
            CC
          </div>
          <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" />
        </div>
      </div>

      {/* Right Panel: Feature Graphic */}
      <div className="hidden lg:block relative w-0 flex-1 bg-slate-900">
        <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/a/ae/Spring_Fest_IIT_Kharagpur_-_Jim_Ankan_Deka_photography.jpg')] bg-cover bg-center opacity-40 mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/90 via-slate-900/95 to-purple-900/90" />
        
        <div className="absolute inset-0 flex flex-col justify-center px-12 xl:px-24">
          <h2 className="text-4xl xl:text-5xl font-black text-white tracking-tight mb-6 leading-tight">
            Connect, Explore,<br/>
            <span className="text-indigo-400">Thrive on Campus.</span>
          </h2>
          <p className="text-lg text-slate-300 font-medium max-w-lg">
            Join the ultimate platform for discovering events, connecting with peers, and making the most out of your college life.
          </p>
          
          <div className="mt-12 grid grid-cols-2 gap-8">
            <div>
              <div className="text-3xl font-black text-white">100+</div>
              <div className="text-sm font-medium text-indigo-300 mt-1">Events Every Month</div>
            </div>
            <div>
              <div className="text-3xl font-black text-white">15k+</div>
              <div className="text-sm font-medium text-indigo-300 mt-1">Active Students</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
