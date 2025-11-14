import { Suspense } from "react";
import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { Collection } from "@/components/shared/Collection";
import { getImageCount, getUserImages } from "@/lib/actions/image.action";
import { getUserById } from "@/lib/actions/user.action";
import { ProfileStats } from "@/components/shared/ProfileStats";
import {
  ProfileStatsskeleton,
  ProfileChartSkeleton,
  ProfileActivitySkeleton,
  ProfileCollectionSkeleton,
} from "@/components/shared/ProfileSkeletons";
import { UserImagesCollection } from "@/components/shared/user-images-collection";
import { Button } from "@/components/ui/button";

const Profile = async ({ searchParams }: SearchParamProps) => {
  const page = Number(searchParams?.page) || 1;
  const { userId } = auth();

  if (!userId) redirect("/sign-in");
  const user = await getUserById(userId);
  const imageCount = await getImageCount({ userId: user.id });
  const memberSince = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString()
    : new Date().toLocaleDateString();
  const creatorTier =
    (imageCount ?? 0) > 50
      ? "Gallery curator"
      : (imageCount ?? 0) > 15
      ? "Rising artist"
      : "New explorer";
  const creditStatus =
    user.creditBalance < 5 ? "Top up recommended" : "All good";

  return (
    <main className="space-y-10">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl border border-border bg-card shadow-lg">
        <div
          className="absolute inset-0 bg-gradient-to-r from-purple-500/15 via-transparent to-blue-500/15"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-[url('/assets/images/hero.webp')] opacity-5 bg-cover bg-center"
          aria-hidden
        />
        <div className="relative grid gap-8 p-6 lg:p-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row sm:items-center gap-6">
              <div className="relative flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-purple-500 via-indigo-500 to-blue-500 text-4xl font-bold text-white shadow-xl">
                <span>
                  {user.firstName?.charAt(0) || user.username?.charAt(0) || "U"}
                </span>
                <div
                  className="absolute inset-0 rounded-3xl border border-white/20"
                  aria-hidden
                />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                  Profile
                </p>
                <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
                  {user.firstName
                    ? `${user.firstName} ${user.lastName || ""}`
                    : user.username}
                </h1>
                <p className="text-muted-foreground">@{user.username}</p>
                <p className="text-sm text-muted-foreground mt-1">
                  {user.email}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-2 rounded-full bg-muted/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-foreground">
                {creatorTier}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-purple-500/90 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white">
                {imageCount ?? 0} artworks
              </span>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card/80 p-4 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                Credits
              </p>
              <p className="mt-2 text-3xl font-bold text-foreground">
                {user.creditBalance}
              </p>
              <p className="text-xs text-muted-foreground">
                Available across transformations
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-card/80 p-4 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                Uploads
              </p>
              <p className="mt-2 text-3xl font-bold text-foreground">
                {imageCount ?? 0}
              </p>
              <p className="text-xs text-muted-foreground">
                Total artworks created
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-card/80 p-4 shadow-sm sm:col-span-2">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                Member since
              </p>
              <p className="mt-2 text-lg font-semibold text-foreground">
                {memberSince}
              </p>
              <p className="text-xs text-muted-foreground">
                Keeping your transformations synced securely
              </p>
            </div>
            <div className="sm:col-span-2 flex flex-wrap gap-3">
              <Button
                asChild
                className="flex-1 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white shadow-lg shadow-purple-500/30 hover:shadow-purple-500/40"
              >
                <Link href="/credits">Add more credits</Link>
              </Button>
              <Button
                variant="outline"
                asChild
                className="flex-1 border-dashed border-border/80 text-muted-foreground hover:text-foreground"
              >
                <Link href="/transformations">Open studio</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats and Analytics Section */}
      <Suspense
        fallback={
          <>
            <ProfileStatsskeleton />
            <ProfileChartSkeleton />
            <ProfileActivitySkeleton />
          </>
        }
      >
        <ProfileStats
          userId={user.id}
          creditBalance={user.creditBalance}
          totalImages={imageCount ?? 0}
        />
      </Suspense>

      {/* Creative momentum */}
      <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-3xl border border-border bg-gradient-to-br from-slate-900/5 via-purple-500/5 to-blue-500/5 p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
            Highlights
          </p>
          <h3 className="text-xl font-semibold text-foreground">
            Creative digest
          </h3>
          <ul className="mt-6 space-y-4">
            <li className="flex items-start gap-3">
              <span className="mt-1 h-2 w-2 rounded-full bg-gradient-to-r from-purple-500 to-blue-500" />
              <div>
                <p className="text-sm text-muted-foreground">Total creations</p>
                <p className="text-lg font-semibold text-foreground">
                  {imageCount ?? 0} artworks
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 h-2 w-2 rounded-full bg-gradient-to-r from-teal-500 to-emerald-500" />
              <div>
                <p className="text-sm text-muted-foreground">Membership tier</p>
                <p className="text-lg font-semibold text-foreground">
                  {creatorTier}
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 h-2 w-2 rounded-full bg-gradient-to-r from-amber-500 to-orange-500" />
              <div>
                <p className="text-sm text-muted-foreground">Account age</p>
                <p className="text-lg font-semibold text-foreground">
                  Member since {memberSince}
                </p>
              </div>
            </li>
          </ul>
        </div>
        <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
          <div className="flex items-center justify-between gap-4 mb-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                Workflow shortcuts
              </p>
              <h3 className="text-xl font-semibold text-foreground">
                Keep creating without friction
              </h3>
            </div>
            <span className="rounded-full bg-muted/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.3em] text-muted-foreground">
              {creditStatus}
            </span>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Link
              href="/transformations"
              className="group relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-purple-500/15 via-indigo-500/10 to-blue-500/15 p-5 shadow-inner"
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-purple-500/20 to-indigo-500/20"
                aria-hidden
              />
              <div className="relative">
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-muted-foreground">
                  Studio
                </p>
                <h4 className="text-lg font-semibold text-foreground">
                  Open latest transformations
                </h4>
                <p className="text-sm text-muted-foreground">
                  Resume edits or start from templates.
                </p>
              </div>
            </Link>
            <Link
              href="/credits"
              className="group relative overflow-hidden rounded-2xl border border-border bg-card/80 p-5 shadow-inner"
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-amber-500/15 to-orange-500/15"
                aria-hidden
              />
              <div className="relative">
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-muted-foreground">
                  Balance
                </p>
                <h4 className="text-lg font-semibold text-foreground">
                  Manage credits
                </h4>
                <p className="text-sm text-muted-foreground">
                  Current balance {user.creditBalance} credits.
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Collection Section */}
      <section className="space-y-5">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
              Library
            </p>
            <h3 className="text-2xl font-bold text-foreground">My creations</h3>
          </div>
          <div className="rounded-full border border-border bg-muted/50 px-4 py-2 text-sm text-muted-foreground">
            Showing latest uploads first
          </div>
        </div>
        <div className="rounded-3xl border border-border bg-card/80 p-4 shadow-inner">
          <Suspense fallback={<ProfileCollectionSkeleton />}>
            <UserImagesCollection userId={user.id} page={page} />
          </Suspense>
        </div>
      </section>
    </main>
  );
};

export default Profile;
