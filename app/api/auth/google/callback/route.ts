import { googleAuthController } from "@/di/container";

export const GET = (request: Request) => googleAuthController.callback(request);
