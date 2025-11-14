import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import Image from 'next/image';

import Header from '@/components/shared/Header';
import TransformationForm from '@/components/shared/TransformationForm';
import { transformationTypes } from '@/constants';
import { getUserById } from '@/lib/actions/user.action';
import { getImageById } from '@/lib/actions/image.action';

const UpdatePage = async ({ params: { id } }: SearchParamProps) => {
  const { userId } = auth();

  if (!userId) redirect('/sign-in');

  const user = await getUserById(userId);
  const image = await getImageById(id);

  const transformation =
    transformationTypes[image.transformationType as TransformationTypeKey];

  const steps = [
    'Upload or replace the asset you want to tweak',
    'Fine-tune the transformation controls',
    'Review the live preview & confirm changes',
    'Publish the refreshed artwork to your library',
  ];

  return (
    <div className="space-y-8">
      <section className="relative overflow-hidden rounded-3xl border border-border bg-card shadow-lg">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-transparent to-blue-500/10" aria-hidden />
        <div className="relative flex flex-col gap-6 p-6 lg:p-8">
          <div className="flex flex-col gap-3">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">Transformation studio</p>
            <Header
              imageId={image.id}
              title={transformation.title}
              subtitle={transformation.subTitle}
            />
          </div>
          <div className="flex flex-wrap gap-3">
            <div className="inline-flex items-center gap-2 rounded-full bg-muted/60 px-4 py-2 text-sm font-semibold text-foreground shadow-sm">
              <Image src="/assets/icons/image.svg" alt="Type" width={16} height={16} className="opacity-70" />
              {image.transformationType}
            </div>
            <div className="inline-flex items-center gap-2 rounded-full bg-purple-500/90 px-4 py-2 text-sm font-semibold text-white shadow-sm">
              <Image src="/assets/icons/bag.svg" alt="Credits" width={16} height={16} className="brightness-0 invert" />
              {user.creditBalance} credits left
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.05fr_1.95fr]">
        <div className="space-y-6">
          <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-muted-foreground">Overview</p>
                <p className="mt-2 text-2xl font-bold text-foreground">{image.title || 'Untitled asset'}</p>
                <p className="mt-1 text-sm text-muted-foreground">Managed by {image?.author?.firstName ?? 'you'}</p>
              </div>
              <div className="rounded-2xl bg-purple-500/90 px-4 py-3 text-xs font-semibold uppercase tracking-wider text-white shadow-md">
                Active
              </div>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-border/60 bg-muted/50 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">Credits</p>
                <p className="mt-2 text-2xl font-bold text-foreground">{user.creditBalance}</p>
                <p className="text-xs text-muted-foreground">Only billed when you save updates</p>
              </div>
              <div className="rounded-2xl border border-border/60 bg-muted/50 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">Duration</p>
                <p className="mt-2 text-2xl font-bold text-foreground">≈ 2 mins</p>
                <p className="text-xs text-muted-foreground">Average time to publish</p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-border bg-dark-600/95 p-6 text-white shadow-xl">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white/60">Workflow</p>
            <h3 className="mt-3 text-2xl font-semibold">Seamless update pipeline</h3>
            <ol className="mt-6 space-y-4">
              {steps.map((step, index) => (
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
              <Image src="/assets/icons/stars.svg" alt="Tips" width={20} height={20} className="opacity-70" />
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground">Pro tip</p>
            </div>
            <p className="mt-3 text-base text-muted-foreground">
              Need ultra-sharp results? Use a larger source image and lock an aspect ratio before applying your edits. You can always revert to the previous state from the transformations history.
            </p>
          </div>
        </div>

        <div className="rounded-3xl border border-border bg-card shadow-lg">
          <div className="border-b border-border/60 bg-muted/40 px-6 py-5">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-purple-500/90 shadow-md">
                <Image src="/assets/icons/stars.svg" alt="Update" width={20} height={20} className="brightness-0 invert" />
              </div>
              <div>
                <p className="text-sm font-semibold text-muted-foreground">Step 2 of 2</p>
                <h3 className="text-xl font-semibold text-foreground">Craft your update</h3>
              </div>
            </div>
          </div>

          <div className="p-6 lg:p-10">
            <TransformationForm
              action='Update'
              userId={user.id}
              type={image.transformationType as TransformationTypeKey}
              creditBalance={user.creditBalance}
              config={image.config}
              data={image}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default UpdatePage;
