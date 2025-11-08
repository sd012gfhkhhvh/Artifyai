"use server";

import prisma from "../database/prisma";
import { handleError } from "../utils";
import moment from "moment-timezone";

// prisma.$use(async (params, next) => {
//   const result = await next(params);
//   // runs after query execution
//   if (params.model == "image" && params.action == "findMany") {
//     // Logic only runs for findMany action and image model
//     for (const record of result) {
//       // Convert Date fields to UTC strings
//       if (record.createdAt) {
//         record.createdAt = moment(record.createdAt)
//           .tz(moment.tz.guess())
//           .format();
//         if (record.updatedAt) {
//           record.updatedAt = moment(record.updatedAt)
//             .tz(moment.tz.guess())
//             .format();
//         }
//       }
//     }
//   }
//   return result;
// });

// Convert date fields from UTC to local(browser) timezone
function convertToLocalTimezone(images: any[]) {
  return images.map((image) => ({
    ...image,
    createdAt: image.createdAt
      ? moment(image.createdAt).tz(moment.tz.guess()).format()
      : image.createdAt,
    updatedAt: image.updatedAt
      ? moment(image.updatedAt).tz(moment.tz.guess()).format()
      : image.updatedAt,
  }));
}

// Get user analytics and statistics
export async function getUserAnalytics(userId: string) {
  try {
    const response = await prisma.image.findMany({
      where: {
        authorId: userId,
      },
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        title: true,
        transformationType: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    const images = convertToLocalTimezone(response);

    // Get transformation type breakdown
    const transformationBreakdown = images.reduce((acc: any, image) => {
      const type = image.transformationType;

      if (!acc[type]) {
        acc[type] = 0;
      }
      acc[type]++;
      return acc;
    }, {});

    // Get activity by date (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const recentImages = images.filter(
      (img) => new Date(img.createdAt) >= thirtyDaysAgo
    );

    // Group by date
    const activityByDate = recentImages.reduce((acc: any, image) => {
      const date = new Date(image.createdAt).toLocaleDateString();

      if (!acc[date]) {
        acc[date] = 0;
      }
      acc[date]++;
      return acc;
    }, {});

    // Fill in missing dates with 0
    const activityData = [];
    for (let i = 29; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toLocaleDateString();
      activityData.push({
        date: dateStr,
        count: activityByDate[dateStr] || 0,
      });
    }

    // Get weekly breakdown (last 4 weeks)
    const weeklyData = [];
    for (let i = 3; i >= 0; i--) {
      const weekStart = new Date();
      weekStart.setDate(weekStart.getDate() - (i + 1) * 7);
      const weekEnd = new Date();
      weekEnd.setDate(weekEnd.getDate() - i * 7);

      const weekImages = recentImages.filter((img) => {
        const imgDate = new Date(img.createdAt);
        return imgDate >= weekStart && imgDate < weekEnd;
      });

      weeklyData.push({
        week: `Week ${4 - i}`,
        count: weekImages.length,
      });
    }

    // Recent activity (last 5)
    const recentActivity = images.slice(0, 5).map((img) => ({
      id: img.id,
      title: img.title,
      type: img.transformationType,
      createdAt: img.createdAt,
    }));

    return JSON.parse(
      JSON.stringify({
        totalImages: images.length,
        transformationBreakdown,
        activityByDate: activityData,
        weeklyData,
        recentActivity,
        totalThisMonth: recentImages.length,
      })
    );
  } catch (error) {
    handleError(error);
    return {
      totalImages: 0,
      transformationBreakdown: {},
      activityByDate: [],
      weeklyData: [],
      recentActivity: [],
      totalThisMonth: 0,
    };
  }
}
