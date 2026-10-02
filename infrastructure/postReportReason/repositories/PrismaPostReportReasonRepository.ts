import { PostReportReason } from "@/domain/postReportReason/readmodels/PostReportReason";
import { IPostReportReasonRepository } from "@/domain/postReportReason/repositories/IPostReportReasonRepository";
import DatabaseError from "@/infrastructure/core/errors/DatabaseError";
import { prisma } from "@/infrastructure/prisma/client";

const select = { id: true, reason: true } as const;

export class PrismaPostReportReasonRepository implements IPostReportReasonRepository {
  async list(): Promise<PostReportReason[]> {
    try {
      return await prisma.postReportReason.findMany({ select, orderBy: { createdAt: "asc" } });
    } catch (error) {
      throw new DatabaseError("Could not fetch PostReportReason records", { cause: error });
    }
  }

  async findById(id: string): Promise<PostReportReason | null> {
    try {
      return await prisma.postReportReason.findUnique({ where: { id }, select });
    } catch (error) {
      throw new DatabaseError("Could not find PostReportReason", { cause: error });
    }
  }
}
