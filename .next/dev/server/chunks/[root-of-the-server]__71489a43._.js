module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/buffer [external] (buffer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("buffer", () => require("buffer"));

module.exports = mod;
}),
"[externals]/stream [external] (stream, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}),
"[externals]/util [external] (util, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("util", () => require("util"));

module.exports = mod;
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[externals]/mongoose [external] (mongoose, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("mongoose", () => require("mongoose"));

module.exports = mod;
}),
"[project]/handmade-arts-e-commerce/lib/mongodb.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "connectToDatabase",
    ()=>connectToDatabase
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/mongoose [external] (mongoose, cjs)");
;
const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB;
if (!uri) {
    throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
}
if (!dbName) {
    throw new Error("Please define the MONGODB_DB environment variable inside .env.local");
}
let cached = globalThis._mongoose;
if (!cached) {
    cached = globalThis._mongoose = {
        conn: null,
        promise: null
    };
}
async function connectToDatabase() {
    if (cached.conn) return cached.conn;
    if (!cached.promise) {
        // Use dbName option to ensure we connect to the exact database provided in env
        cached.promise = __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].connect(uri, {
            dbName
        }).then((mongooseInstance)=>mongooseInstance).catch((err)=>{
            // Surface a clear error to help diagnose Atlas connection issues
            throw new Error(`MongoDB connection failed: ${err.message}`);
        });
    }
    cached.conn = await cached.promise;
    return cached.conn;
}
}),
"[project]/handmade-arts-e-commerce/models/Order.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/mongoose [external] (mongoose, cjs)");
;
const OrderSchema = new __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].Schema({
    userId: {
        type: __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    items: [
        {
            productId: {
                type: String,
                required: true
            },
            name: {
                type: String,
                required: true
            },
            price: {
                type: Number,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            },
            image: {
                type: String
            },
            status: {
                type: String,
                default: "active",
                enum: [
                    "active",
                    "cancelled",
                    "returned"
                ]
            }
        }
    ],
    totalAmount: {
        type: Number,
        required: true
    },
    shippingAddress: {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        zip: {
            type: String,
            required: true
        },
        country: {
            type: String,
            default: "India"
        }
    },
    status: {
        type: String,
        enum: [
            "Pending",
            "Processing",
            "Shipped",
            "Delivered",
            "Cancelled"
        ],
        default: "Pending"
    },
    paymentMethod: {
        type: String,
        default: "COD"
    }
}, {
    timestamps: true
});
const __TURBOPACK__default__export__ = __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].models.Order || __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].model("Order", OrderSchema);
}),
"[project]/handmade-arts-e-commerce/models/Product.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/mongoose [external] (mongoose, cjs)");
;
const ProductSchema = new __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    sellerId: {
        type: __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].Schema.Types.ObjectId,
        ref: "Seller",
        required: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});
