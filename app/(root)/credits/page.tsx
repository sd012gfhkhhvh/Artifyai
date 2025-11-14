import { auth } from "@clerk/nextjs/server";
import { SignedIn } from "@clerk/nextjs";
import Image from "next/image";
import { redirect } from "next/navigation";

import Header from "@/components/shared/Header";
import { Button } from "@/components/ui/button";
import { plans } from "@/constants";
import { getUserById } from "@/lib/actions/user.action";
import Checkout from "@/components/shared/Checkout";

const Credits = async () => {
  const { userId } = auth();

  if (!userId) redirect("/sign-in");

  const user = await getUserById(userId);

  const benefits = [
    {
      title: "Instant activation",
      description:
        "Credits are applied to your workspace the moment checkout succeeds, no manual steps required.",
      icon: "/assets/icons/stars.svg",
    },
    {
      title: "Usage transparency",
      description:
        "Track spend per transformation with real-time counters and email summaries.",
      icon: "/assets/icons/scan.svg",
    },
    {
      title: "Priority support",
      description:
        "Upgraded plans unlock concierge assistance and proactive status alerts.",
      icon: "/assets/icons/profile.svg",
    },
  ];

  return (
    <div className="space-y-10">
      <section className="relative overflow-hidden rounded-3xl border border-border bg-card shadow-lg">
        <div
          className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-transparent to-blue-500/10"
          aria-hidden
        />
        <div className="relative grid gap-8 lg:grid-cols-[1.3fr_0.7fr] p-6 lg:p-10">
          <div className="space-y-6">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-muted-foreground">
              Credit marketplace
            </p>
            <Header
              title="Buy Credits"
              subtitle="Choose a credit package that scales with your creative velocity."
            />
            <p className="max-w-2xl text-base text-muted-foreground">
              Switch packages anytime without downtime. Every purchase instantly
              tops up your studio so you can keep transforming without friction.
            </p>
            <div className="flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-2 rounded-full bg-muted/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-foreground">
                <Image
                  src="/assets/icons/stars.svg"
                  alt="instant"
                  width={16}
                  height={16}
                  className="opacity-70"
                />
                Instant top-up
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-purple-500/90 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white">
                <Image
                  src="/assets/icons/scan.svg"
                  alt="secure"
                  width={16}
                  height={16}
                  className="brightness-0 invert"
                />
                Secure checkout
              </span>
            </div>
          </div>

          <div className="rounded-3xl border border-border/70 bg-muted/50 p-6 shadow-inner shadow-black/5 dark:shadow-black/40">
            <div className="space-y-4">
              <div className="rounded-2xl border border-border bg-card/80 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                  Credits available
                </p>
                <p className="mt-2 text-3xl font-bold text-foreground">
                  {user.creditBalance}
                </p>
                <p className="text-sm text-muted-foreground">
                  Ready to spend on any transformation
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-border bg-card/80 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                    Avg render time
                  </p>
                  <p className="mt-2 text-2xl font-bold text-foreground">40s</p>
                  <p className="text-xs text-muted-foreground">
                    With Pro-tier credits
                  </p>
                </div>
                <div className="rounded-2xl border border-border bg-card/80 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                    Support window
                  </p>
                  <p className="mt-2 text-2xl font-bold text-foreground">
                    24 / 7
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Priority for Premium
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-8">
        <div className="text-center space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-muted-foreground">
            Pricing
          </p>
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
            Flexible credit packs for every team
          </h2>
          <p className="mx-auto max-w-2xl text-base text-muted-foreground">
            Every bundle includes commercial usage rights, secure storage, and
            access to the full suite of transformations.
          </p>
        </div>

        <ul className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {plans.map((plan) => {
            const isFree = plan.price === 0;
            const isPopular = plan.name.toLowerCase().includes("pro");
            const isPremium = plan.name.toLowerCase().includes("premium");

            return (
              <li
                key={plan.name}
                className={`relative flex h-full flex-col rounded-3xl border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
                  isPopular
                    ? "border-purple-400/70 bg-gradient-to-b from-purple-500/10 to-card"
                    : "border-border"
                }`}
              >
                {(isPopular || isPremium) && (
                  <span
                    className={`absolute right-5 top-5 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide ${
                      isPopular
                        ? "border-purple-300 bg-purple-500/10 text-purple-600 dark:text-purple-200"
                        : "border-blue-200 bg-blue-500/10 text-blue-600 dark:text-blue-200"
                    }`}
                  >
                    {isPopular ? "Most popular" : "Best value"}
                  </span>
                )}

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="rounded-2xl border border-border bg-muted/70 p-3">
                      <Image
                        src={plan.icon}
                        alt={plan.name}
                        width={32}
                        height={32}
                      />
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-foreground">
                        {plan.name}
                      </p>
                      <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                        Credit bundle
                      </p>
                    </div>
                  </div>

                  <div className="flex items-baseline gap-2">
                    <p className="text-4xl font-bold text-foreground">
                      ₹{plan.price}
                    </p>
                    {!isFree && (
                      <span className="text-sm text-muted-foreground">
                        / bundle
                      </span>
                    )}
                  </div>

                  <div className="inline-flex items-center gap-2 rounded-full bg-muted/70 px-4 py-1.5 font-semibold text-foreground">
                    <span className="text-base">{plan.credits}</span>
                    <span className="text-sm text-muted-foreground">
                      credits
                    </span>
                  </div>
                </div>

                <ul className="mt-6 flex flex-1 flex-col gap-3">
                  {plan.inclusions.map((inclusion) => (
                    <li
                      key={plan.name + inclusion.label}
                      className="flex items-center gap-3"
                    >
                      <div
                        className={`rounded-full border p-1 ${
                          inclusion.isIncluded
                            ? "border-green-200 bg-green-500/10"
                            : "border-border bg-muted"
                        }`}
                      >
                        <Image
                          src={`/assets/icons/${
                            inclusion.isIncluded ? "check.svg" : "cross.svg"
                          }`}
                          alt={inclusion.isIncluded ? "included" : "excluded"}
                          width={18}
                          height={18}
                        />
                      </div>
                      <p
                        className={`text-sm ${
                          inclusion.isIncluded
                            ? "text-foreground"
                            : "text-muted-foreground"
                        }`}
                      >
                        {inclusion.label}
                      </p>
                    </li>
                  ))}
                </ul>

                <div className="mt-6">
                  {isFree ? (
                    <Button
                      type="button"
                      className="w-full rounded-2xl border border-border bg-muted/80 text-foreground hover:bg-muted"
                    >
                      Included
                    </Button>
                  ) : (
                    <SignedIn>
                      <div className="w-full">
                        <Checkout
                          plan={plan.name}
                          amount={plan.price}
                          credits={plan.credits}
                          buyerId={user.id}
                        />
                      </div>
                    </SignedIn>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {benefits.map((benefit) => (
          <div
            key={benefit.title}
            className="rounded-3xl border border-border bg-card p-6 shadow-sm"
          >
            <div className="mb-4 inline-flex items-center justify-center rounded-2xl bg-muted p-3">
              <Image
                src={benefit.icon}
                alt={benefit.title}
                width={24}
                height={24}
              />
            </div>
            <h3 className="text-lg font-semibold text-foreground">
              {benefit.title}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {benefit.description}
            </p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Credits;
