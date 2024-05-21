'use server';

import { revalidatePath } from 'next/cache';
import prisma from '../database/prisma';
import { handleError } from '../utils';
import { redirect } from 'next/navigation';

import { v2 as cloudinary } from 'cloudinary';

// ADD IMAGE
export async function addImage({ image, userId, path }: AddImageParams) {
  try {
    const author = await prisma.user.findUnique({ where: { id: userId } });

    if (!author) {
      throw new Error('User not found');
    }

    const newImage = await prisma.image.create({
      data: {
        ...image,
        authorId: userId,
      },
    });

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
      throw new Error('Unauthorized or image not found');
    }

    const updatedImage = await prisma.image.update({
      where: {
        id: imageToUpdate.id,
      },
      data: {
        ...image,
      },
    });

    revalidatePath(path);

    return JSON.parse(JSON.stringify(updatedImage));
  } catch (error) {
    handleError(error);
  }
}

// DELETE IMAGE
export async function deleteImage(imageId: string) {
  try {
    await prisma.image.delete({ where: { id: imageId } });
  } catch (error) {
    handleError(error);
  } finally {
    redirect('/');
  }
}

// GET IMAGE
export async function getImageById(imageId: string) {
  try {
    const image = await prisma.image.findUnique({
      relationLoadStrategy: 'join',
      where: { id: imageId },
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

    if (!image) throw new Error('Image not found');

    return JSON.parse(JSON.stringify(image));
  } catch (error) {
    handleError(error);
  }
}

// GET IMAGES
export async function getAllImages({
  limit = 6,
  page = 1,
  searchQuery = '',
}: {
  limit?: number;
  page: number;
  searchQuery?: string;
}) {
  try {
    cloudinary.config({
      cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
      api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
      secure: true,
    });

    let expression = 'folder=photo-puff';

    if (searchQuery) {
      expression += ` AND ${searchQuery}`;
    }

    const { resources } = await cloudinary.search
      .expression(expression)
      .execute();

    const resourceIds = resources.map((resource: any) => resource.public_id);

    const skipAmount = (Number(page) - 1) * limit;

    let query = {};

    //TODO: contains takes a string not an array
    if (searchQuery) {
      query = {
        where: {
          publicId: {
            contains: resourceIds.join(','),
          },
        },
      };
    }

    const images = await prisma.image.findMany({
      skip: skipAmount,
      take: limit,
      ...query,
      orderBy: {
        updatedAt: 'desc',
      },
    });

    const totalImagesCount = (await prisma.image.findMany(query)).length ?? 0;

    const savedImagesCount = (await prisma.image.findMany()).length ?? 0;

    return {
      data: JSON.parse(JSON.stringify(images)),
      totalPage: Math.ceil(totalImagesCount / limit),
      savedImages: savedImagesCount,
    };
  } catch (error) {
    handleError(error);
  }
}

// GET IMAGES BY USER
export async function getUserImages({
  limit = 6,
  page = 1,
  userId,
}: {
  limit?: number;
  page: number;
  userId: string;
}) {
  try {
    const skipAmount = (Number(page) - 1) * limit;

    const images = await prisma.image.findMany({
      skip: skipAmount,
      take: limit,
      where: {
        authorId: userId,
      },
      orderBy: {
        updatedAt: 'desc',
      },
    });

    const totalImagesCount =
      (await prisma.image.findMany({ where: { authorId: userId } })).length ??
      0;

    return {
      data: JSON.parse(JSON.stringify(images)),
      totalPages: Math.ceil(totalImagesCount / limit),
    };
  } catch (error) {
    handleError(error);
  }
}
