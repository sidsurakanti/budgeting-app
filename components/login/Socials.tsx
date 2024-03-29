"use client";

import { GoogleLogo, GithubLogo } from "@components/ui/icons";
import { Button } from "@components/ui/button";

// for future use
export function Socials() {
  return (
    <>
      <span className="flex items-center w-full gap-2">
        <Button variant="outline" size="lg" className="w-full">
          <GoogleLogo className="h-5 w-5" />
        </Button>
        <Button variant="outline" size="lg" className="w-full">
          <GithubLogo className="h-5 w-5" />
        </Button>
      </span>
    </>
  );
}
