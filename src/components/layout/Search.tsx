"use client";
import React, { useState, useEffect, FormEvent, useCallback } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const Search = () => {
  const [keyword, setKeyword] = useState("");
  const router = useRouter();

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    search();
  };
  const search = useCallback(() => {
    if (keyword) {
      router.push(`/?keyword=${keyword}`);
    } else {
      router.push("/");
    }
  }, [keyword, router]);
  useEffect(() => {
    search();
  }, [search]);
  return (
    <form
      onSubmit={handleSearch}
      className="flex flex-nowrap items-center w-full order-last md:order-none mt-5 md:mt-0 md:w-2/4 lg:w-2/4"
    >
      <input
        className="flex-grow appearance-none border border-gray-200 bg-gray-100 rounded-md mr-2 py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400"
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Enter your keyword"
      />
      <button
        // onClick={handleSearch}
        type="submit"
        className="px-4 py-2 inline-block text-white border border-transparent bg-blue-600 rounded-md hover:bg-blue-700"
      >
        Search
      </button>
    </form>
  );
};

export default Search;
