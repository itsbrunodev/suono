import { ArrowUpRightFromSquareIcon } from "lucide-react";
import Link from "next/link";

import { APP, URLS } from "@/lib/constants";

export function Navbar() {
  return (
    <nav className="sticky top-0 z-20 flex w-full items-center justify-between border-b border-b-zinc-800 bg-zinc-900/60 px-8 py-3 backdrop-blur-xl">
      <Link
        className="flex items-center gap-1 transition-opacity hover:opacity-80"
        href="/"
        prefetch={false}
      >
        <h1 className="font-semibold text-white">suono</h1>
        <p className="rounded-[4px] bg-zinc-800 px-1 py-0.5 text-xs font-light">
          v{APP.version}
        </p>
      </Link>
      <div className="flex items-center gap-6 text-sm hover:*:text-white">
        {Object.keys(URLS.navbar).map((key, i) => {
          const url = URLS.navbar[key as keyof (typeof URLS)["navbar"]];
          const external = !url.startsWith("/");

          return (
            <Link
              className="transition-colors"
              href={url}
              target={external ? "_blank" : "_self"}
              key={i}
            >
              {key}
              {external && (
                <ArrowUpRightFromSquareIcon
                  className="ml-1 inline-flex"
                  size={12}
                />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
