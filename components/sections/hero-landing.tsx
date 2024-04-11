import Link from "next/link";
import { cn, nFormatter } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/shared/icons";
import { ModeToggle } from "../mode-toggle";
import { ArrowRight } from "lucide-react";

export async function HeroLanding() {
  return (
    <section className="space-y-6   py-10 sm:py-10 lg:py-10">
      <div className="container flex max-w-5xl flex-col items-center gap-5 text-center">
        {/* Want animations? Check here: https://github.com/mickasmt/next-saas-stripe-starter/blob/76eb9f2b70b29c7a734ff0e5b047796ed2dac28d/app/(marketing)/page.tsx */}
        <Link
          href="https://twitter.com/miickasmt/status/1719892161095745801"
          className={cn(
            buttonVariants({ variant: "outline", size: "sm" }),
            "px-4 rounded-full"
          )}
          target="_blank"
        >
          <span className="mr-3 ">🎉</span> Introducing support for GPT 4{" "}
          <ArrowRight className="ml-2" size={16} />
        </Link>

        <h1 className="text-balance font-urban text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-[50px]">
          The Visual Way to {""}
          <span className="text-gradient_indigo-purple font-extrabold">
            Diagram
          </span>
        </h1>

        <p
          className=" text-balance text-sm leading-normal text-muted-foreground sm:text-xl sm:leading-2"
          style={{ animationDelay: "0.35s", animationFillMode: "forwards" }}
        >
          Easily create complex diagrams from markdown-style code and
          collaborate with team members in real-time.
        </p>

        <div
          className="flex justify-center rounded-full space-x-2 md:space-x-4"
          style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}
        >
          <Link
            href="/c"
            className={cn(buttonVariants({ size: "lg" }), "gap-2 rounded-full")}
          >
            <span>Start Designing </span>
            <Icons.arrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
