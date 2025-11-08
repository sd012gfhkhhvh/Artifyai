import { Suspense } from "react";
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

const Profile = async ({ searchParams }: SearchParamProps) => {
  const page = Number(searchParams?.page) || 1;
  const { userId } = auth();

  if (!userId) redirect("/sign-in");
  const user = await getUserById(userId);
  const imageCount = await getImageCount({ userId: user.id });

  return (
    <>
      <section className="wrapper">
        {/* Hero Section with User Info */}
        <div className="relative bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-600 rounded-2xl p-8 md:p-12 mb-8 overflow-hidden shadow-xl">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="absolute inset-0 bg-[url('/assets/images/hero.webp')] opacity-5 bg-cover bg-center"></div>
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-white/20 backdrop-blur-sm border-4 border-white/30 flex items-center justify-center shadow-2xl">
              <span className="text-4xl md:text-5xl font-bold text-white">
                {user.firstName?.charAt(0) || user.username?.charAt(0) || "U"}
              </span>
            </div>
            <div className="text-center md:text-left flex-1">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                {user.firstName
                  ? `${user.firstName} ${user.lastName || ""}`
                  : user.username}
              </h1>
              <p className="text-white/80 text-lg">@{user.username}</p>
              <p className="text-white/70 text-sm mt-2">{user.email}</p>
            </div>
          </div>
        </div>

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

        {/* Collection Section */}
        <div className="mt-8">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <span className="w-1 h-8 bg-gradient-to-b from-purple-600 to-blue-600 rounded-full"></span>
            My Creations
          </h3>
          <Suspense fallback={<ProfileCollectionSkeleton />}>
            <UserCollection userId={user.id} page={page} />
          </Suspense>
        </div>
      </section>
    </>
  );
};

// Separate component for collection to enable Suspense streaming
async function UserCollection({
  userId,
  page,
}: {
  userId: string;
  page: number;
}) {
  const images = await getUserImages({ page, userId });

  return (
    <Collection
      images={images?.data}
      totalPages={images?.totalPages}
      page={page}
    />
  );
}

export default Profile;
