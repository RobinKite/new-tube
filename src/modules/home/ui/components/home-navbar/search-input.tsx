"use client";

import { SearchIcon, XIcon } from "lucide-react";
import { Route } from "next";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";

import { APP_URL } from "@/constants";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export const SearchInput = () => {
  return (
    <Suspense fallback={<Skeleton className="h-10 w-full" />}>
      <SearchInputSuspense />
    </Suspense>
  );
};

const SearchInputSuspense = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const query = searchParams.get("query") || "";
  const categoryId = searchParams.get("categoryId") || "";

  const [value, setValue] = useState(query);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const url = new URL("/search", APP_URL);
    const newQuery = value.trim();

    url.searchParams.set("query", encodeURIComponent(newQuery));

    if (categoryId) url.searchParams.set("categoryId", categoryId);

    if (newQuery === "") url.searchParams.delete("query");

    setValue(newQuery);
    router.push(url.toString() as Route);
  };

  return (
    <form
      className="flex w-full max-w-[600px]"
      onSubmit={handleSearch}>
      <div className="relative w-full">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          type="text"
          placeholder="Search"
          className="w-full rounded-l-full border py-2 pl-4 pr-12 focus:border-blue-500 focus:outline-none"
        />
        {value && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => setValue("")}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full">
            <XIcon className="text-gray-500" />
          </Button>
        )}
      </div>
      <button
        disabled={!value.trim()}
        type="submit"
        className="rounded-r-full border border-l-0 bg-gray-100 px-5 py-2.5 hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50">
        <SearchIcon className="size-5" />
      </button>
    </form>
  );
};
