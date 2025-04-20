"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { Preloader } from "./Preloader"

export function RouteChangeLoader() {
    const pathname = usePathname()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        const timer = setTimeout(() => {
            setLoading(false)
        }, 1000)

        return () => clearTimeout(timer)
    }, [pathname])

    return loading ? <Preloader /> : null
}