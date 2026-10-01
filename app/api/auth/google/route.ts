import { googleAuthController } from "@/di/container";

// POST (a form submit) so no link prefetch can start the flow and overwrite the state cookies.
export const POST = (request: Request) => googleAuthController.start(request);
