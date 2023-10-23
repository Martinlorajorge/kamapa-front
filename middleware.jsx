import { NextRequest } from "next/server";

export function middleware(request: NextRequest){
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('Content-Type', 'application/json');

    const response = NextResponse.next({
        request:{
            headers: requestHeaders,
        },
    })


    // if (response.nextUrl.pathname)




    return response
}