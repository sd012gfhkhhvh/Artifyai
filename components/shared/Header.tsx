"use client";
import React from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const Header = ({
  title,
  subtitle,
  imageId = null,
}: {
  title: string;
  subtitle?: string;
  imageId?: string | null;
}) => {
  const router = useRouter();
  const onUpdateCancelHandler = () => {
    router.push(`/transformations/${imageId}`);
  };
  return (
    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
      <div className="flex-1">
        <h2 className="text-3xl md:text-[40px] font-semibold tracking-tight text-foreground">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-3 text-base text-muted-foreground leading-relaxed max-w-2xl">
            {subtitle}
          </p>
        )}
      </div>
      {imageId && (
        <Button
          type="button"
          className="rounded-full border border-border bg-transparent px-6 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-muted focus-visible:ring-1 focus-visible:ring-ring"
          onClick={onUpdateCancelHandler}
        >
          Cancel Update
        </Button>
      )}
    </div>
  );
};

export default Header;
