"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import Link from "next/link";

function IdeasList() {
  const [ideas, setIdeas] = useState();
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = searchParams.get("page") || 1;
  const perPage = searchParams.get("perPage") || 10;
  const sort = searchParams.get("sort") || "published_at";

  useEffect(() => {
    const fetchIdeas = async () => {
      try {
        const res = await fetch(
          `/api/ideas?page=${page}&perPage=${perPage}&sort=${sort}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await res.json();
        setIdeas(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchIdeas();
  }, [page, perPage, sort]);

  useEffect(() => {
    console.log(ideas);
  }, [ideas]);

  const handlePerPageChange = (e) => {
    const newPerPage = e.target.value;
    const newPage = 1;
    router.push(
      `/?page=${newPage}&perPage=${newPerPage}&sort=${sort}`,
      undefined,
      { shallow: true }
    );
    setLoading(true);
  };

  const handleSortChange = (e) => {
    const newSort = e.target.value;
    const newPage = 1;
    router.push(
      `/?page=${newPage}&perPage=${perPage}&sort=${newSort}`,
      undefined,
      { shallow: true }
    );
    setLoading(true);
  };

  if (loading) {
    return (
      <div className="bg-white min-h-[50vh] flex items-center justify-center">
        <h3 className="text-center text-2xl font-semibold">Loading...</h3>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-[50vh]">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div>
            {ideas && ideas.meta && (
              <p className="">
                Showing {ideas.meta.from}-{ideas.meta.to} of {ideas.meta.total}{" "}
                results
              </p>
            )}
          </div>
          <div className="flex justify-end items-center gap-4">
            <div className="flex gap-2 items-center">
              <label htmlFor="per-page" className="text-sm">
                Show per Page:
              </label>
              <select
                id="per-page"
                name="per-page"
                value={perPage}
                onChange={handlePerPageChange}
                className="focus:ring-black border border-black h-full py-1 pl-2 pr-4 bg-transparent text-black sm:text-sm rounded-lg"
              >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
            </div>
            <div className="flex gap-2 items-center">
              <label htmlFor="sort-by" className="text-sm">
                Sort by:
              </label>
              <select
                id="sort-by"
                name="sort-by"
                value={sort}
                onChange={handleSortChange}
                className="focus:ring-black border border-black h-full py-1 pl-2 pr-4 bg-transparent text-black sm:text-sm rounded-lg"
              >
                <option value="published_at">Newest</option>
                <option value="-published_at">Oldest</option>
              </select>
            </div>
          </div>
        </div>

        {/* card list */}
        <div className="grid mt-3 grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {ideas &&
            ideas.data &&
            ideas.data.map((idea) => (
              <Link
                key={idea.id}
                href={`/ideas/${idea.slug}`}
                className="bg-white shadow-lg rounded-lg overflow-hidden drop-shadow-md hover:scale-[1.02] transform transition-all duration-300 ease-in-out"
              >
                {idea.medium_image && idea.medium_image[0] ? (
                  <Image
                    src={idea.medium_image[0].url}
                    alt="Picture of the author"
                    width={500}
                    height={500}
                    className="w-full h-48 sm:h-64 object-cover"
                    loading="lazy"
                  />
                ) : (
                  <Image
                    src="/images/banner.jpg"
                    alt="Picture of the author"
                    width={500}
                    height={500}
                    className="w-full h-48 sm:h-64 object-cover"
                    loading="lazy"
                  />
                )}
                <div className="p-6">
                  <p className="uppercase tracking-wide text-sm font-light text-gray-700">
                    7 Aug 2020
                  </p>
                  <div>
                    <p className="mt-2 text-md text-gray-700 font-semibold line-clamp-3">
                      {idea.title}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
        </div>

        {/* Button List */}
        <div className="flex justify-center items-center mt-8">
          <div className="flex gap-2">
            {ideas && ideas.meta && ideas.meta.current_page > 1 && (
              <Link
                href={`/?page=${
                  ideas.meta.current_page - 1
                }&perPage=${perPage}&sort=${sort}`}
              >
                <p className="bg-black text-white px-4 py-2 rounded-lg">
                  Previous
                </p>
              </Link>
            )}
            {ideas &&
              ideas.meta &&
              ideas.meta.current_page < ideas.meta.last_page && (
                <Link
                  href={`/?page=${
                    ideas.meta.current_page + 1
                  }&perPage=${perPage}&sort=${sort}`}
                >
                  <p className="bg-black text-white px-4 py-2 rounded-lg">
                    Next
                  </p>
                </Link>
              )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default IdeasList;
