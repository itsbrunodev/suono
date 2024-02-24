"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

export default function Page() {
  const router = useRouter();

  return (
    <div className="full center flex flex-col -mt-nav">
      <div className="flex flex-col items-center gap-8">
        <div className="flex flex-col gap-2 text-center">
          <h1 className="text-6xl font-bold text-white">Not Found</h1>
          <h2 className="text-zinc-300">
            We couldn't find the page you're looking for.
          </h2>
        </div>
        <div className="flex gap-4">
          <Button variant="secondary" onClick={() => router.back()}>
            Go Back
          </Button>
          <Button onClick={() => router.push("/")}>Home</Button>
        </div>
      </div>
    </div>
  );
}
