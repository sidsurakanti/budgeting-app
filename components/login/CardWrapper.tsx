"use client";

import Link from "next/link";

import {
  Card,
  CardHeader,
  CardDescription,
  CardTitle,
  CardContent,
  CardFooter,
} from "@components/ui/card";
import { Socials } from "@components/login/Socials";
import { Button } from "@components/ui/button";
import { BackArrow } from "@components/ui/icons";

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  backButtonLabel?: string;
  backButtonHref?: string;
  description?: string;
  showSocial?: boolean;
  showBackIcon?: boolean;
}

export function CardWrapper({
  children,
  headerLabel,
  backButtonLabel,
  backButtonHref,
  description,
  showSocial,
  showBackIcon,
}: CardWrapperProps) {
  return (
    <>
      <Card className="w-[325px] lg:w-[400px] xl:w-[450px] shadow-md">
        <CardHeader>
          <CardTitle className="text-xl">{headerLabel}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>

        <CardContent>{children}</CardContent>

        {showSocial && (
          <CardFooter>
            <Socials />
          </CardFooter>
        )}

        {backButtonHref && (
          <CardFooter>
            <Button variant="link" className="w-full" asChild>
              <Link
                className="text-secondary-foreground/70"
                href={backButtonHref}
              >
                {showBackIcon && <BackArrow />}
                {backButtonLabel}
              </Link>
            </Button>
          </CardFooter>
        )}
      </Card>
    </>
  );
}
