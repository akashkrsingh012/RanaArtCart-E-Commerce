module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

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
"[project]/handmade-arts-e-commerce/contexts/user-context.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "UserProvider",
    ()=>UserProvider,
    "useUser",
    ()=>useUser
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$handmade$2d$arts$2d$e$2d$commerce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/handmade-arts-e-commerce/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$handmade$2d$arts$2d$e$2d$commerce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/handmade-arts-e-commerce/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
const UserContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$handmade$2d$arts$2d$e$2d$commerce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(undefined);
function UserProvider({ children }) {
    const [user, setUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$handmade$2d$arts$2d$e$2d$commerce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [orders, setOrders] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$handmade$2d$arts$2d$e$2d$commerce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [mounted, setMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$handmade$2d$arts$2d$e$2d$commerce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    // Load user and orders from localStorage on mount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$handmade$2d$arts$2d$e$2d$commerce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const savedUser = localStorage.getItem("ranaartcart_user");
        const savedOrders = localStorage.getItem("ranaartcart_orders");
        if (savedUser) {
            try {
                setUser(JSON.parse(savedUser));
            } catch (e) {
                console.error("Failed to load user:", e);
            }
        }
        if (savedOrders) {
            try {
                setOrders(JSON.parse(savedOrders));
            } catch (e) {
                console.error("Failed to load orders:", e);
            }
        }
        setMounted(true);
    }, []);
    // Save user to localStorage when it changes
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$handmade$2d$arts$2d$e$2d$commerce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (mounted && user) {
            localStorage.setItem("ranaartcart_user", JSON.stringify(user));
        }
    }, [
        user,
        mounted
    ]);
    // Save orders to localStorage when they change
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$handmade$2d$arts$2d$e$2d$commerce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (mounted) {
            localStorage.setItem("ranaartcart_orders", JSON.stringify(orders));
        }
    }, [
        orders,
        mounted
    ]);
    const login = (email, password)=>{
        // Mock authentication - in real app, verify against backend
        if (email && password) {
            const newUser = {
                id: `user_${Date.now()}`,
                name: email.split("@")[0],
                email,
                phone: "",
                addresses: [],
                wishlist: []
            };
            setUser(newUser);
        }
    };
    const signup = (name, email, password, phone)=>{
        const newUser = {
            id: `user_${Date.now()}`,
            name,
            email,
            phone,
            addresses: [],
            wishlist: []
        };
        setUser(newUser);
    };
    const logout = ()=>{
        setUser(null);
        localStorage.removeItem("ranaartcart_user");
    };
    const addOrder = (order)=>{
        setOrders((prev)=>[
                ...prev,
                order
            ]);
    };
    const updateUserInfo = (updates)=>{
        setUser((prev)=>prev ? {
                ...prev,
                ...updates
            } : null);
    };
    const addAddress = (address)=>{
        setUser((prev)=>prev ? {
                ...prev,
                addresses: [
                    ...prev.addresses,
                    {
                        id: `addr_${Date.now()}`,
                        ...address
                    }
                ]
            } : null);
    };
    const addToWishlist = (productId)=>{
        setUser((prev)=>prev && !prev.wishlist.includes(productId) ? {
                ...prev,
                wishlist: [
                    ...prev.wishlist,
                    productId
                ]
            } : prev);
    };
    const removeFromWishlist = (productId)=>{
        setUser((prev)=>prev ? {
                ...prev,
                wishlist: prev.wishlist.filter((id)=>id !== productId)
            } : prev);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$handmade$2d$arts$2d$e$2d$commerce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(UserContext.Provider, {
        value: {
            user,
            isLoggedIn: !!user,
            orders,
            login,
            signup,
            logout,
            addOrder,
            updateUserInfo,
            addAddress,
            addToWishlist,
            removeFromWishlist
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/handmade-arts-e-commerce/contexts/user-context.tsx",
        lineNumber: 188,
        columnNumber: 5
    }, this);
}
function useUser() {
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$handmade$2d$arts$2d$e$2d$commerce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(UserContext);
    if (!context) {
        throw new Error("useUser must be used within UserProvider");
    }
    return context;
}
}),
"[project]/handmade-arts-e-commerce/contexts/seller-context.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SellerProvider",
    ()=>SellerProvider,
    "useSeller",
    ()=>useSeller
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$handmade$2d$arts$2d$e$2d$commerce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/handmade-arts-e-commerce/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$handmade$2d$arts$2d$e$2d$commerce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/handmade-arts-e-commerce/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
const SellerContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$handmade$2d$arts$2d$e$2d$commerce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(undefined);
function SellerProvider({ children }) {
    const [sellers, setSellers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$handmade$2d$arts$2d$e$2d$commerce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [currentSeller, setCurrentSeller] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$handmade$2d$arts$2d$e$2d$commerce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [sellerOrders, setSellerOrders] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$handmade$2d$arts$2d$e$2d$commerce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [mounted, setMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$handmade$2d$arts$2d$e$2d$commerce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$handmade$2d$arts$2d$e$2d$commerce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const savedSellers = localStorage.getItem("ranaartcart_sellers");
        const savedCurrentSeller = localStorage.getItem("ranaartcart_current_seller");
        const savedSellerOrders = localStorage.getItem("ranaartcart_seller_orders");
        if (savedSellers) {
            try {
                setSellers(JSON.parse(savedSellers));
            } catch (e) {
                console.error("Failed to load sellers:", e);
            }
        }
        if (savedCurrentSeller) {
            try {
                setCurrentSeller(JSON.parse(savedCurrentSeller));
            } catch (e) {
                console.error("Failed to load current seller:", e);
            }
        }
        if (savedSellerOrders) {
            try {
                setSellerOrders(JSON.parse(savedSellerOrders));
            } catch (e) {
                console.error("Failed to load seller orders:", e);
            }
        }
        setMounted(true);
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$handmade$2d$arts$2d$e$2d$commerce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (mounted) {
            localStorage.setItem("ranaartcart_sellers", JSON.stringify(sellers));
        }
    }, [
        sellers,
        mounted
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$handmade$2d$arts$2d$e$2d$commerce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (mounted && currentSeller) {
            localStorage.setItem("ranaartcart_current_seller", JSON.stringify(currentSeller));
        }
    }, [
        currentSeller,
        mounted
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$handmade$2d$arts$2d$e$2d$commerce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (mounted) {
            localStorage.setItem("ranaartcart_seller_orders", JSON.stringify(sellerOrders));
        }
    }, [
        sellerOrders,
        mounted
    ]);
    const registerSeller = (sellerData)=>{
        const newSeller = {
            id: `seller_${Date.now()}`,
            ...sellerData,
            products: [],
            createdAt: new Date().toISOString(),
            isApproved: false
        };
        setSellers((prev)=>[
                ...prev,
                newSeller
            ]);
        setCurrentSeller(newSeller);
    };
    const loginSeller = (email, password)=>{
        const seller = sellers.find((s)=>s.email === email);
        if (seller) {
            setCurrentSeller(seller);
        }
    };
    const logoutSeller = ()=>{
        setCurrentSeller(null);
        localStorage.removeItem("ranaartcart_current_seller");
    };
    const addProduct = (product)=>{
        if (!currentSeller) return;
        const newProduct = {
            id: `product_${Date.now()}`,
            ...product,
            sellerId: currentSeller.id
        };
        setCurrentSeller((prev)=>prev ? {
                ...prev,
                products: [
                    ...prev.products,
                    newProduct
                ]
            } : null);
        setSellers((prev)=>prev.map((s)=>s.id === currentSeller.id ? {
                    ...s,
                    products: [
                        ...s.products,
                        newProduct
                    ]
                } : s));
    };
    const updateProduct = (productId, updates)=>{
        if (!currentSeller) return;
        setCurrentSeller((prev)=>prev ? {
                ...prev,
                products: prev.products.map((p)=>p.id === productId ? {
                        ...p,
                        ...updates
                    } : p)
            } : null);
        setSellers((prev)=>prev.map((s)=>s.id === currentSeller.id ? {
                    ...s,
                    products: s.products.map((p)=>p.id === productId ? {
                            ...p,
                            ...updates
                        } : p)
                } : s));
    };
    const deleteProduct = (productId)=>{
        if (!currentSeller) return;
        setCurrentSeller((prev)=>prev ? {
                ...prev,
                products: prev.products.filter((p)=>p.id !== productId)
            } : null);
        setSellers((prev)=>prev.map((s)=>s.id === currentSeller.id ? {
                    ...s,
                    products: s.products.filter((p)=>p.id !== productId)
                } : s));
    };
    const addSellerOrder = (order)=>{
        setSellerOrders((prev)=>[
                ...prev,
                order
            ]);
    };
    const updateSellerOrderStatus = (orderId, status)=>{
        setSellerOrders((prev)=>prev.map((o)=>o.id === orderId ? {
                    ...o,
                    status: status
                } : o));
    };
    const approveSeller = (sellerId)=>{
        setSellers((prev)=>prev.map((s)=>s.id === sellerId ? {
                    ...s,
                    isApproved: true
                } : s));
        if (currentSeller?.id === sellerId) {
            setCurrentSeller((prev)=>prev ? {
                    ...prev,
                    isApproved: true
                } : null);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$handmade$2d$arts$2d$e$2d$commerce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SellerContext.Provider, {
        value: {
            sellers,
            currentSeller,
            sellerOrders,
            registerSeller,
            loginSeller,
            logoutSeller,
            addProduct,
            updateProduct,
            deleteProduct,
            addSellerOrder,
            updateSellerOrderStatus,
            approveSeller
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/handmade-arts-e-commerce/contexts/seller-context.tsx",
        lineNumber: 244,
        columnNumber: 5
    }, this);
}
function useSeller() {
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$handmade$2d$arts$2d$e$2d$commerce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(SellerContext);
    if (!context) {
        throw new Error("useSeller must be used within SellerProvider");
    }
    return context;
}
}),
"[project]/handmade-arts-e-commerce/contexts/admin-context.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AdminProvider",
    ()=>AdminProvider,
    "useAdmin",
    ()=>useAdmin
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$handmade$2d$arts$2d$e$2d$commerce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/handmade-arts-e-commerce/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$handmade$2d$arts$2d$e$2d$commerce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/handmade-arts-e-commerce/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
const AdminContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$handmade$2d$arts$2d$e$2d$commerce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(undefined);
function AdminProvider({ children }) {
    const [adminUser, setAdminUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$handmade$2d$arts$2d$e$2d$commerce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [promotions, setPromotions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$handmade$2d$arts$2d$e$2d$commerce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [stats, setStats] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$handmade$2d$arts$2d$e$2d$commerce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [mounted, setMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$handmade$2d$arts$2d$e$2d$commerce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$handmade$2d$arts$2d$e$2d$commerce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const savedAdmin = localStorage.getItem("ranaartcart_admin");
        const savedPromotions = localStorage.getItem("ranaartcart_promotions");
        const savedStats = localStorage.getItem("ranaartcart_admin_stats");
        if (savedAdmin) {
            try {
                setAdminUser(JSON.parse(savedAdmin));
            } catch (e) {
                console.error("Failed to load admin:", e);
            }
        }
        if (savedPromotions) {
            try {
                setPromotions(JSON.parse(savedPromotions));
            } catch (e) {
                console.error("Failed to load promotions:", e);
            }
        }
        if (savedStats) {
            try {
                setStats(JSON.parse(savedStats));
            } catch (e) {
                console.error("Failed to load stats:", e);
            }
        }
        setMounted(true);
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$handmade$2d$arts$2d$e$2d$commerce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (mounted && adminUser) {
            localStorage.setItem("ranaartcart_admin", JSON.stringify(adminUser));
        }
    }, [
        adminUser,
        mounted
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$handmade$2d$arts$2d$e$2d$commerce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (mounted) {
            localStorage.setItem("ranaartcart_promotions", JSON.stringify(promotions));
        }
    }, [
        promotions,
        mounted
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$handmade$2d$arts$2d$e$2d$commerce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (mounted && stats) {
            localStorage.setItem("ranaartcart_admin_stats", JSON.stringify(stats));
        }
    }, [
        stats,
        mounted
    ]);
    const loginAdmin = (email, password)=>{
        // Mock admin login - in production, verify against backend
        if (email === "admin@ranaartcart.com" && password === "admin123") {
            setAdminUser({
                id: "admin_001",
                email: email,
                role: "admin"
            });
        }
    };
    const logoutAdmin = ()=>{
        setAdminUser(null);
        localStorage.removeItem("ranaartcart_admin");
    };
    const addPromotion = (promotion)=>{
        const newPromotion = {
            id: `promo_${Date.now()}`,
            ...promotion
        };
        setPromotions((prev)=>[
                ...prev,
                newPromotion
            ]);
    };
    const updatePromotion = (id, updates)=>{
        setPromotions((prev)=>prev.map((p)=>p.id === id ? {
                    ...p,
                    ...updates
                } : p));
    };
    const deletePromotion = (id)=>{
        setPromotions((prev)=>prev.filter((p)=>p.id !== id));
    };
    const updateAdminStats = (newStats)=>{
        setStats(newStats);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$handmade$2d$arts$2d$e$2d$commerce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(AdminContext.Provider, {
        value: {
            adminUser,
            promotions,
            stats,
            loginAdmin,
            logoutAdmin,
            addPromotion,
            updatePromotion,
            deletePromotion,
            updateAdminStats
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/handmade-arts-e-commerce/contexts/admin-context.tsx",
        lineNumber: 133,
        columnNumber: 5
    }, this);
}
function useAdmin() {
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$handmade$2d$arts$2d$e$2d$commerce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(AdminContext);
    if (!context) {
        throw new Error("useAdmin must be used within AdminProvider");
    }
    return context;
}
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/dynamic-access-async-storage.external.js [external] (next/dist/server/app-render/dynamic-access-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/dynamic-access-async-storage.external.js", () => require("next/dist/server/app-render/dynamic-access-async-storage.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__23b43152._.js.map