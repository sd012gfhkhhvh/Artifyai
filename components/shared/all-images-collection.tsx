import { getAllImages } from "@/lib/actions/image.action";
import { Collection } from "./Collection";
import { infiniteScrollImageLoadertype } from "@/lib/types";

export const NUMBER_OF_IMAGES_TO_FETCH = 6;

export async function AllImagesCollection({
  searchQuery,
}: {
  searchQuery: string;
}) {
  const images = await getAllImages({
    limit: NUMBER_OF_IMAGES_TO_FETCH,
    offset: 0,
    searchQuery,
  });

  if (images === undefined) {
    return null;
  }

  return (
    <Collection
      type={infiniteScrollImageLoadertype.ALL}
      hasSearch={true}
      searchQuery={searchQuery}
      initialImages={images?.data}
      totalImageCount={images?.totalImages}
    />
  );
}
