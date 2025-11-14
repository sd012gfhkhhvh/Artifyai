import { getUserImages } from "@/lib/actions/image.action";
import { Collection } from "./Collection";
import { infiniteScrollImageLoadertype } from "@/lib/types";

export async function UserImagesCollection({
  userId,
  page,
}: {
  userId: string;
  page: number;
}) {
  const images = await getUserImages({
    infiniteScroll: true,
    offset: 0,
    limit: 6,
    userId,
  });

  if (images === undefined) {
    return null;
  }

  return (
    <Collection
      type={infiniteScrollImageLoadertype.USER}
      userId={userId}
      hasSearch={false}
      initialImages={images?.data}
      totalImageCount={images?.totalImages}
    />
  );
}
