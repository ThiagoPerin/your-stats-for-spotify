import { CountItem, percent } from "@/lib/stats";
import { SectionHeader } from "./SectionHeader";

function Tooltip({ children }: { children: React.ReactNode }) {
    return (
        <span className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 hidden -translate-x-1/2 rounded-md bg-sp-text px-2 py-1 text-xs font-medium whitespace-nowrap text-sp-base shadow-lg group-hover:block group-focus-visible:block">
            {children}
        </span>
    );
}

function EmptyChart({ message }: { message: string }) {
    return <p className="flex h-48 items-center justify-center text-center text-sm text-sp-subdued">{message}</p>;
}

type GenreChartProps = {
    genres: CountItem[];
    artistCount: number;
};

export function GenreChart({ genres, artistCount }: GenreChartProps) {
    const max = Math.max(1, ...genres.map((g) => g.count));

    return (
        <section className="rounded-lg bg-sp-surface p-5">
            <SectionHeader title="Top genres" subtitle={`How many of your top ${artistCount} artists fall into each genre`} />
            {genres.length === 0 ? (
                <EmptyChart message="Spotify didn't return genre data for your top artists." />
            ) : (
                <ol className="space-y-2.5">
                    {genres.map((genre) => (
                        <li
                            key={genre.label}
                            tabIndex={0}
                            className="group relative grid grid-cols-[minmax(0,9rem)_1fr_2rem] items-center gap-3 rounded text-sm outline-none"
                        >
                            <span className="truncate text-sp-text capitalize" title={genre.label}>{genre.label}</span>
                            <div className="relative flex h-5 items-center">
                                <div
                                    className="h-3 rounded-r-[4px] bg-sp-chart transition-opacity group-hover:opacity-80"
                                    style={{ width: `${(genre.count / max) * 100}%` }}
                                />
                                <Tooltip>
                                    <span className="capitalize">{genre.label}</span> · {genre.count} artists ({percent(genre.count, artistCount)}%)
                                </Tooltip>
                            </div>
                            <span className="text-right text-sp-subdued tabular-nums">{genre.count}</span>
                        </li>
                    ))}
                </ol>
            )}
        </section>
    );
}

type DecadeChartProps = {
    decades: CountItem[];
    trackCount: number;
};

export function DecadeChart({ decades, trackCount }: DecadeChartProps) {
    const max = Math.max(1, ...decades.map((d) => d.count));
    const peak = decades.find((d) => d.count === max);

    return (
        <section className="rounded-lg bg-sp-surface p-5">
            <SectionHeader
                title="Tracks by decade"
                subtitle={peak ? `Most of your top tracks come from the ${peak.label}` : "When your top tracks were released"}
            />
            {decades.length === 0 ? (
                <EmptyChart message="No release dates available for your top tracks." />
            ) : (
                <div>
                    <div className="flex h-48 items-end gap-[2px] border-b border-sp-track">
                        {decades.map((decade) => (
                            <div
                                key={decade.label}
                                tabIndex={0}
                                className="group relative flex h-full flex-1 flex-col items-center justify-end outline-none"
                            >
                                {decade === peak && (
                                    <span className="mb-1 text-xs font-semibold text-sp-text tabular-nums">{decade.count}</span>
                                )}
                                <div
                                    className="w-full max-w-12 rounded-t-[4px] bg-sp-chart transition-opacity group-hover:opacity-80"
                                    style={{ height: `${(decade.count / max) * 85}%` }}
                                />
                                <Tooltip>
                                    {decade.label} · {decade.count} tracks ({percent(decade.count, trackCount)}%)
                                </Tooltip>
                            </div>
                        ))}
                    </div>
                    <div className="mt-2 flex gap-[2px]">
                        {decades.map((decade) => (
                            <span key={decade.label} className="flex-1 truncate text-center text-xs text-sp-subdued">
                                {decade.label}
                            </span>
                        ))}
                    </div>
                </div>
            )}
        </section>
    );
}
