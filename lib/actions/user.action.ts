'use server';

import { revalidatePath } from 'next/cache';
import prisma from '../database/prisma';
import { handleError } from '../utils';

// CREATE
export async function createUser(user: CreateUserParams) {
  try {
    //zod validation
    // console.log("createUser_action: ");
    // console.log(JSON.stringify(user));

    const { clerkId, email, username, firstName, lastName, photo } = user;

    const newUser = await prisma.user.create({
      data: {
        clerkId,
        email,
        username,
        firstName,
        lastName,
        photo,
      },
    });

    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    handleError(error);
  }
}

// READ
export async function getUserById(clerkId: string) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        clerkId: clerkId,
      },
    });

    if (!user) throw new Error('User not found');

    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    handleError(error);
  }
}

// UPDATE
export async function updateUser(clerkId: string, user: UpdateUserParams) {
  try {
    const updatedUser = await prisma.user.update({
      where: {
        clerkId: clerkId,
      },
      data: {
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        photo: user.photo,
      },
    });

    if (!updatedUser) throw new Error('User update failed');

    return JSON.parse(JSON.stringify(updatedUser));
  } catch (error) {
    handleError(error);
  }
}

// DELETE
export async function deleteUser(clerkId: string) {
  try {
    // Find user to delete
    const userToDelete = await prisma.user.findFirst({ where: { clerkId } });

    if (!userToDelete) {
      throw new Error('User not found');
    }

    // Delete user
    const deletedUser = await prisma.user.delete({
      where: { id: userToDelete.id },
    });
    revalidatePath('/');

    return deletedUser ? JSON.parse(JSON.stringify(deletedUser)) : null;
  } catch (error) {
    handleError(error);
  }
}

// USE CREDITS
// export async function updateCredits(userId: string, creditFee: number) {
//   try {
//     const updatedUserCredits = await prisma.user.findOneAndUpdate(
//       { _id: userId },
//       { $inc: { creditBalance: creditFee } },
//       { new: true }
//     );

//     if (!updatedUserCredits) throw new Error('User credits update failed');

//     return JSON.parse(JSON.stringify(updatedUserCredits));
//   } catch (error) {
//     handleError(error);
//   }
// }
