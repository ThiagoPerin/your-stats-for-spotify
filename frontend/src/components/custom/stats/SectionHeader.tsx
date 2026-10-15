import { ReactNode } from "react";

type SectionHeaderProps = {
    title: string;
    subtitle?: string;
    action?: ReactNode;
};

export function SectionHeader({ title, subtitle, action }: SectionHeaderProps) {
    return (
        <div className="mb-4 flex items-end justify-between gap-4">
            <div className="min-w-0">
                <h2 className="text-2xl font-bold tracking-tight text-sp-text">{title}</h2>
                {subtitle && <p className="mt-1 text-sm text-sp-subdued">{subtitle}</p>}
            </div>
            {action}
        </div>
    );
}

type ShowAllToggleProps = {
    expanded: boolean;
    onToggle: () => void;
    total: number;
};

export function ShowAllToggle({ expanded, onToggle, total }: ShowAllToggleProps) {
    return (
        <button
            type="button"
            onClick={onToggle}
            className="shrink-0 cursor-pointer text-sm font-bold text-sp-subdued hover:text-sp-text hover:underline"
        >
            {expanded ? "Show less" : `Show all ${total}`}
        </button>
    );
}
