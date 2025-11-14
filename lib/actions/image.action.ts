"use server";

import { revalidatePath, unstable_cache } from "next/cache";
import prisma from "../database/prisma";
import { handleError } from "../utils";
import { redirect } from "next/navigation";

import { v2 as cloudinary } from "cloudinary";
import { getImagesReturnType, infiniteScrollImageLoadertype } from "../types";
import { CACHE_CONFIG, getCacheTag } from "../cache/cache-config";
import {
  invalidateAllImages,
  invalidateUserImages,
  invalidateImageById,
  invalidateImageCount,
  invalidateUserCaches,
} from "../cache/server-cache-utils";

// ADD IMAGE
export async function addImage({ image, userId, path }: AddImageParams) {
  try {
    const author = await prisma.user.findUnique({ where: { id: userId } });

    if (!author) {
      throw new Error("User not found");
    }

    const newImage = await prisma.image.create({
      data: {
        ...image,
        authorId: userId,
      },
    });

    // Invalidate all relevant caches
    invalidateUserCaches(userId);
    revalidatePath(path);

    return JSON.parse(JSON.stringify(newImage));
  } catch (error) {
    handleError(error);
  }
}

// UPDATE IMAGE
export async function updateImage({ image, userId, path }: UpdateImageParams) {
  try {
    const imageToUpdate = await prisma.image.findUnique({
      where: {
        id: image?.id,
      },
    });

    if (!imageToUpdate || imageToUpdate.authorId !== userId) {
      throw new Error("Unauthorized or image not found");
    }

    const updatedImage = await prisma.image.update({
      where: {
        id: imageToUpdate.id,
      },
      data: {
        ...image,
      },
    });

    // Invalidate specific image and related caches
    invalidateImageById(image.id);
    invalidateUserCaches(userId);
    revalidatePath(path);

    return JSON.parse(JSON.stringify(updatedImage));
  } catch (error) {
    handleError(error);
  }
}

// DELETE IMAGE
export async function deleteImage(imageId: string) {
  try {
    const image = await prisma.image.findUnique({ where: { id: imageId } });
    
    if (image) {
      // Invalidate caches before deletion
      invalidateImageById(imageId);
      if (image.authorId) {
        invalidateUserCaches(image.authorId);
      }
      
      await prisma.image.delete({ where: { id: imageId } });
    }
  } catch (error) {
    handleError(error);
  } finally {
    redirect("/");
  }
}

// GET IMAGE
export async function getImageById(imageId: string) {
  try {
    // Wrap in unstable_cache for server-side caching
    const getCachedImage = unstable_cache(
      async (id: string) => {
        const image = await prisma.image.findUnique({
          relationLoadStrategy: "join",
          where: { id },
          include: {
            author: {
              select: {
                id: true,
                clerkId: true,
                firstName: true,
                lastName: true,
              },
            },
          },
        });

        if (!image) throw new Error("Image not found");
        return image;
      },
      [getCacheTag.imageById(imageId)],
      {
        tags: [getCacheTag.imageById(imageId), CACHE_CONFIG.TAGS.IMAGE_BY_ID],
        revalidate: CACHE_CONFIG.REVALIDATION.IMAGE_BY_ID,
      }
    );

    const image = await getCachedImage(imageId);
    return JSON.parse(JSON.stringify(image));
  } catch (error) {
    handleError(error);
  }
}

