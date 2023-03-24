import { useEffect, useRef } from "react"

const useLinkOrigin = (afterOrigin = "") => {
    const link = useRef("")

    useEffect(() => {
        link.current = window.location.origin + afterOrigin
    }, [afterOrigin])

    return link.current
}

export default useLinkOrigin