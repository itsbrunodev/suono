import { Globe2Icon } from "lucide-react";
import Image from "next/image";

import { cn } from "@/lib/utils";

export function CountryFlag({
  className,
  countryName,
  countryCode,
}: {
  className?: string;
  countryName: string;
  countryCode: string | boolean;
}) {
  return (
    <div
      className={cn(
        "relative w-16 overflow-hidden rounded-md *:aspect-[3/2] sm:w-20",
        className
      )}
    >
      {countryName === "Global" ? (
        <div className="center flex w-[inherit] rounded-[inherit] bg-primary-800">
          <Globe2Icon className="full h-[70%] text-white" />
        </div>
      ) : (
        /**
         * Scaling by 101% is needed because some flags
         * have a little white space beneath them.
         */
        <Image
          className="h-full w-[inherit] scale-[1.01] rounded-[inherit] bg-zinc-800/60 object-cover text-xs text-zinc-300"
          src={`https://catamphetamine.gitlab.io/country-flag-icons/3x2/${countryCode}.svg`}
          alt={countryName}
          width={256}
          height={192}
          draggable={false}
          priority
        />
      )}
    </div>
  );
}
