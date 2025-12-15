(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["chunks/[root-of-the-server]__abcd892d._.js",
"[externals]/node:buffer [external] (node:buffer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:buffer", () => require("node:buffer"));

module.exports = mod;
}),
"[externals]/node:async_hooks [external] (node:async_hooks, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:async_hooks", () => require("node:async_hooks"));

module.exports = mod;
}),
"[project]/ [middleware-edge] (unsupported edge import 'stream', ecmascript)", ((__turbopack_context__, module, exports) => {

__turbopack_context__.n(__import_unsupported(`stream`));
}),
"[externals]/node:util [external] (node:util, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:util", () => require("node:util"));

module.exports = mod;
}),
"[project]/ [middleware-edge] (unsupported edge import 'crypto', ecmascript)", ((__turbopack_context__, module, exports) => {

__turbopack_context__.n(__import_unsupported(`crypto`));
}),
"[project]/handmade-arts-e-commerce/middleware.js [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "config",
    ()=>config,
    "middleware",
    ()=>middleware
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$handmade$2d$arts$2d$e$2d$commerce$2f$node_modules$2f$next$2f$dist$2f$esm$2f$api$2f$server$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/handmade-arts-e-commerce/node_modules/next/dist/esm/api/server.js [middleware-edge] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$handmade$2d$arts$2d$e$2d$commerce$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/handmade-arts-e-commerce/node_modules/next/dist/esm/server/web/exports/index.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$handmade$2d$arts$2d$e$2d$commerce$2f$node_modules$2f$jsonwebtoken$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/handmade-arts-e-commerce/node_modules/jsonwebtoken/index.js [middleware-edge] (ecmascript)");
;
;
function middleware(request) {
    const { pathname } = request.nextUrl;
    // Exclude API routes from middleware checks (they handle their own auth)
    if (pathname.startsWith("/api/")) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$handmade$2d$arts$2d$e$2d$commerce$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].next();
    }
    const isUserProtected = pathname.startsWith("/private");
    const isSellerProtected = pathname.startsWith("/seller") && !pathname.startsWith("/seller/login") && !pathname.startsWith("/seller/register");
    if (!isUserProtected && !isSellerProtected) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$handmade$2d$arts$2d$e$2d$commerce$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].next();
    }
    const refreshCookieName = isSellerProtected ? "sellerRefreshToken" : "refreshToken";
    const redirectUrl = isSellerProtected ? "/seller/login" : "/login";
    const jwtSecret = isSellerProtected ? process.env.JWT_SECRET : process.env.JWT_SECRET;
    const jwtRefreshSecret = isSellerProtected ? process.env.JWT_REFRESH_SECRET : process.env.JWT_REFRESH_SECRET;
    // Check for refreshToken cookie first
    const refreshToken = request.cookies.get(refreshCookieName)?.value;
    // If refreshToken exists, verify it
    if (refreshToken) {
        try {
            const payload = __TURBOPACK__imported__module__$5b$project$5d2f$handmade$2d$arts$2d$e$2d$commerce$2f$node_modules$2f$jsonwebtoken$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["default"].verify(refreshToken, jwtRefreshSecret);
            const response = __TURBOPACK__imported__module__$5b$project$5d2f$handmade$2d$arts$2d$e$2d$commerce$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].next();
            response.cookies.set(refreshCookieName, refreshToken, {
                httpOnly: true,
                secure: ("TURBOPACK compile-time value", "development") === "production",
                sameSite: "strict",
                path: "/",
                maxAge: 60 * 60 * 24 * 7
            });
            response.headers.set("x-user-id", payload.sub || "");
            return response;
        } catch (error) {
            console.error("Middleware refreshToken verification failed", error);
        // Fall through to check accessToken
        }
    }
    // If no refreshToken or invalid, check for accessToken in Authorization header
    const authHeader = request.headers.get("authorization");
    const bearerToken = authHeader?.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;
    if (bearerToken) {
        try {
            const payload = __TURBOPACK__imported__module__$5b$project$5d2f$handmade$2d$arts$2d$e$2d$commerce$2f$node_modules$2f$jsonwebtoken$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["default"].verify(bearerToken, jwtSecret);
            const response = __TURBOPACK__imported__module__$5b$project$5d2f$handmade$2d$arts$2d$e$2d$commerce$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].next();
            response.headers.set("x-user-id", payload.sub || "");
            return response;
        } catch (error) {
            console.error("Middleware accessToken verification failed", error);
        // Fall through to redirect
        }
    }
    // No valid token found, redirect to login
    return __TURBOPACK__imported__module__$5b$project$5d2f$handmade$2d$arts$2d$e$2d$commerce$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].redirect(new URL(redirectUrl, request.url));
}
const config = {
    matcher: [
        "/private/:path*",
        "/seller/:path*"
    ]
};
}),
]);

//# sourceMappingURL=%5Broot-of-the-server%5D__abcd892d._.js.map