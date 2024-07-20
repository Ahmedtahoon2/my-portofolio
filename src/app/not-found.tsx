import Link from "@/components/atoms/Link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 | Ahmed Tahoon",
  description: "Uh oh! This page does not exist",
};

const Custom404 = () => (
  <section className="container flex flex-1 flex-col items-center justify-center gap-4">
    <h1 className="text-3xl">404 - Page not found</h1>
    <p className="text-muted-foreground text-xl">
      Uh oh! This page does not exists, maybe you clicked an old link or
      misspelled. Please try again…
    </p>
    <div className="h-2" />
    <Link href="/" underline>
      Return home
    </Link>
  </section>
);

export default Custom404;
