import Header from '@/components/shared/Header';
import TransformationForm from '@/components/shared/TransformationForm';
import { transformationTypes } from '@/constants';
import { getUserById } from '@/lib/actions/user.action';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import Image from 'next/image';

const AddTransformationTypePage = async ({
  params: { type },
}: SearchParamProps) => {
  const clerkId = auth().userId;
  const transformation = transformationTypes[type];

  if (!clerkId) redirect('/sign-in');

  const user = await getUserById(clerkId);

  const creationSteps = [
    'Upload a high-fidelity source image (PNG/JPG)',
    'Describe the desired outcome and choose extras',
    'Select credits bundle & preview the draft',
    'Save to launch the transformation workflow',
  ];

  return (
    <div className="space-y-8">
      <section className="relative overflow-hidden rounded-3xl border border-border bg-card shadow-lg">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-transparent to-blue-500/10" aria-hidden />
        <div className="relative flex flex-col gap-6 p-6 lg:p-8">
          <div className="flex flex-col gap-3">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">Create transformation</p>
            <Header title={transformation.title} subtitle={transformation.subTitle} />
          </div>
          <div className="flex flex-wrap gap-3">
            <span className="inline-flex items-center gap-2 rounded-full bg-muted/60 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-foreground shadow-sm">
              <Image src="/assets/icons/stars.svg" alt="Mode" width={14} height={14} className="opacity-70" />
              {transformation.type}
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-purple-500/90 px-4 py-2 text-sm font-semibold text-white shadow-sm">
              <Image src="/assets/icons/bag.svg" alt="Credits" width={16} height={16} className="brightness-0 invert" />
              {user.creditBalance} credits available
            </span>
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.05fr_1.95fr]">
        <div className="space-y-6">
          <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-muted-foreground">What you get</p>
                <p className="mt-2 text-2xl font-bold text-foreground">Crystal-clear generations</p>
                <p className="mt-1 text-sm text-muted-foreground">Unlimited draft previews before spending a single credit.</p>
              </div>
              <div className="rounded-2xl bg-purple-500/90 px-4 py-3 text-xs font-semibold uppercase tracking-wider text-white shadow-md">Live beta</div>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-border/60 bg-muted/50 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">Credits ready</p>
                <p className="mt-2 text-2xl font-bold text-foreground">{user.creditBalance}</p>
                <p className="text-xs text-muted-foreground">Top up anytime from Credits page</p>
              </div>
              <div className="rounded-2xl border border-border/60 bg-muted/50 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">Turnaround</p>
                <p className="mt-2 text-2xl font-bold text-foreground">≈ 40s</p>
                <p className="text-xs text-muted-foreground">Average render time</p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-border bg-dark-600/95 p-6 text-white shadow-xl">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white/60">Launch checklist</p>
            <h3 className="mt-3 text-2xl font-semibold">4 curated steps</h3>
            <ol className="mt-6 space-y-4">
              {creationSteps.map((step, index) => (
                <li key={step} className="flex gap-4 rounded-2xl border border-white/10 bg-white/10 p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/15 text-base font-semibold text-white">
                    {index + 1}
                  </div>
                  <p className="text-sm leading-relaxed text-white/90">{step}</p>
                </li>
              ))}
            </ol>
          </div>

          <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <Image src="/assets/icons/stars.svg" alt="Advice" width={20} height={20} className="opacity-70" />
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground">Creator note</p>
            </div>
            <p className="mt-3 text-base text-muted-foreground">
              Mix structured prompts with reference uploads for the most accurate renders. You can duplicate any configuration later and keep your favorite presets handy.
            </p>
          </div>
        </div>

        <div className="rounded-3xl border border-border bg-card shadow-lg">
          <div className="border-b border-border/60 bg-muted/40 px-6 py-5">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-purple-500/90 shadow-md">
                <Image src="/assets/icons/stars.svg" alt="Create" width={20} height={20} className="brightness-0 invert" />
              </div>
              <div>
                <p className="text-sm font-semibold text-muted-foreground">Step 2 of 2</p>
                <h3 className="text-xl font-semibold text-foreground">Design your transformation</h3>
              </div>
            </div>
          </div>

          <div className="p-6 lg:p-10">
            <TransformationForm
              action='Add'
              userId={user.id}
              type={transformation.type as TransformationTypeKey}
              creditBalance={user.creditBalance}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default AddTransformationTypePage;
