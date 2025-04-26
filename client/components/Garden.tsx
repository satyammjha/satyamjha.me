import { useState, useEffect } from 'react';
import { Skeleton } from "@/components/ui/skeleton";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { parseISO, format, eachDayOfInterval, startOfWeek, endOfWeek, addDays } from "date-fns";
import config from "@/config";

const url = config.url
console.log("API URL new:", url);

type CommitEntry = {
    date: string;
    count: number;
};

type ProcessedDay = {
    date: Date;
    intensity: number;
    count: number;
};

const GitHubContributionGarden = () => {
    const username = "satyammjha";
    const [loading, setLoading] = useState(true);
    const [contributionData, setContributionData] = useState<ProcessedDay[]>([]);
    const [totalContributions, setTotalContributions] = useState(0);
    const [dateRange, setDateRange] = useState<{
        start: Date | null;
        end: Date | null;
    }>({ start: null, end: null });

    const plants = [
        {
            emoji: "🌑",
            color: "bg-muted",
            text: "text-muted-foreground opacity-50",
        },
        {
            emoji: "🌱",
            color: "bg-emerald-100 dark:bg-emerald-900/50",
            text: "text-emerald-600 dark:text-emerald-300",
        },
        {
            emoji: "🌿",
            color: "bg-green-100 dark:bg-green-900/50",
            text: "text-green-600 dark:text-green-300",
        },
        {
            emoji: "🌷",
            color: "bg-pink-100 dark:bg-pink-900/50",
            text: "text-pink-600 dark:text-pink-300",
        },
        {
            emoji: "🌸",
            color: "bg-rose-100 dark:bg-rose-900/50",
            text: "text-rose-600 dark:text-rose-300",
        },
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch("http://localhost:5000/commits");
                const rawData: CommitEntry[] = await res.json();

                if (!rawData || rawData.length === 0) {
                    console.error("No commit data returned");
                    setLoading(false);
                    return;
                }

                const dates = rawData.map(entry => parseISO(entry.date));

                const minDate = new Date(Math.min(...dates.map(date => date.getTime())));
                const maxDate = new Date(Math.max(...dates.map(date => date.getTime())));

                const dateCountMap = new Map<string, number>();
                rawData.forEach(entry => {
                    dateCountMap.set(entry.date, entry.count);
                });

                const allDays = eachDayOfInterval({ start: minDate, end: maxDate });

                let total = 0;
                const processedDays = allDays.map(day => {
                    const formattedDate = format(day, "yyyy-MM-dd");
                    const count = dateCountMap.get(formattedDate) || 0;
                    total += count;

                    let intensity = 0;
                    if (count === 1 || count === 2) intensity = 1;
                    else if (count <= 5) intensity = 2;
                    else if (count <= 10) intensity = 3;
                    else if (count > 10) intensity = 4;
                    return { date: day, intensity, count };
                });

                setContributionData(processedDays);
                setTotalContributions(total);
                setDateRange({ start: minDate, end: maxDate });
                setLoading(false);
            } catch (err) {
                console.error("Error fetching commits:", err);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="p-6 rounded-xl border bg-transparent">
                <Skeleton className="h-[346px] w-full rounded-lg" />
            </div>
        );
    }

    const weeks: Record<string, ProcessedDay[]> = {};

    if (dateRange.start && dateRange.end) {
        const startWeekDate = startOfWeek(dateRange.start);
        const endWeekDate = endOfWeek(dateRange.end);

        const dateMap = new Map<string, ProcessedDay>();
        contributionData.forEach(day => {
            dateMap.set(format(day.date, "yyyy-MM-dd"), day);
        });

        let currentWeekStart = startWeekDate;
        while (currentWeekStart <= endWeekDate) {
            const weekKey = format(currentWeekStart, "yyyy-MM-dd");
            weeks[weekKey] = [];

            for (let i = 0; i < 7; i++) {
                const currentDate = addDays(currentWeekStart, i);
                const formattedDate = format(currentDate, "yyyy-MM-dd");

                const dayData = dateMap.get(formattedDate) || {
                    date: currentDate,
                    count: 0,
                    intensity: 0
                };

                weeks[weekKey].push(dayData);
            }

            currentWeekStart = addDays(currentWeekStart, 7);
        }
    }

    const weekKeys = Object.keys(weeks).sort();

    return (
        <div className="p-6 rounded-xl border bg-transparent shadow-sm">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-full bg-primary/10">
                    <span className="text-xl">🌳</span>
                </div>
                <div>
                    {username}'s Ghost Town 🌵
                    <span className="text-sm ml-2 text-muted-foreground">Population: {totalContributions}</span>
                    <p className="text-sm text-muted-foreground">
                        {totalContributions} contributions •{" "}
                        {dateRange.start && format(dateRange.start, "MMM d, yyyy")} –{" "}
                        {dateRange.end && format(dateRange.end, "MMM d, yyyy")}
                    </p>
                </div>
            </div>

            <div className="p-4 rounded-lg bg-muted border overflow-x-auto">
                <div className="inline-flex gap-[2px]">
                    {weekKeys.map((week) => (
                        <div key={week} className="flex flex-col gap-[2px]">
                            {weeks[week].map((dayData, i) => (
                                <TooltipProvider key={i} delayDuration={0}>
                                    <Tooltip>
                                        <TooltipTrigger className="h-4 w-4 md:h-5 md:w-5">
                                            <div
                                                className={`h-full w-full rounded-sm flex items-center justify-center ${plants[dayData.intensity].color
                                                    } ${dayData.intensity > 0 ? "hover:scale-110 transition-transform" : ""}`}
                                            >
                                                <span className={`${plants[dayData.intensity].text} text-[10px]`}>
                                                    {(() => {
                                                        if (dayData.count > 10) return "🌸";
                                                        else if (dayData.count > 5) return "🌷";
                                                        else if (dayData.count > 1) return "🌿";
                                                        else if (dayData.count > 0) return "🌱";
                                                        else return "🌑";
                                                    })()}
                                                </span>
                                            </div>
                                        </TooltipTrigger>
                                        <TooltipContent
                                            side="top"
                                            className="bg-popover text-popover-foreground"
                                        >
                                            <p className="text-xs font-medium">
                                                {format(dayData.date, "MMM d, yyyy")}
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                {dayData.count} contribution
                                                {dayData.count !== 1 ? "s" : ""}
                                            </p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            ))}
                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-4 justify-center">
                {plants.map((plant, index) => {
                    const ranges = ["No", "1-2", "3-5", "6-10", "11+"];
                    return (
                        <div key={index} className="flex items-center gap-1.5">
                            <span className={`text-sm ${plant.text}`}>{plant.emoji}</span>
                            <span className="text-xs text-muted-foreground">
                                {ranges[index]} contribution{ranges[index] !== "1" ? "s" : ""}
                            </span>
                        </div>
                    );
                })}
            </div>

            <div className="mt-6 text-center">
                <a
                    href={`https://github.com/${username}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-primary hover:underline"
                >
                    View GitHub Profile →
                </a>
            </div>
        </div>
    );
};

export default GitHubContributionGarden;