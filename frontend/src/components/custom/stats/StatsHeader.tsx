import Image from "next/image";
import Link from "next/link";
import { ModeToggle } from "@/components/custom/buttons/ModeToggle";

export function StatsHeader() {
    return (
        <header className="sticky top-0 z-30 border-b border-sp-highlight bg-sp-base/85 backdrop-blur">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-8">
                <Link href="/" aria-label="Back to home" className="flex items-center gap-3">
                    <Image src="/Spotify_Full_Logo_RGB_Black.png" alt="Spotify" height={100} width={100} className="dark:hidden" />
                    <Image src="/Spotify_Full_Logo_RGB_White.png" alt="Spotify" height={100} width={100} className="hidden dark:block" />
                    <span className="hidden border-l border-sp-highlight pl-3 text-sm font-semibold text-sp-subdued sm:inline">
                        Your Stats
                    </span>
                </Link>
                <ModeToggle />
            </div>
        </header>
    );
}
