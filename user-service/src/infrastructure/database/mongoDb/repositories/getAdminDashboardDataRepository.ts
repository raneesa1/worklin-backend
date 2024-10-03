import { HireModel } from "../model/hireModel";
import { PipelineStage } from "mongoose";

export async function getAdminDashboardDataRepository(
  timeRange: string
): Promise<AdminDashboardData> {
  try {
    const startDate = getStartDate(timeRange);

    const pipeline: PipelineStage[] = [
      {
        $match: {
          createdAt: { $gte: startDate },
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
          hires: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
      {
        $project: {
          month: "$_id",
          hires: 1,
          _id: 0,
        },
      },
    ] as PipelineStage[];

    const hiringData = await HireModel.aggregate(pipeline);
    console.log(hiringData, "consoling the hiring data");
    return {
      hiringData,
    };
  } catch (error) {
    console.error("Error fetching admin dashboard data", error);
    throw new Error("Error fetching admin dashboard data");
  }
}

// Helper function to get start date based on time range
function getStartDate(timeRange: string): Date {
  const now = new Date();
  switch (timeRange) {
    case "pastMonth":
      return new Date(now.setMonth(now.getMonth() - 1));
    case "last6Months":
      return new Date(now.setMonth(now.getMonth() - 6));
    case "pastYear":
      return new Date(now.setFullYear(now.getFullYear() - 1));
    case "allTime":
    default:
      return new Date(0); // Beginning of time
  }
}
