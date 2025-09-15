"use server";


import {cookies} from "next/headers";

export async function saveCookieByName(name: string, value: string) {
    const cookieStore = await cookies()

    cookieStore.set(name, value, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 7 days
    })
}