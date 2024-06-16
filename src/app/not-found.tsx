import Link from "@/components/atoms/Link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 | Ahmed Tahoon",
  description: "Uh oh! This page does not exist",
};

export default function NotFound() {
  return (
    <section className="flex flex-1 flex-col items-center justify-center text-center md:flex-row md:space-x-6">
      <div className="space-x-2 pb-8 pt-6 md:space-y-5">
        <h1 className="md:leading-14 text-6xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 md:border-r-2 md:px-6 md:text-8xl">
          404
        </h1>
      </div>
      <div className="max-w-md">
        <p className="mb-4 text-xl font-bold leading-normal md:text-2xl">
          Sorry we couldn&apos;t find this page.
        </p>
        <p className="mb-8">
          But don&apos;t worry, you can find plenty of other things on our
          homepage.
        </p>
        <Link
          href="/"
          className="focus:shadow-outline-black inline rounded-lg border border-transparent bg-white px-4 py-2 text-sm font-medium leading-5 text-black shadow transition-colors duration-150 hover:bg-gray-200 focus:outline-none dark:hover:bg-gray-300"
        >
          Back to homepage
        </Link>
      </div>
    </section>
  );
}
