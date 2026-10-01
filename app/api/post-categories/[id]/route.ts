import { postCategoryController } from "@/di/container";
import { handleRoute } from "@/presentation/core/http/handleRoute";

type Context = RouteContext<"/api/post-categories/[id]">;

export const GET = handleRoute<Context>((request, ctx) =>
  postCategoryController.get(request, ctx),
);

export const PATCH = handleRoute<Context>((request, ctx) =>
  postCategoryController.update(request, ctx),
);

export const DELETE = handleRoute<Context>((request, ctx) =>
  postCategoryController.delete(request, ctx),
);
