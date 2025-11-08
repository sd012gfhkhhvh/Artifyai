"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { CldImage } from "next-cloudinary";

import {
  Pagination,
  PaginationContent,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { transformationTypes } from "@/constants";

import { formUrlQuery } from "@/lib/utils";

import { Button } from "../ui/button";

import { Search } from "./Search";

export const Collection = ({
  hasSearch = false,
  images,
  totalPages = 1,
  page,
}: {
  images: any[];
  totalPages?: number;
  page: number;
  hasSearch?: boolean;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [allImages, setAllImages] = useState<any[]>(images);
  const [isLoading, setIsLoading] = useState(false);

  // Update allImages when new images come in
  useEffect(() => {
    setAllImages((prev) => {
      // If page is 1, replace all images
      if (page === 1) return images;

      // Otherwise, merge new images, avoiding duplicates
      const existingIds = new Set(prev.map((img) => img.id));
      const newImages = images.filter((img) => !existingIds.has(img.id));
      return [...prev, ...newImages];
    });
    setIsLoading(false);
  }, [images, page]);

  const onPageChange = useCallback(
    (action: "next" | "prev") => {
      if (isLoading) return;

      const pageValue = action === "next" ? Number(page) + 1 : Number(page) - 1;

      setIsLoading(true);

      const newUrl = formUrlQuery({
        searchParams: searchParams.toString(),
        key: "page",
        value: pageValue,
      });

      router.push(newUrl, { scroll: false });
    },
    [page, router, searchParams, isLoading]
  );

  return (
    <>
      <header className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="space-y-3">
          <span className="text-xs uppercase tracking-[0.35em] text-white/60">
            Live gallery
          </span>
          <p className="max-w-2xl text-sm leading-6 text-white/60">
            Scroll through the freshest AI-powered transformations in a
            continuous feed.
          </p>
        </div>
        {hasSearch && (
          <div className="w-full max-w-md">
            <Search />
          </div>
        )}
      </header>

      {allImages.length > 0 || isLoading ? (
        <>
          <ul className="mt-8 grid auto-rows-[1fr] gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {allImages.map((image) => (
              <Card image={image} key={image.id} />
            ))}
            {isLoading && <SkeletonCards count={6} />}
          </ul>

          <AutoScrollLoader
            page={page}
            totalPages={totalPages}
            onLoadMore={() => onPageChange("next")}
            isLoading={isLoading}
          />
        </>
      ) : (
        <div className="mt-14 flex flex-col items-center justify-center gap-4 rounded-2xl border border-white/10 bg-white/[0.04] py-24 text-center shadow-[0_25px_80px_-45px_rgba(15,23,42,0.95)]">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/[0.06] text-white/70">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 005.25 21h2.25M3 16.5A2.25 2.25 0 015.25 14H7.5M3 16.5l3.32-3.32a1.5 1.5 0 012.12 0L12 16.5M12 16.5l2.56-2.56a1.5 1.5 0 012.12 0L21 18.24M12 16.5l9-9M21 9V5.25A2.25 2.25 0 0018.75 3H15"
              />
            </svg>
          </div>
          <div className="space-y-1">
            <p className="text-lg font-semibold text-white/90">No edits yet</p>
            <p className="text-sm text-white/60">
              Create your first transformation to populate this collection.
            </p>
          </div>
        </div>
      )}
    </>
  );
};

const SkeletonCards = ({ count }: { count: number }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <li key={`skeleton-${index}`} className="group">
          <div className="relative block overflow-hidden rounded-lg shadow-md aspect-[4/3] bg-white/[0.04] animate-pulse">
            <div className="absolute inset-0 bg-gradient-to-t from-white/10 via-white/5 to-white/5" />
            <div className="absolute top-4 right-4 h-8 w-24 rounded-full bg-white/10" />
            <div className="absolute bottom-6 left-6 right-6 space-y-3">
              <div className="h-6 w-3/4 rounded bg-white/10" />
              <div className="h-4 w-1/2 rounded bg-white/10" />
            </div>
          </div>
        </li>
      ))}
    </>
  );
};

const Card = ({ image }: { image: any }) => {
  return (
    <li className="group">
      <Link
        href={`/transformations/${image.id}`}
        className="relative block overflow-hidden rounded-lg shadow-md transition-all duration-500 hover:shadow-2xl aspect-[4/3]"
      >
        <CldImage
          src={image.publicId}
          alt={image.title}
          width={image.width}
          height={image.height}
          {...image.config}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 33vw"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20 transition-all duration-500 group-hover:from-black/90 group-hover:via-black/60 group-hover:to-black/30" />

        <div className="absolute top-4 right-4 flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 backdrop-blur-md">
          <Image
            src={`/assets/icons/${
              transformationTypes[
                image.transformationType as TransformationTypeKey
              ].icon
            }`}
            alt={image.title}
            width={16}
            height={16}
            className="opacity-90"
          />
          <span className="text-xs font-medium text-white/90">
            {
              transformationTypes[
                image.transformationType as TransformationTypeKey
              ].title
            }
          </span>
        </div>

        <div className="absolute bottom-0 left-0 right-0 translate-y-2 space-y-3 p-6 transition-transform duration-500 group-hover:translate-y-0">
          <h3 className="line-clamp-2 text-xl font-bold text-white drop-shadow-lg">
            {image.title}
          </h3>

          <div className="flex items-center gap-2 text-sm text-white/90 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
            <span className="font-semibold">View Transformation</span>
            <svg
              className="h-4 w-4 transform transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </div>
        </div>

        <div className="absolute inset-0 rounded-lg ring-1 ring-white/10 transition-all duration-500 group-hover:ring-2 group-hover:ring-purple-500/60" />
      </Link>
    </li>
  );
};

type AutoScrollLoaderProps = {
  page: number;
  totalPages: number;
  onLoadMore: () => void;
  isLoading: boolean;
};

const AutoScrollLoader = ({
  page,
  totalPages,
  onLoadMore,
  isLoading,
}: AutoScrollLoaderProps) => {
  const loaderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (page >= totalPages || isLoading) return;

    const node = loaderRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting && !isLoading && page < totalPages) {
          onLoadMore();
        }
      },
      { rootMargin: "0px 0px 400px 0px", threshold: 0.1 }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [page, totalPages, onLoadMore, isLoading]);

  if (page >= totalPages) {
    return (
      <div className="mt-10 flex justify-center py-6">
        <span className="text-sm text-white/40">
          You&apos;ve reached the end.
        </span>
      </div>
    );
  }

  return (
    <div ref={loaderRef} className="mt-10 flex justify-center py-6">
      <div className="flex items-center gap-2 text-sm text-white/60">
        <span className="inline-flex h-2 w-2 animate-ping rounded-full bg-white/60" />
        <span>Loading more transformations…</span>
      </div>
    </div>
  );
};
