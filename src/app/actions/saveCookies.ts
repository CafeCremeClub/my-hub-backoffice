"use server";


import {cookies} from 'next/headers'
import {SaveCookiesPayload} from "@/types/auth/SaveCookiesPayload";

export async function saveCookies(payload: SaveCookiesPayload) {

    const {
        token
    } = payload

    const cookieStore = await cookies()

    cookieStore.set('token', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 7 days
    })
}