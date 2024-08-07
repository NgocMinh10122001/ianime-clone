import { PrismaClient } from "@prisma/client";
declare global {
  namespace globalThis {
    var prismadb = new PrismaClient();
  }
  interface Window {
    onYouTubeIframeAPIReady?: () => void;
  }
}
