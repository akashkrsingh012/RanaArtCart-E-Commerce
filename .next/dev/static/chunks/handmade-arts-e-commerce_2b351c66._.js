(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/handmade-arts-e-commerce/app/orders/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>OrdersPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$handmade$2d$arts$2d$e$2d$commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/handmade-arts-e-commerce/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$handmade$2d$arts$2d$e$2d$commerce$2f$contexts$2f$user$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/handmade-arts-e-commerce/contexts/user-context.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$handmade$2d$arts$2d$e$2d$commerce$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$package$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Package$3e$__ = __turbopack_context__.i("[project]/handmade-arts-e-commerce/node_modules/lucide-react/dist/esm/icons/package.js [app-client] (ecmascript) <export default as Package>");
var __TURBOPACK__imported__module__$5b$project$5d2f$handmade$2d$arts$2d$e$2d$commerce$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/handmade-arts-e-commerce/node_modules/lucide-react/dist/esm/icons/clock.js [app-client] (ecmascript) <export default as Clock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$handmade$2d$arts$2d$e$2d$commerce$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__ = __turbopack_context__.i("[project]/handmade-arts-e-commerce/node_modules/lucide-react/dist/esm/icons/circle-check.js [app-client] (ecmascript) <export default as CheckCircle2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$handmade$2d$arts$2d$e$2d$commerce$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__ = __turbopack_context__.i("[project]/handmade-arts-e-commerce/node_modules/lucide-react/dist/esm/icons/circle-x.js [app-client] (ecmascript) <export default as XCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$handmade$2d$arts$2d$e$2d$commerce$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$truck$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Truck$3e$__ = __turbopack_context__.i("[project]/handmade-arts-e-commerce/node_modules/lucide-react/dist/esm/icons/truck.js [app-client] (ecmascript) <export default as Truck>");
var __TURBOPACK__imported__module__$5b$project$5d2f$handmade$2d$arts$2d$e$2d$commerce$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$bag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingBag$3e$__ = __turbopack_context__.i("[project]/handmade-arts-e-commerce/node_modules/lucide-react/dist/esm/icons/shopping-bag.js [app-client] (ecmascript) <export default as ShoppingBag>");
var __TURBOPACK__imported__module__$5b$project$5d2f$handmade$2d$arts$2d$e$2d$commerce$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/handmade-arts-e-commerce/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-client] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$handmade$2d$arts$2d$e$2d$commerce$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/handmade-arts-e-commerce/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$handmade$2d$arts$2d$e$2d$commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/handmade-arts-e-commerce/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$handmade$2d$arts$2d$e$2d$commerce$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/handmade-arts-e-commerce/node_modules/next/navigation.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
function OrdersPage() {
    _s();
    const { user, isLoggedIn, orders, cancelOrder, fetchOrders } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$handmade$2d$arts$2d$e$2d$commerce$2f$contexts$2f$user$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUser"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$handmade$2d$arts$2d$e$2d$commerce$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [cancellingId, setCancellingId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$handmade$2d$arts$2d$e$2d$commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$handmade$2d$arts$2d$e$2d$commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "OrdersPage.useEffect": ()=>{
            if (!isLoggedIn) {
                router.push("/login");
            }
        }
    }["OrdersPage.useEffect"], [
        isLoggedIn,
        router
    ]);
    // In case orders are not fetched yet
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$handmade$2d$arts$2d$e$2d$commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "OrdersPage.useEffect": ()=>{
            if (isLoggedIn) fetchOrders();
        }
    }["OrdersPage.useEffect"], [
        isLoggedIn
    ]);
    const handleCancel = async (orderId)=>{
        if (confirm("Are you sure you want to cancel this order?")) {
            setCancellingId(orderId);
            try {
                await cancelOrder(orderId);
            } catch (error) {
                alert("Failed to cancel order");
            } finally{
                setCancellingId(null);
            }
        }
    };
    if (!user) return null;
    const getStatusIcon = (status)=>{
        switch(status.toLowerCase()){
            case "pending":
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$handmade$2d$arts$2d$e$2d$commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$handmade$2d$arts$2d$e$2d$commerce$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                    className: "text-yellow-500"
                }, void 0, false, {
                    fileName: "[project]/handmade-arts-e-commerce/app/orders/page.tsx",
                    lineNumber: 42,
                    columnNumber: 30
                }, this);
            case "processing":
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$handmade$2d$arts$2d$e$2d$commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$handmade$2d$arts$2d$e$2d$commerce$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$package$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Package$3e$__["Package"], {
                    className: "text-blue-500"
                }, void 0, false, {
                    fileName: "[project]/handmade-arts-e-commerce/app/orders/page.tsx",
                    lineNumber: 43,
                    columnNumber: 33
                }, this);
            case "shipped":
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$handmade$2d$arts$2d$e$2d$commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$handmade$2d$arts$2d$e$2d$commerce$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$truck$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Truck$3e$__["Truck"], {
                    className: "text-indigo-500"
                }, void 0, false, {
                    fileName: "[project]/handmade-arts-e-commerce/app/orders/page.tsx",
                    lineNumber: 44,
                    columnNumber: 30
                }, this);
            case "delivered":
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$handmade$2d$arts$2d$e$2d$commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$handmade$2d$arts$2d$e$2d$commerce$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                    className: "text-green-500"
                }, void 0, false, {
                    fileName: "[project]/handmade-arts-e-commerce/app/orders/page.tsx",
                    lineNumber: 45,
                    columnNumber: 32
                }, this);
            case "cancelled":
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$handmade$2d$arts$2d$e$2d$commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$handmade$2d$arts$2d$e$2d$commerce$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__["XCircle"], {
                    className: "text-red-500"
                }, void 0, false, {
                    fileName: "[project]/handmade-arts-e-commerce/app/orders/page.tsx",
                    lineNumber: 46,
                    columnNumber: 32
                }, this);
            default:
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$handmade$2d$arts$2d$e$2d$commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$handmade$2d$arts$2d$e$2d$commerce$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$package$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Package$3e$__["Package"], {
                    className: "text-gray-500"
                }, void 0, false, {
                    fileName: "[project]/handmade-arts-e-commerce/app/orders/page.tsx",
                    lineNumber: 47,
                    columnNumber: 23
                }, this);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$handmade$2d$arts$2d$e$2d$commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-background py-8 px-4 sm:px-6 lg:px-8",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$handmade$2d$arts$2d$e$2d$commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-4xl mx-auto",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$handmade$2d$arts$2d$e$2d$commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-between mb-8",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$handmade$2d$arts$2d$e$2d$commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            className: "text-3xl font-bold",
                            children: "My Orders"
                        }, void 0, false, {
                            fileName: "[project]/handmade-arts-e-commerce/app/orders/page.tsx",
                            lineNumber: 55,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$handmade$2d$arts$2d$e$2d$commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$handmade$2d$arts$2d$e$2d$commerce$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: "/",
                            className: "text-primary hover:underline",
                            children: "Continue Shopping"
                        }, void 0, false, {
                            fileName: "[project]/handmade-arts-e-commerce/app/orders/page.tsx",
                            lineNumber: 56,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/handmade-arts-e-commerce/app/orders/page.tsx",
                    lineNumber: 54,
                    columnNumber: 9
                }, this),
                orders.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$handmade$2d$arts$2d$e$2d$commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-center py-16 bg-card rounded-lg border border-border",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$handmade$2d$arts$2d$e$2d$commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$handmade$2d$arts$2d$e$2d$commerce$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$bag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingBag$3e$__["ShoppingBag"], {
                            size: 64,
                            className: "mx-auto text-muted-foreground mb-4"
                        }, void 0, false, {
                            fileName: "[project]/handmade-arts-e-commerce/app/orders/page.tsx",
                            lineNumber: 63,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$handmade$2d$arts$2d$e$2d$commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-xl font-semibold mb-2",
                            children: "No orders placed yet"
                        }, void 0, false, {
                            fileName: "[project]/handmade-arts-e-commerce/app/orders/page.tsx",
                            lineNumber: 64,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$handmade$2d$arts$2d$e$2d$commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-muted-foreground mb-6",
                            children: "Looks like you haven't bought anything yet."
                        }, void 0, false, {
                            fileName: "[project]/handmade-arts-e-commerce/app/orders/page.tsx",
                            lineNumber: 65,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$handmade$2d$arts$2d$e$2d$commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$handmade$2d$arts$2d$e$2d$commerce$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: "/",
                            className: "px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors",
                            children: "Start Shopping"
                        }, void 0, false, {
                            fileName: "[project]/handmade-arts-e-commerce/app/orders/page.tsx",
                            lineNumber: 66,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/handmade-arts-e-commerce/app/orders/page.tsx",
                    lineNumber: 62,
                    columnNumber: 11
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$handmade$2d$arts$2d$e$2d$commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-6",
                    children: orders.map((order)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$handmade$2d$arts$2d$e$2d$commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-card rounded-lg border border-border overflow-hidden shadow-sm",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$handmade$2d$arts$2d$e$2d$commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "p-4 bg-muted/30 border-b border-border flex flex-col sm:flex-row justify-between gap-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$handmade$2d$arts$2d$e$2d$commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$handmade$2d$arts$2d$e$2d$commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-sm text-muted-foreground",
                                                    children: "Order ID"
                                                }, void 0, false, {
                                                    fileName: "[project]/handmade-arts-e-commerce/app/orders/page.tsx",
                                                    lineNumber: 79,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$handmade$2d$arts$2d$e$2d$commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "font-mono text-sm font-medium",
                                                    children: order._id
                                                }, void 0, false, {
                                                    fileName: "[project]/handmade-arts-e-commerce/app/orders/page.tsx",
                                                    lineNumber: 80,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/handmade-arts-e-commerce/app/orders/page.tsx",
                                            lineNumber: 78,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$handmade$2d$arts$2d$e$2d$commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$handmade$2d$arts$2d$e$2d$commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-sm text-muted-foreground",
                                                    children: "Date"
                                                }, void 0, false, {
                                                    fileName: "[project]/handmade-arts-e-commerce/app/orders/page.tsx",
                                                    lineNumber: 83,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$handmade$2d$arts$2d$e$2d$commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "font-medium",
                                                    children: new Date(order.createdAt).toLocaleDateString()
                                                }, void 0, false, {
                                                    fileName: "[project]/handmade-arts-e-commerce/app/orders/page.tsx",
                                                    lineNumber: 84,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/handmade-arts-e-commerce/app/orders/page.tsx",
                                            lineNumber: 82,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$handmade$2d$arts$2d$e$2d$commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$handmade$2d$arts$2d$e$2d$commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-sm text-muted-foreground",
                                                    children: "Total Amount"
                                                }, void 0, false, {
                                                    fileName: "[project]/handmade-arts-e-commerce/app/orders/page.tsx",
                                                    lineNumber: 87,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$handmade$2d$arts$2d$e$2d$commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "font-medium",
                                                    children: [
                                                        "₹",
                                                        order.totalAmount.toLocaleString("en-IN")
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/handmade-arts-e-commerce/app/orders/page.tsx",
                                                    lineNumber: 88,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/handmade-arts-e-commerce/app/orders/page.tsx",
                                            lineNumber: 86,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$handmade$2d$arts$2d$e$2d$commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-2",
                                            children: [
                                                getStatusIcon(order.status),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$handmade$2d$arts$2d$e$2d$commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-medium capitalize",
                                                    children: order.status
                                                }, void 0, false, {
                                                    fileName: "[project]/handmade-arts-e-commerce/app/orders/page.tsx",
                                                    lineNumber: 92,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/handmade-arts-e-commerce/app/orders/page.tsx",
                                            lineNumber: 90,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/handmade-arts-e-commerce/app/orders/page.tsx",
                                    lineNumber: 77,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$handmade$2d$arts$2d$e$2d$commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "p-4 space-y-4",
                                    children: order.items.map((item, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$handmade$2d$arts$2d$e$2d$commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex gap-4",
                                            children: [
                                                item.image && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$handmade$2d$arts$2d$e$2d$commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "w-20 h-20 rounded-md overflow-hidden bg-muted flex-shrink-0",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$handmade$2d$arts$2d$e$2d$commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                        src: item.image,
                                                        alt: item.name,
                                                        className: "w-full h-full object-cover"
                                                    }, void 0, false, {
                                                        fileName: "[project]/handmade-arts-e-commerce/app/orders/page.tsx",
                                                        lineNumber: 101,
                                                        columnNumber: 27
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/handmade-arts-e-commerce/app/orders/page.tsx",
                                                    lineNumber: 100,
                                                    columnNumber: 25
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$handmade$2d$arts$2d$e$2d$commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex-1",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$handmade$2d$arts$2d$e$2d$commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex justify-between items-start",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$handmade$2d$arts$2d$e$2d$commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                                    className: `font-medium ${item.status === 'cancelled' ? 'text-slate-400 line-through' : ''}`,
                                                                    children: item.name
                                                                }, void 0, false, {
                                                                    fileName: "[project]/handmade-arts-e-commerce/app/orders/page.tsx",
                                                                    lineNumber: 107,
                                                                    columnNumber: 27
                                                                }, this),
                                                                item.status === 'cancelled' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$handmade$2d$arts$2d$e$2d$commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "px-2 py-1 bg-red-100 text-red-700 text-xs font-bold rounded uppercase tracking-wide",
                                                                    children: "Out of Stock / Cancelled"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/handmade-arts-e-commerce/app/orders/page.tsx",
                                                                    lineNumber: 109,
                                                                    columnNumber: 29
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/handmade-arts-e-commerce/app/orders/page.tsx",
                                                            lineNumber: 106,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$handmade$2d$arts$2d$e$2d$commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-sm text-muted-foreground",
                                                            children: [
                                                                "Qty: ",
                                                                item.quantity
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/handmade-arts-e-commerce/app/orders/page.tsx",
                                                            lineNumber: 114,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$handmade$2d$arts$2d$e$2d$commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-sm font-semibold mt-1",
                                                            children: [
                                                                "₹",
                                                                item.price.toLocaleString("en-IN")
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/handmade-arts-e-commerce/app/orders/page.tsx",
                                                            lineNumber: 115,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/handmade-arts-e-commerce/app/orders/page.tsx",
                                                    lineNumber: 105,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, idx, true, {
                                            fileName: "[project]/handmade-arts-e-commerce/app/orders/page.tsx",
                                            lineNumber: 98,
                                            columnNumber: 21
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/handmade-arts-e-commerce/app/orders/page.tsx",
                                    lineNumber: 96,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$handmade$2d$arts$2d$e$2d$commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "p-4 bg-muted/10 border-t border-border flex justify-end",
                                    children: order.status === "Pending" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$handmade$2d$arts$2d$e$2d$commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>handleCancel(order._id),
                                        disabled: cancellingId === order._id,
                                        className: "text-red-600 hover:text-red-700 text-sm font-medium flex items-center gap-2 px-4 py-2 border border-red-200 rounded-md hover:bg-red-50 transition-colors",
                                        children: [
                                            cancellingId === order._id && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$handmade$2d$arts$2d$e$2d$commerce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$handmade$2d$arts$2d$e$2d$commerce$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                                size: 14,
                                                className: "animate-spin"
                                            }, void 0, false, {
                                                fileName: "[project]/handmade-arts-e-commerce/app/orders/page.tsx",
                                                lineNumber: 128,
                                                columnNumber: 54
                                            }, this),
                                            "Cancel Order"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/handmade-arts-e-commerce/app/orders/page.tsx",
                                        lineNumber: 123,
                                        columnNumber: 21
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/handmade-arts-e-commerce/app/orders/page.tsx",
                                    lineNumber: 121,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, order._id || Math.random(), true, {
                            fileName: "[project]/handmade-arts-e-commerce/app/orders/page.tsx",
                            lineNumber: 76,
                            columnNumber: 15
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/handmade-arts-e-commerce/app/orders/page.tsx",
                    lineNumber: 74,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/handmade-arts-e-commerce/app/orders/page.tsx",
            lineNumber: 53,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/handmade-arts-e-commerce/app/orders/page.tsx",
        lineNumber: 52,
        columnNumber: 5
    }, this);
}
_s(OrdersPage, "AA9kny42l6fY8wkGXgwjO5u+npM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$handmade$2d$arts$2d$e$2d$commerce$2f$contexts$2f$user$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUser"],
        __TURBOPACK__imported__module__$5b$project$5d2f$handmade$2d$arts$2d$e$2d$commerce$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = OrdersPage;
var _c;
__turbopack_context__.k.register(_c, "OrdersPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/handmade-arts-e-commerce/node_modules/lucide-react/dist/esm/icons/package.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "default",
    ()=>Package
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$handmade$2d$arts$2d$e$2d$commerce$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/handmade-arts-e-commerce/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const Package = (0, __TURBOPACK__imported__module__$5b$project$5d2f$handmade$2d$arts$2d$e$2d$commerce$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("Package", [
    [
        "path",
        {
            d: "M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z",
            key: "1a0edw"
        }
    ],
    [
        "path",
        {
            d: "M12 22V12",
            key: "d0xqtd"
        }
    ],
    [
        "path",
        {
            d: "m3.3 7 7.703 4.734a2 2 0 0 0 1.994 0L20.7 7",
            key: "yx3hmr"
        }
    ],
    [
        "path",
        {
            d: "m7.5 4.27 9 5.15",
            key: "1c824w"
        }
    ]
]);
;
 //# sourceMappingURL=package.js.map
}),
"[project]/handmade-arts-e-commerce/node_modules/lucide-react/dist/esm/icons/package.js [app-client] (ecmascript) <export default as Package>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Package",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$handmade$2d$arts$2d$e$2d$commerce$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$package$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$handmade$2d$arts$2d$e$2d$commerce$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$package$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/handmade-arts-e-commerce/node_modules/lucide-react/dist/esm/icons/package.js [app-client] (ecmascript)");
}),
"[project]/handmade-arts-e-commerce/node_modules/lucide-react/dist/esm/icons/clock.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "default",
    ()=>Clock
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$handmade$2d$arts$2d$e$2d$commerce$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/handmade-arts-e-commerce/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const Clock = (0, __TURBOPACK__imported__module__$5b$project$5d2f$handmade$2d$arts$2d$e$2d$commerce$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("Clock", [
    [
        "circle",
        {
            cx: "12",
            cy: "12",
            r: "10",
            key: "1mglay"
        }
    ],
    [
        "polyline",
        {
            points: "12 6 12 12 16 14",
            key: "68esgv"
        }
    ]
]);
;
 //# sourceMappingURL=clock.js.map
}),
"[project]/handmade-arts-e-commerce/node_modules/lucide-react/dist/esm/icons/clock.js [app-client] (ecmascript) <export default as Clock>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Clock",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$handmade$2d$arts$2d$e$2d$commerce$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$handmade$2d$arts$2d$e$2d$commerce$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/handmade-arts-e-commerce/node_modules/lucide-react/dist/esm/icons/clock.js [app-client] (ecmascript)");
}),
"[project]/handmade-arts-e-commerce/node_modules/lucide-react/dist/esm/icons/circle-check.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "default",
    ()=>CircleCheck
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$handmade$2d$arts$2d$e$2d$commerce$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/handmade-arts-e-commerce/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const CircleCheck = (0, __TURBOPACK__imported__module__$5b$project$5d2f$handmade$2d$arts$2d$e$2d$commerce$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("CircleCheck", [
    [
        "circle",
        {
            cx: "12",
            cy: "12",
            r: "10",
            key: "1mglay"
        }
    ],
    [
        "path",
        {
            d: "m9 12 2 2 4-4",
            key: "dzmm74"
        }
    ]
]);
;
 //# sourceMappingURL=circle-check.js.map
}),
"[project]/handmade-arts-e-commerce/node_modules/lucide-react/dist/esm/icons/circle-check.js [app-client] (ecmascript) <export default as CheckCircle2>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CheckCircle2",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$handmade$2d$arts$2d$e$2d$commerce$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$handmade$2d$arts$2d$e$2d$commerce$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/handmade-arts-e-commerce/node_modules/lucide-react/dist/esm/icons/circle-check.js [app-client] (ecmascript)");
}),
"[project]/handmade-arts-e-commerce/node_modules/lucide-react/dist/esm/icons/circle-x.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "default",
    ()=>CircleX
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$handmade$2d$arts$2d$e$2d$commerce$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/handmade-arts-e-commerce/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const CircleX = (0, __TURBOPACK__imported__module__$5b$project$5d2f$handmade$2d$arts$2d$e$2d$commerce$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("CircleX", [
    [
        "circle",
        {
            cx: "12",
            cy: "12",
            r: "10",
            key: "1mglay"
        }
    ],
    [
        "path",
        {
            d: "m15 9-6 6",
            key: "1uzhvr"
        }
    ],
    [
        "path",
        {
            d: "m9 9 6 6",
            key: "z0biqf"
        }
    ]
]);
;
 //# sourceMappingURL=circle-x.js.map
}),
"[project]/handmade-arts-e-commerce/node_modules/lucide-react/dist/esm/icons/circle-x.js [app-client] (ecmascript) <export default as XCircle>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "XCircle",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$handmade$2d$arts$2d$e$2d$commerce$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$handmade$2d$arts$2d$e$2d$commerce$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/handmade-arts-e-commerce/node_modules/lucide-react/dist/esm/icons/circle-x.js [app-client] (ecmascript)");
}),
"[project]/handmade-arts-e-commerce/node_modules/lucide-react/dist/esm/icons/shopping-bag.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "default",
    ()=>ShoppingBag
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$handmade$2d$arts$2d$e$2d$commerce$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/handmade-arts-e-commerce/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const ShoppingBag = (0, __TURBOPACK__imported__module__$5b$project$5d2f$handmade$2d$arts$2d$e$2d$commerce$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("ShoppingBag", [
    [
        "path",
        {
            d: "M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z",
            key: "hou9p0"
        }
    ],
    [
        "path",
        {
            d: "M3 6h18",
            key: "d0wm0j"
        }
    ],
    [
        "path",
        {
            d: "M16 10a4 4 0 0 1-8 0",
            key: "1ltviw"
        }
    ]
]);
;
 //# sourceMappingURL=shopping-bag.js.map
}),
"[project]/handmade-arts-e-commerce/node_modules/lucide-react/dist/esm/icons/shopping-bag.js [app-client] (ecmascript) <export default as ShoppingBag>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ShoppingBag",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$handmade$2d$arts$2d$e$2d$commerce$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$bag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$handmade$2d$arts$2d$e$2d$commerce$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$bag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/handmade-arts-e-commerce/node_modules/lucide-react/dist/esm/icons/shopping-bag.js [app-client] (ecmascript)");
}),
"[project]/handmade-arts-e-commerce/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "default",
    ()=>LoaderCircle
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$handmade$2d$arts$2d$e$2d$commerce$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/handmade-arts-e-commerce/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const LoaderCircle = (0, __TURBOPACK__imported__module__$5b$project$5d2f$handmade$2d$arts$2d$e$2d$commerce$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("LoaderCircle", [
    [
        "path",
        {
            d: "M21 12a9 9 0 1 1-6.219-8.56",
            key: "13zald"
        }
    ]
]);
;
 //# sourceMappingURL=loader-circle.js.map
}),
"[project]/handmade-arts-e-commerce/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-client] (ecmascript) <export default as Loader2>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Loader2",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$handmade$2d$arts$2d$e$2d$commerce$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$handmade$2d$arts$2d$e$2d$commerce$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/handmade-arts-e-commerce/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-client] (ecmascript)");
}),
]);

//# sourceMappingURL=handmade-arts-e-commerce_2b351c66._.js.map