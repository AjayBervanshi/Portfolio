import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
    const { pathname, hash } = useLocation();

    useEffect(() => {
        // Prevent browser's default scroll restoration behavior on refresh
        if ('scrollRestoration' in history) {
            history.scrollRestoration = 'manual';
        }

        // Only scroll to top if there isn't a hash, otherwise let natural scrolling handle it
        if (!hash) {
            window.scrollTo({ top: 0, left: 0, behavior: "instant" });
        }
    }, [pathname, hash]);

    return null;
}