// GET IMAGES
export async function getAllImages({
  infiniteScroll = false,
  page = 1,
  limit = 6,
  offset = 0,
  searchQuery = "",
}: {
  infiniteScroll?: boolean;
  page?: number;
  limit?: number;
  offset: number;
  searchQuery?: string;
}): Promise<getImagesReturnType | undefined> {
  try {
    // Wrap in unstable_cache for server-side caching
    const getCachedImages = unstable_cache(
      async () => {
        cloudinary.config({
          cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
          api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
          api_secret: process.env.CLOUDINARY_API_SECRET,
          secure: true,
        });

        let expression = "folder=photo-puff";

        if (searchQuery) {
          expression += ` AND ${searchQuery}`;
        }

        const { resources } = await cloudinary.search
          .expression(expression)
          .execute();

        const resourceIds = resources.map((resource: any) => resource.public_id);

        const skipAmount = infiniteScroll ? offset : (page - 1) * limit;

        let query = {};

        //TODO: contains takes a string not an array
        if (searchQuery) {
          query = {
            where: {
              publicId: {
                contains: resourceIds.join(","),
              },
            },
          };
        }

        const images = await prisma.image.findMany({
          skip: skipAmount,
          take: limit,
          ...query,
          orderBy: {
            updatedAt: "desc",
          },
        });

        const totalImagesCount = (await prisma.image.findMany(query)).length ?? 0;

        const savedImagesCount = (await prisma.image.findMany()).length ?? 0;

        return {
          data: images,
          totalImages: totalImagesCount,
          totalPages: Math.ceil(totalImagesCount / limit),
        };
      },
      [getCacheTag.allImages(searchQuery), `all-images-${offset}-${limit}-${page}`],
      {
        tags: [getCacheTag.allImages(searchQuery), CACHE_CONFIG.TAGS.ALL_IMAGES],
        revalidate: CACHE_CONFIG.REVALIDATION.ALL_IMAGES,
      }
    );

    const result = await getCachedImages();
    return JSON.parse(JSON.stringify(result));
  } catch (error) {
    handleError(error);
  }
}

// GET IMAGES BY USER
export async function getUserImages({
  infiniteScroll = false,
  limit = 6,
  page = 1,
  offset = 0,
  userId,
}: {
  infiniteScroll?: boolean;
  limit?: number;
  page?: number;
  offset?: number;
  userId: string;
}): Promise<getImagesReturnType | undefined> {
  try {
    // Wrap in unstable_cache for server-side caching
    const getCachedUserImages = unstable_cache(
      async () => {
        const skipAmount = infiniteScroll ? offset : (Number(page) - 1) * limit;

        const images = await prisma.image.findMany({
          skip: skipAmount,
          take: limit,
          where: {
            authorId: userId,
          },
          orderBy: {
            updatedAt: "desc",
          },
        });

        const totalImagesCount =
          (await prisma.image.findMany({ where: { authorId: userId } })).length ??
          0;

        return {
          totalImages: totalImagesCount,
          data: images,
          totalPages: Math.ceil(totalImagesCount / limit),
        };
      },
      [getCacheTag.userImages(userId), `user-images-${userId}-${offset}-${limit}-${page}`],
      {
        tags: [getCacheTag.userImages(userId), CACHE_CONFIG.TAGS.USER_IMAGES],
        revalidate: CACHE_CONFIG.REVALIDATION.USER_IMAGES,
      }
    );

    const result = await getCachedUserImages();
    return JSON.parse(JSON.stringify(result));
  } catch (error) {
    handleError(error);
  }
}

export const getImageCount = async ({ userId }: { userId: string }) => {
  try {
    // Wrap in unstable_cache for server-side caching
    const getCachedCount = unstable_cache(
      async () => {
        const count = await prisma.image.count({
          where: { authorId: userId },
        });
        return count;
      },
      [getCacheTag.imageCount(userId)],
      {
        tags: [getCacheTag.imageCount(userId), CACHE_CONFIG.TAGS.IMAGE_COUNT],
        revalidate: CACHE_CONFIG.REVALIDATION.IMAGE_COUNT,
      }
    );

    return await getCachedCount();
  } catch (error) {
    handleError(error);
  }
};

export async function infiniteScrollImageLoader({
  type,
  offset,
  searchQuery,
  userId = undefined,
}: {
  type: infiniteScrollImageLoadertype;
  offset: number;
  searchQuery?: string;
  userId?: string | undefined;
}) {
  switch (type) {
    case infiniteScrollImageLoadertype.ALL:
      return await getAllImages({ infiniteScroll: true, offset, searchQuery });

    case infiniteScrollImageLoadertype.USER:
      if (userId)
        return await getUserImages({ infiniteScroll: true, offset, userId });

    default:
      throw new Error("Invalid type for loadMoreAction");
  }
}
