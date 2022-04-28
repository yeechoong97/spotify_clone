import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
    // Token will exist if user is logged in
    const token = await getToken({ req, secret: process.env.JWT_SECRET });

    const { pathname } = req.nextUrl.clone()

    // Allow the request if the following is true
    // 1) The token exists
    // 2) Its a request for next-auth session & provider fecting

    if (pathname.includes("/api/auth") || token) {
        return NextResponse.next();
    }

    // Redirect them to login if they dont have token AND are requesting 
    if (!token && pathname !== "/login") {
        return NextResponse.redirect("http://localhost:3000/login");
    }

}