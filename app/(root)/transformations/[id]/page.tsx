import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";

import Header from "@/components/shared/Header";
import TransformedImage from "@/components/shared/TransformedImage";
import { Button } from "@/components/ui/button";
import { getImageById } from "@/lib/actions/image.action";
import { getImageSize } from "@/lib/utils";
import { DeleteConfirmation } from "@/components/shared/DeletConfirmation";

const ImageDetails = async ({ params: { id } }: SearchParamProps) => {
  const { userId } = auth();

  const image = await getImageById(id);

  console.log(image);
  const createdOn = image?.createdAt
    ? new Date(image.createdAt).toLocaleDateString()
    : "Recently generated";
  const displayWidth = getImageSize(image.transformationType, image, "width");
  const displayHeight = getImageSize(image.transformationType, image, "height");
  const authorName = image?.author
    ? `${image.author.firstName ?? ""} ${image.author.lastName ?? ""}`.trim() ||
      image.author.username ||
      "Artify creator"
    : "Artify creator";
  const authorHandle = image?.author?.username || "artify-user";
  const metadataChips = [
    { label: "Type", value: image.transformationType },
    { label: "Aspect", value: image.aspectRatio },
    { label: "Palette", value: image.color },
  ].filter((chip) => Boolean(chip.value));
  const promptPreview =
    image.prompt ||
    "Refine and remix visuals instantly with Artify's creative pipeline.";

  return (
    <div className="space-y-8">
      {/* Hero and Attribution */}
      <section className="relative overflow-hidden rounded-3xl border border-border bg-card shadow-lg">
        <div
          className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-indigo-500/10 dark:from-blue-500/10 dark:via-transparent dark:to-indigo-500/10"
          aria-hidden
        />
        <div
          className="absolute inset-y-0 right-10 hidden lg:block w-px bg-gradient-to-b from-transparent via-white/30 to-transparent dark:via-white/10"
          aria-hidden
        />
        <div className="relative grid gap-8 p-6 lg:p-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-6">
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-muted-foreground">
                Transformation overview
              </p>
              <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
                {image.title}
              </h2>
              <p className="text-base text-muted-foreground leading-relaxed max-w-2xl">
                {promptPreview}
              </p>
            </div>
            {metadataChips.length > 0 && (
              <div className="flex flex-wrap gap-3">
                {metadataChips.map((chip) => (
                  <span
                    key={chip.label}
                    className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/60 px-4 py-2 shadow-sm"
                  >
                    <span className="text-[10px] font-semibold uppercase tracking-[0.35em] text-muted-foreground">
                      {chip.label}
                    </span>
                    <span className="text-sm font-semibold text-foreground">
                      {chip.value}
                    </span>
                    {chip.label === "Palette" && chip.value && (
                      <span
                        className="h-3.5 w-3.5 rounded-full border border-white/40 dark:border-white/10"
                        style={{ backgroundColor: chip.value as string }}
                      />
                    )}
                  </span>
                ))}
              </div>
            )}
            <div className="flex flex-wrap gap-3 text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
              <span className="rounded-full bg-muted/70 px-4 py-2 text-foreground">
                Generated {createdOn}
              </span>
              <span className="rounded-full border border-border px-4 py-2 text-foreground">
                {displayWidth} × {displayHeight}px output
              </span>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card/80 p-6 shadow-inner space-y-6">
            <div className="flex items-center gap-4">
              <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 via-indigo-500 to-violet-500 text-white shadow-lg shadow-blue-500/30">
                <Image
                  src="/assets/icons/profile.svg"
                  alt="author"
                  width={24}
                  height={24}
                  className="brightness-0 invert"
                />
                <div
                  className="absolute inset-0 rounded-2xl border border-white/30"
                  aria-hidden
                />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground mb-1">
                  Created by
                </p>
                <p className="text-lg font-semibold text-foreground">
                  {authorName}
                </p>
                <p className="text-sm text-muted-foreground">@{authorHandle}</p>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-blue-200/40 dark:border-blue-800/40 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 p-4">
                <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-blue-600 dark:text-blue-300">
                  Created on
                </p>
                <p className="text-lg font-semibold text-foreground mt-2">
                  {createdOn}
                </p>
                <p className="text-xs text-muted-foreground">
                  Timestamp synced across devices
                </p>
              </div>
              <div className="rounded-xl border border-slate-200/60 dark:border-slate-700/60 bg-card/70 p-4">
                <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-muted-foreground">
                  Output size
                </p>
                <p className="text-lg font-semibold text-foreground mt-2">
                  {displayWidth} × {displayHeight}px
                </p>
                <p className="text-xs text-muted-foreground">
                  Optimized for instant downloads
                </p>
              </div>
            </div>
            <div className="rounded-2xl border border-border bg-muted/40 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                Workflow tip
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Use the actions below to iterate, duplicate settings, or clean
                up the output directly in your studio.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Transformation Details */}
      <section className="rounded-3xl border border-border bg-card shadow-sm overflow-hidden">
        <div className="border-b border-border/70 bg-gradient-to-r from-muted/30 via-transparent to-muted/30 px-6 py-5">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex-center shadow-md shadow-blue-500/30">
                <Image
                  src="/assets/icons/stars.svg"
                  alt="transformation"
                  width={18}
                  height={18}
                  className="brightness-0 invert"
                />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-muted-foreground">
                  Creative controls
                </p>
                <h3 className="text-lg font-semibold text-foreground">
                  Transformation Details
                </h3>
              </div>
            </div>
            <span className="rounded-full border border-border bg-muted/60 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
              Ready for handoff
            </span>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="group relative rounded-2xl border border-border bg-muted/40 p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="flex items-center gap-2 mb-3">
                <div className="h-2 w-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500" />
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-muted-foreground">
                  Type
                </p>
              </div>
              <p className="text-xl font-semibold capitalize text-foreground">
                {image.transformationType}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Applies preset tuning for this workflow.
              </p>
            </div>

            {image.aspectRatio && (
              <div className="group relative rounded-2xl border border-border bg-muted/40 p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <div className="flex items-center gap-2 mb-3">
                  <div className="h-2 w-2 rounded-full bg-gradient-to-r from-amber-500 to-orange-500" />
                  <p className="text-xs font-semibold uppercase tracking-[0.35em] text-muted-foreground">
                    Aspect
                  </p>
                </div>
                <p className="text-xl font-semibold text-foreground">
                  {image.aspectRatio}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Keeps framing consistent between versions.
                </p>
              </div>
            )}

            {image.color && (
              <div className="group relative rounded-2xl border border-border bg-muted/40 p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <div className="flex items-center gap-2 mb-3">
                  <div className="h-2 w-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500" />
                  <p className="text-xs font-semibold uppercase tracking-[0.35em] text-muted-foreground">
                    Palette
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className="h-10 w-10 rounded-2xl border border-white/60 dark:border-white/10 shadow-inner"
                    style={{ backgroundColor: image.color }}
                  />
                  <p className="text-base font-semibold text-foreground">
                    {image.color}
                  </p>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Primary tone influencing diffusion.
                </p>
              </div>
            )}

            <div className="group relative rounded-2xl border border-border bg-muted/40 p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="flex items-center gap-2 mb-3">
                <div className="h-2 w-2 rounded-full bg-gradient-to-r from-violet-500 to-purple-600" />
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-muted-foreground">
                  Resolution
                </p>
              </div>
              <p className="text-xl font-semibold text-foreground">
                {displayWidth} × {displayHeight}px
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                High-res export ready for download.
              </p>
            </div>

            {image.prompt && (
              <div className="group relative rounded-2xl border border-border bg-gradient-to-br from-purple-500/10 to-indigo-500/10 p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl lg:col-span-2">
                <div className="flex items-center gap-2 mb-3">
                  <div className="h-2 w-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500" />
                  <p className="text-xs font-semibold uppercase tracking-[0.35em] text-muted-foreground">
                    Prompt
                  </p>
                </div>
                <p
                  className="text-sm font-medium text-foreground/90 leading-relaxed line-clamp-3"
                  title={image.prompt}
                >
                  {image.prompt}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Images Comparison Section */}
      <section className="rounded-3xl border border-border bg-card shadow-sm overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/70 bg-gradient-to-r from-muted/30 via-transparent to-muted/30 px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex-center shadow-md shadow-indigo-500/30">
              <Image
                src="/assets/icons/image.svg"
                alt="comparison"
                width={18}
                height={18}
                className="brightness-0 invert"
              />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-muted-foreground">
                Review
              </p>
              <h3 className="text-lg font-semibold text-foreground">
                Before & After
              </h3>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full border border-border px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
              Live preview
            </span>
            <span className="rounded-full bg-muted/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
              Hover to inspect
            </span>
          </div>
        </div>

        <div className="grid gap-6 p-6 lg:grid-cols-2">
          {/* Original */}
          <article className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-gradient-to-r from-sky-500 to-blue-600 animate-pulse" />
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-muted-foreground">
                  Original
                </p>
              </div>
              <span className="rounded-full border border-border bg-muted/60 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                Source
              </span>
            </div>
            <div className="relative overflow-hidden rounded-2xl border border-border bg-muted/40 shadow-lg group">
              <Image
                width={displayWidth}
                height={displayHeight}
                src={image.secureURL}
                alt="original image"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="rounded-xl bg-white/90 px-3 py-1 text-xs font-semibold text-slate-800">
                  Original capture
                </span>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
              <span className="rounded-full border border-border px-3 py-1">
                {displayWidth} × {displayHeight}px
              </span>
              <span className="rounded-full border border-border px-3 py-1 capitalize">
                {image.aspectRatio || "native"}
              </span>
            </div>
          </article>

          {/* Transformed */}
          <article className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-violet-600 animate-pulse" />
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-muted-foreground">
                  Transformed
                </p>
              </div>
              <span className="rounded-full border border-purple-400/60 bg-purple-500/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.3em] text-purple-500">
                Applied
              </span>
            </div>
            <div className="relative overflow-hidden rounded-2xl border border-indigo-400/40 bg-gradient-to-br from-indigo-500/10 to-violet-500/10 shadow-xl">
              <TransformedImage
                image={image}
                type={image.transformationType}
                title={image.title}
                isTransforming={false}
                transformationConfig={image.config}
                hasDownload={true}
              />
            </div>
            <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
              <span className="rounded-full border border-border px-3 py-1 capitalize">
                {image.transformationType}
              </span>
              {image.color && (
                <span className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1">
                  <span
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: image.color }}
                  />
                  {image.color}
                </span>
              )}
            </div>
          </article>
        </div>
      </section>

      {/* Manage Transformation */}
      {userId === image.author.clerkId && (
        <section className="relative overflow-hidden rounded-3xl border border-border bg-card shadow-xl">
          <div
            className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-indigo-500/10 dark:from-blue-500/5 dark:via-transparent dark:to-violet-500/10"
            aria-hidden
          />
          <div className="relative space-y-6 p-6 lg:p-8">
            <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-border/70 bg-white/85 px-5 py-4 shadow-sm backdrop-blur dark:bg-white/5">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 via-indigo-500 to-violet-600 text-white shadow-[0_10px_40px_rgba(79,70,229,0.25)]">
                  <Image
                    src="/assets/icons/stars.svg"
                    alt="manage"
                    width={20}
                    height={20}
                    className="brightness-0 invert"
                  />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.35em] text-muted-foreground">
                    Owner tools
                  </p>
                  <h3 className="text-2xl font-semibold text-foreground">
                    Manage transformation
                  </h3>
                </div>
              </div>
              <span className="rounded-full border border-border bg-muted/60 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                Private
              </span>
            </div>

            <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="rounded-2xl border border-border bg-white/90 p-6 shadow-sm backdrop-blur dark:bg-white/5">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                      Creative maintenance
                    </p>
                    <p className="text-base text-muted-foreground">
                      Update, iterate, or duplicate this transformation straight
                      from your studio.
                    </p>
                  </div>
                  <span className="hidden rounded-full border border-border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.3em] text-muted-foreground md:inline-flex">
                    Instant access
                  </span>
                </div>
                <div className="mt-6">
                  <Button
                    asChild
                    type="button"
                    className="h-14 w-full justify-between rounded-2xl bg-slate-900 text-white shadow-md transition hover:bg-slate-900/90 dark:bg-white dark:text-slate-900 dark:hover:bg-white/80"
                  >
                    <Link
                      href={`/transformations/${image.id}/update`}
                      className="flex flex-1 items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-800/90 text-white dark:bg-slate-100 dark:text-slate-900">
                          <Image
                            src="/assets/icons/stars.svg"
                            alt="update"
                            width={20}
                            height={20}
                            className="brightness-0 invert dark:invert-0"
                          />
                        </div>
                        <div className="text-left">
                          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white/70 dark:text-slate-500">
                            Update
                          </p>
                          <p className="text-base font-semibold">Open editor</p>
                        </div>
                      </div>
                      <span className="text-sm font-semibold text-white/80 dark:text-slate-500">
                        ⌘ + U
                      </span>
                    </Link>
                  </Button>
                </div>
              </div>

              <div className="grid gap-4">
                <div className="rounded-2xl border border-border bg-card/90 p-5 shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-[0.35em] text-muted-foreground">
                    Cleanup
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Remove this output from your library when it no longer fits
                    your gallery.
                  </p>
                  <div className="mt-4">
                    <DeleteConfirmation imageId={image.id} />
                  </div>
                </div>
                <div className="rounded-2xl border border-border bg-card/90 p-5 shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-[0.35em] text-muted-foreground">
                    Quick notes
                  </p>
                  <dl className="mt-4 grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <dt className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
                        Credits
                      </dt>
                      <dd className="text-lg font-semibold text-foreground">
                        {image.credits || 0}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
                        Last run
                      </dt>
                      <dd className="text-lg font-semibold text-foreground">
                        {createdOn}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3 text-sm">
              <div className="rounded-2xl border border-border bg-white/90 p-4 shadow-sm dark:bg-white/5">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                  Status
                </p>
                <p className="text-lg font-semibold text-foreground">
                  Published
                </p>
                <p className="text-xs text-muted-foreground">
                  Visible in your library
                </p>
              </div>
              <div className="rounded-2xl border border-border bg-white/90 p-4 shadow-sm dark:bg-white/5">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                  Credits used
                </p>
                <p className="text-lg font-semibold text-foreground">
                  {image.credits || 0}
                </p>
                <p className="text-xs text-muted-foreground">Based on config</p>
              </div>
              <div className="rounded-2xl border border-border bg-white/90 p-4 shadow-sm dark:bg-white/5">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                  Last updated
                </p>
                <p className="text-lg font-semibold text-foreground">
                  {createdOn}
                </p>
                <p className="text-xs text-muted-foreground">
                  Synced across devices
                </p>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default ImageDetails;
