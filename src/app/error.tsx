"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

export default function Error({ reset }: { reset: () => void }) {
  const router = useRouter();

  return (
    <div className="full center -mt-nav flex flex-col">
      <div className="flex flex-col items-center gap-8">
        <div className="flex flex-col gap-2 text-center">
          <h1 className="text-6xl font-bold text-white">
            Something went wrong
          </h1>
          <h2 className="text-zinc-300">Houston, we have a problem.</h2>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" onClick={() => router.back()}>
            Go Back
          </Button>
          <Button onClick={() => reset()}>Try again</Button>
        </div>
      </div>
    </div>
  );
}
