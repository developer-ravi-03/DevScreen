import { Button } from "@/components/ui/button";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import Image from "next/image";

export default function Home() {
  return (
    <div className="m-10">
      <SignInButton>
        <Button className="bg-blue-500 text-white hover:bg-blue-600">
          login
        </Button>
      </SignInButton>
    </div>
  );
}
