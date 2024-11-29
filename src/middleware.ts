// src/middleware.ts

import { NextResponse } from "next/server";

export default function middleware() {
  return NextResponse.next(); // Accepte toutes les requêtes sans modification
}

// Optionnel : Si tu souhaites configurer des règles spécifiques de routing
export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
