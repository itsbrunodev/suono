import { Suspense } from "react";

import { CountryList } from "@/components/country/list";
import { CountrySearch } from "@/components/country/search";

export default function Page() {
  return (
    <div className="flex flex-col gap-8 p-8">
      <Suspense fallback="Loading...">
        <CountrySearch />
        <CountryList />
      </Suspense>
    </div>
  );
}
