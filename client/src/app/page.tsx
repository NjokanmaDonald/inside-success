"use client";
import Image from "next/image";
import { useAuth } from "./context/authContext";

export default function Home() {
  const { user } = useAuth();
  console.log(user);
  return (
    <div className="flex flex-col items-center justify-center">
      <Image src="/logo.png" alt="logo" width={200} height={200} />
    </div>
  );
}
