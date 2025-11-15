import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

import { transformationTypes, navLinks } from "@/constants";
import { getUserById } from "@/lib/actions/user.action";
import { UserImagesCollection } from "@/components/shared/user-images-collection";
import { ProfileCollectionSkeleton } from "@/components/shared/ProfileSkeletons";
import { Button } from "@/components/ui/button";

const Transformations = async ({ searchParams }: SearchParamProps) => {
  const { userId } = auth();
  
  if (!userId) redirect("/sign-in");
  
  const user = await getUserById(userId);
  const page = Number(searchParams?.page) || 1;

  // Get transformation types as array
  const transformations = Object.values(transformationTypes);

  // Stats for the user
  const hasLowCredits = user.creditBalance < 10;
  const creditStatus = hasLowCredits ? "Consider topping up" : "Ready to create";

  return (
    <div className="min-h-screen space-y-10">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl border border-border bg-card shadow-lg">
        <div
          className="absolute inset-0 bg-gradient-to-br from-purple-500/15 via-transparent to-blue-500/15"
          aria-hidden
        />
        <div
          className="absolute -right-16 top-16 h-64 w-64 rounded-full bg-purple-500/20 blur-3xl"
          aria-hidden
        />
        <div
          className="absolute -left-16 bottom-16 h-80 w-80 rounded-full bg-blue-500/20 blur-3xl"
          aria-hidden
        />
        <div className="relative p-8 lg:p-12 space-y-8">
          <div className="flex flex-col gap-6">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-border bg-muted/60 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.35em] text-muted-foreground">
                AI Transformation Studio
              </span>
              <span className="rounded-full bg-gradient-to-r from-purple-500 to-blue-500 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.3em] text-white">
                5 Workflows Available
              </span>
            </div>
            <div>
              <h1 className="text-4xl font-bold leading-tight text-foreground sm:text-5xl lg:text-6xl">
                Choose your transformation
              </h1>
              <p className="mt-4 max-w-3xl text-base text-muted-foreground sm:text-lg">
                Select from our suite of AI-powered creative tools. Each workflow is optimized for professional results with studio-grade quality.
              </p>
            </div>
          </div>

          {/* User Stats */}
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-border bg-card/80 p-5 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 p-3 shadow-lg shadow-purple-500/30">
                  <Image
                    src="/assets/icons/bag.svg"
                    alt="Credits"
                    width={20}
                    height={20}
                    className="brightness-0 invert"
                  />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                    Credits
                  </p>
                  <p className="text-2xl font-bold text-foreground">
                    {user.creditBalance}
                  </p>
                </div>
              </div>
              <p className="mt-3 text-xs text-muted-foreground">
                {creditStatus}
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-card/80 p-5 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 p-3 shadow-lg shadow-indigo-500/30">
                  <Image
                    src="/assets/icons/stars.svg"
                    alt="Workflows"
                    width={20}
                    height={20}
                    className="brightness-0 invert"
                  />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                    Tools ready
                  </p>
                  <p className="text-2xl font-bold text-foreground">5</p>
                </div>
              </div>
              <p className="mt-3 text-xs text-muted-foreground">
                All workflows unlocked
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-card/80 p-5 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 p-3 shadow-lg shadow-blue-500/30">
                  <Image
                    src="/assets/icons/image.svg"
                    alt="Speed"
                    width={20}
                    height={20}
                    className="brightness-0 invert"
                  />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                    Avg. speed
                  </p>
                  <p className="text-2xl font-bold text-foreground">≈ 40s</p>
                </div>
              </div>
              <p className="mt-3 text-xs text-muted-foreground">
                Per transformation
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Transformation Tools Grid */}
      <section className="space-y-6">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <div className="h-1 w-1 rounded-full bg-purple-500" />
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-muted-foreground">
              Available Workflows
            </p>
          </div>
          <h2 className="text-3xl font-bold text-foreground">
            Professional AI Tools
          </h2>
          <p className="text-base text-muted-foreground max-w-2xl">
            Each transformation uses state-of-the-art AI models trained on millions of images. Click any card to start creating.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {transformations.map((transformation) => {
            const Icon = transformation.icon;
            const route = navLinks.find((link) =>
              link.route.includes(transformation.type)
            )?.route;

            return (
              <Link
                key={transformation.type}
                href={route || `/transformations/add/${transformation.type}`}
                className="group relative overflow-hidden rounded-3xl border border-border bg-card shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-500/20"
              >
                {/* Background Gradient */}
                <div
                  className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-blue-500/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  aria-hidden
                />
                
                {/* Animated Border Glow */}
                <div
                  className="absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(147, 51, 234, 0.3) 0%, rgba(59, 130, 246, 0.3) 100%)",
                    padding: "2px",
                    WebkitMask:
                      "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    WebkitMaskComposite: "xor",
                    maskComposite: "exclude",
                  }}
                  aria-hidden
                />

                <div className="relative p-6 space-y-6">
                  {/* Icon and Badge */}
                  <div className="flex items-start justify-between">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-blue-500 shadow-lg shadow-purple-500/30 transition-transform duration-300 group-hover:scale-110">
                      <Image
                        src={`/assets/icons/${Icon}`}
                        alt={transformation.title}
                        width={28}
                        height={28}
                        className="brightness-0 invert"
                      />
                    </div>
                    <span className="rounded-full bg-muted/70 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.3em] text-foreground">
                      Live
                    </span>
                  </div>

                  {/* Content */}
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold text-foreground">
                      {transformation.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {transformation.subTitle}
                    </p>
                  </div>

                  {/* CTA */}
                  <div className="flex items-center gap-2 text-sm font-semibold text-purple-600 dark:text-purple-400">
                    <span>Launch workflow</span>
                    <svg
                      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
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
              </Link>
            );
          })}
        </div>
      </section>

      {/* Quick Tips Section */}
      <section className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-border bg-card p-6 lg:p-8 shadow-sm space-y-4">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 p-2.5 shadow-lg">
              <Image
                src="/assets/icons/stars.svg"
                alt="Tips"
                width={18}
                height={18}
                className="brightness-0 invert"
              />
            </div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground">
              Pro Tips
            </p>
          </div>
          <h3 className="text-2xl font-bold text-foreground">
            Get the best results
          </h3>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="flex gap-3">
              <span className="text-purple-500">•</span>
              <span>Use high-resolution source images (1000px+ recommended)</span>
            </li>
            <li className="flex gap-3">
              <span className="text-purple-500">•</span>
              <span>Be specific with prompts for object removal and recoloring</span>
            </li>
            <li className="flex gap-3">
              <span className="text-purple-500">•</span>
              <span>Preview transformations before committing credits</span>
            </li>
            <li className="flex gap-3">
              <span className="text-purple-500">•</span>
              <span>Save successful configurations as templates for future use</span>
            </li>
          </ul>
        </div>

        <div className="rounded-3xl border border-border bg-gradient-to-br from-purple-500/10 to-blue-500/10 p-6 lg:p-8 shadow-sm space-y-4">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 p-2.5 shadow-lg">
              <Image
                src="/assets/icons/bag.svg"
                alt="Credits"
                width={18}
                height={18}
                className="brightness-0 invert"
              />
            </div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground">
              Credit Management
            </p>
          </div>
          <h3 className="text-2xl font-bold text-foreground">
            {hasLowCredits ? "Running low on credits?" : "Credits available"}
          </h3>
          <p className="text-sm text-muted-foreground">
            {hasLowCredits
              ? "Top up now to keep your creative workflow uninterrupted. Each transformation costs 1 credit."
              : `You have ${user.creditBalance} credits ready. Each transformation costs 1 credit and processes in about 40 seconds.`}
          </p>
          <Link href="/credits">
            <Button className="mt-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/30 hover:shadow-purple-500/40">
              {hasLowCredits ? "Buy Credits" : "View Plans"}
            </Button>
          </Link>
        </div>
      </section>

      {/* Recent Transformations */}
      <section className="space-y-6">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <div className="h-1 w-1 rounded-full bg-blue-500" />
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-muted-foreground">
              Your Work
            </p>
          </div>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl font-bold text-foreground">
                Recent transformations
              </h2>
              <p className="mt-2 text-base text-muted-foreground">
                Your latest creations and experiments
              </p>
            </div>
            <Link href="/profile">
              <Button
                variant="outline"
                className="border-border hover:bg-muted/50"
              >
                View all in Profile
              </Button>
            </Link>
          </div>
        </div>

        <div className="rounded-3xl border border-border bg-card/80 p-4 shadow-inner">
          <Suspense fallback={<ProfileCollectionSkeleton />}>
            <UserImagesCollection
              userId={user.id}
              page={page}
            />
          </Suspense>
        </div>
      </section>

      {/* Feature Comparison */}
      <section className="rounded-3xl border border-border bg-card p-6 lg:p-8 shadow-sm space-y-6">
        <div className="flex flex-col gap-2">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-muted-foreground">
            Workflow Comparison
          </p>
          <h2 className="text-2xl font-bold text-foreground">
            What makes each tool unique
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-border">
                <th className="pb-4 text-left text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  Workflow
                </th>
                <th className="pb-4 text-left text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  Best For
                </th>
                <th className="pb-4 text-left text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  Credits
                </th>
                <th className="pb-4 text-left text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  Speed
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr className="group hover:bg-muted/30">
                <td className="py-4">
                  <div className="flex items-center gap-3">
                    <Image
                      src="/assets/icons/image.svg"
                      alt="Restore"
                      width={20}
                      height={20}
                      className="opacity-70"
                    />
                    <span className="font-semibold text-foreground">
                      Image Restore
                    </span>
                  </div>
                </td>
                <td className="py-4 text-sm text-muted-foreground">
                  Old, damaged, or low-quality photos
                </td>
                <td className="py-4 text-sm font-semibold text-foreground">
                  1 credit
                </td>
                <td className="py-4 text-sm text-muted-foreground">≈ 35s</td>
              </tr>
              <tr className="group hover:bg-muted/30">
                <td className="py-4">
                  <div className="flex items-center gap-3">
                    <Image
                      src="/assets/icons/stars.svg"
                      alt="Fill"
                      width={20}
                      height={20}
                      className="opacity-70"
                    />
                    <span className="font-semibold text-foreground">
                      Generative Fill
                    </span>
                  </div>
                </td>
                <td className="py-4 text-sm text-muted-foreground">
                  Extending canvas, changing aspect ratios
                </td>
                <td className="py-4 text-sm font-semibold text-foreground">
                  1 credit
                </td>
                <td className="py-4 text-sm text-muted-foreground">≈ 45s</td>
              </tr>
              <tr className="group hover:bg-muted/30">
                <td className="py-4">
                  <div className="flex items-center gap-3">
                    <Image
                      src="/assets/icons/scan.svg"
                      alt="Remove"
                      width={20}
                      height={20}
                      className="opacity-70"
                    />
                    <span className="font-semibold text-foreground">
                      Object Remove
                    </span>
                  </div>
                </td>
                <td className="py-4 text-sm text-muted-foreground">
                  Removing unwanted objects or people
                </td>
                <td className="py-4 text-sm font-semibold text-foreground">
                  1 credit
                </td>
                <td className="py-4 text-sm text-muted-foreground">≈ 40s</td>
              </tr>
              <tr className="group hover:bg-muted/30">
                <td className="py-4">
                  <div className="flex items-center gap-3">
                    <Image
                      src="/assets/icons/filter.svg"
                      alt="Recolor"
                      width={20}
                      height={20}
                      className="opacity-70"
                    />
                    <span className="font-semibold text-foreground">
                      Object Recolor
                    </span>
                  </div>
                </td>
                <td className="py-4 text-sm text-muted-foreground">
                  Changing colors of specific objects
                </td>
                <td className="py-4 text-sm font-semibold text-foreground">
                  1 credit
                </td>
                <td className="py-4 text-sm text-muted-foreground">≈ 38s</td>
              </tr>
              <tr className="group hover:bg-muted/30">
                <td className="py-4">
                  <div className="flex items-center gap-3">
                    <Image
                      src="/assets/icons/camera.svg"
                      alt="Remove BG"
                      width={20}
                      height={20}
                      className="opacity-70"
                    />
                    <span className="font-semibold text-foreground">
                      Background Remove
                    </span>
                  </div>
                </td>
                <td className="py-4 text-sm text-muted-foreground">
                  Product shots, portraits, compositing
                </td>
                <td className="py-4 text-sm font-semibold text-foreground">
                  1 credit
                </td>
                <td className="py-4 text-sm text-muted-foreground">≈ 30s</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default Transformations;