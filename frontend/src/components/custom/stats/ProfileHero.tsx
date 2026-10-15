import Image from "next/image";
import { ExternalLink, User } from "lucide-react";
import { SpotifyUserProfile } from "@/types/spotify-user-info.types";
import { formatNumber, imageUrl } from "@/lib/stats";

export function ProfileHero({ user }: { user: SpotifyUserProfile }) {
    const avatar = imageUrl(user.images);
    const isPremium = user.product === "premium";
    const meta = [
        typeof user.followers?.total === "number" ? `${formatNumber(user.followers.total)} followers` : null,
        user.country,
    ].filter(Boolean);

    return (
        <section className="colored-gradient-1 relative">
            <div className="absolute inset-0 bg-black/30" />
            <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-6 px-4 pt-10 pb-8 text-white sm:flex-row sm:items-end sm:px-8">
                <div className="relative size-36 shrink-0 overflow-hidden rounded-full bg-spotify-black/60 shadow-2xl sm:size-48">
                    {avatar ? (
                        <Image src={avatar} alt={user.display_name} fill sizes="192px" className="object-cover" priority />
                    ) : (
                        <User className="absolute inset-0 m-auto size-16 text-white/70" />
                    )}
                </div>
                <div className="min-w-0 text-center sm:text-left">
                    <p className="text-sm font-semibold">Profile</p>
                    <h1 className="my-2 text-5xl font-black tracking-tight break-words sm:text-7xl lg:text-8xl">
                        {user.display_name}
                    </h1>
                    <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-sm font-medium sm:justify-start">
                        {isPremium && (
                            <span className="rounded-full bg-spotify-green px-2 py-0.5 text-xs font-bold text-spotify-black">Premium</span>
                        )}
                        {meta.map((item, i) => (
                            <span key={i} className="flex items-center gap-2">
                                {(i > 0 || isPremium) && <span aria-hidden>•</span>}
                                {item}
                            </span>
                        ))}
                        <a
                            href={user.external_urls.spotify}
                            target="_blank"
                            rel="noreferrer"
                            className="ml-1 inline-flex items-center gap-1 underline-offset-4 hover:underline"
                        >
                            Open in Spotify <ExternalLink className="size-3.5" />
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
