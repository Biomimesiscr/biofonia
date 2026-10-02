import { IPostReportRepository } from "@/domain/postReport/repositories/IPostReportRepository";
import DatabaseError from "@/infrastructure/core/errors/DatabaseError";
import { prisma } from "@/infrastructure/prisma/client";

export class PrismaPostReportRepository implements IPostReportRepository {
  async exists(postId: string, userId: string): Promise<boolean> {
    try {
      const row = await prisma.postReport.findFirst({ where: { postId, userId }, select: { id: true } });
      return row !== null;
    } catch (error) {
      throw new DatabaseError("Could not find PostReport", { cause: error });
    }
  }

  async create(postId: string, userId: string, reasonId: string): Promise<void> {
    try {
      await prisma.postReport.create({ data: { postId, userId, reasonId } });
    } catch (error) {
      throw new DatabaseError("Could not create PostReport", { cause: error });
    }
  }
}
