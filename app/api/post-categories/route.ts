import { postCategoryController } from "@/di/container";
import { handleRoute } from "@/presentation/core/http/handleRoute";

export const GET = handleRoute(() => postCategoryController.list());

export const POST = handleRoute((request) => postCategoryController.create(request));