const __TURBOPACK__default__export__ = __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].models.Product || __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].model("Product", ProductSchema);
}),
"[project]/handmade-arts-e-commerce/app/api/seller/orders/route.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$handmade$2d$arts$2d$e$2d$commerce$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/handmade-arts-e-commerce/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$handmade$2d$arts$2d$e$2d$commerce$2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/handmade-arts-e-commerce/node_modules/next/headers.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$handmade$2d$arts$2d$e$2d$commerce$2f$node_modules$2f$jsonwebtoken$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/handmade-arts-e-commerce/node_modules/jsonwebtoken/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$handmade$2d$arts$2d$e$2d$commerce$2f$lib$2f$mongodb$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/handmade-arts-e-commerce/lib/mongodb.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$handmade$2d$arts$2d$e$2d$commerce$2f$models$2f$Order$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/handmade-arts-e-commerce/models/Order.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$handmade$2d$arts$2d$e$2d$commerce$2f$models$2f$Product$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/handmade-arts-e-commerce/models/Product.js [app-route] (ecmascript)");
;
;
;
;
;
;
// Helper to authenticate seller
async function getSeller(request) {
    const headerStore = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$handmade$2d$arts$2d$e$2d$commerce$2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["headers"])();
    const authHeader = headerStore.get("authorization") || headerStore.get("Authorization");
    const bearerToken = authHeader?.startsWith("Bearer ") ? authHeader.split(" ")[1] : authHeader?.startsWith("bearer ") ? authHeader.split(" ")[1] : null;
    const cookieStore = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$handmade$2d$arts$2d$e$2d$commerce$2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["cookies"])();
    const accessToken = cookieStore.get("sellerAccessToken")?.value || bearerToken;
    const refreshToken = cookieStore.get("sellerRefreshToken")?.value;
    let sellerId = null;
    let tokenVerified = false;
    // Try Access Token
    if (accessToken) {
        try {
            const payload = __TURBOPACK__imported__module__$5b$project$5d2f$handmade$2d$arts$2d$e$2d$commerce$2f$node_modules$2f$jsonwebtoken$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].verify(accessToken, process.env.JWT_SECRET);
            sellerId = payload.sub;
            tokenVerified = true;
        } catch (e) {
            console.log("Seller Orders API: Access Token invalid.");
        }
    }
    // Try Refresh Token
    if (!tokenVerified && refreshToken) {
        try {
            const payload = __TURBOPACK__imported__module__$5b$project$5d2f$handmade$2d$arts$2d$e$2d$commerce$2f$node_modules$2f$jsonwebtoken$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].verify(refreshToken, process.env.JWT_REFRESH_SECRET);
            sellerId = payload.sub;
            tokenVerified = true;
        } catch (e) {
            console.log("Seller Orders API: Refresh Token invalid.");
        }
    }
    if (!tokenVerified || !sellerId) {
        return null;
    }
    return sellerId;
}
async function GET(request) {
    try {
        const sellerId = await getSeller(request);
        if (!sellerId) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$handmade$2d$arts$2d$e$2d$commerce$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Unauthorized"
            }, {
                status: 401
            });
        }
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$handmade$2d$arts$2d$e$2d$commerce$2f$lib$2f$mongodb$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["connectToDatabase"])();
        // Get all products for this seller
        const sellerProducts = await __TURBOPACK__imported__module__$5b$project$5d2f$handmade$2d$arts$2d$e$2d$commerce$2f$models$2f$Product$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].find({
            sellerId
        }).select("_id");
        const productIds = sellerProducts.map((p)=>p._id.toString());
        // Find all orders that contain any of seller's products
        const orders = await __TURBOPACK__imported__module__$5b$project$5d2f$handmade$2d$arts$2d$e$2d$commerce$2f$models$2f$Order$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].find({
            "items.productId": {
                $in: productIds
            }
        }).populate("userId", "name email").sort({
            createdAt: -1
        });
        // Filter and format orders to only include seller's products
        const sellerOrders = orders.map((order)=>{
            const sellerItems = order.items.filter((item)=>productIds.includes(item.productId));
            if (sellerItems.length === 0) return null;
            // Calculate subtotal for seller's items
            const sellerSubtotal = sellerItems.reduce((sum, item)=>sum + item.price * item.quantity, 0);
            return {
                _id: order._id,
                orderId: order._id.toString(),
                userId: order.userId._id || order.userId,
                userName: order.userId?.name || "Unknown",
                userEmail: order.userId?.email || "",
                items: sellerItems,
                sellerSubtotal,
                totalAmount: order.totalAmount,
                shippingAddress: order.shippingAddress,
                status: order.status,
                paymentMethod: order.paymentMethod,
                createdAt: order.createdAt,
                updatedAt: order.updatedAt
            };
        }).filter((order)=>order !== null);
        return __TURBOPACK__imported__module__$5b$project$5d2f$handmade$2d$arts$2d$e$2d$commerce$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            orders: sellerOrders
        }, {
            status: 200
        });
    } catch (error) {
        console.error("Error fetching seller orders:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$handmade$2d$arts$2d$e$2d$commerce$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Internal Server Error"
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__71489a43._.js.map