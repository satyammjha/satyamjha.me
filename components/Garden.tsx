import { useState, useEffect } from 'react';
import { Skeleton } from "@/components/ui/skeleton";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { parseISO, format, eachDayOfInterval, subWeeks, startOfWeek } from 'date-fns';

const GitHubContributionGarden = () => {
    const username = "satyammjha";
    const [loading, setLoading] = useState(true);
    const [contributionData, setContributionData] = useState<{ date: Date; intensity: number; count: number }[][]>([]);
    const [totalContributions, setTotalContributions] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch("http://localhost:5000/commits");
                const rawData = await res.json();

                const endDate = startOfWeek(new Date(), { weekStartsOn: 0 });
                endDate.setDate(endDate.getDate() - 1);

                const startDate = new Date(endDate);
                startDate.setDate(startDate.getDate() - (52 * 7 - 1));

                const allDays = eachDayOfInterval({ start: startDate, end: endDate });
                const dateMap = new Map(rawData.map((entry: { date: string, count: number }) =>
                    [entry.date, entry.count]
                ));

                let weeklyData: { date: Date; intensity: number; count: number }[][] = [];
                let week: { date: Date; intensity: number; count: number }[] = [];
                let total = 0;

                allDays.forEach((day, index) => {
                    const formatted = format(day, "yyyy-MM-dd");
                    const count = Number(dateMap.get(formatted) || 0);
                    total += count;

                    let intensity = 0;
                    if (count > 0 && count <= 2) intensity = 1;
                    else if (count <= 5) intensity = 2;
                    else if (count <= 10) intensity = 3;
                    else if (count > 10) intensity = 4;

                    week.push({ date: day, intensity, count });

                    if ((index + 1) % 7 === 0) {
                        weeklyData.push(week);
                        week = [];
                    }
                });

                setContributionData(weeklyData);
                setTotalContributions(total);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching commits:", err);
            }
        };

        fetchData();
    }, []);

    const plants = [
        { emoji: '🌱', color: 'bg-emerald-100 dark:bg-emerald-900/50', text: 'text-emerald-600 dark:text-emerald-300' },
        { emoji: '🌿', color: 'bg-green-100 dark:bg-green-900/50', text: 'text-green-600 dark:text-green-300' },
        { emoji: '🌷', color: 'bg-pink-100 dark:bg-pink-900/50', text: 'text-pink-600 dark:text-pink-300' },
        { emoji: '🌸', color: 'bg-rose-100 dark:bg-rose-900/50', text: 'text-rose-600 dark:text-rose-300' },
    ];

    if (loading) {
        return (
            <div className="p-6 rounded-xl border bg-card">
                <Skeleton className="h-[346px] w-full rounded-lg" />
            </div>
        );
    }

    return (
        <div className="p-6 rounded-xl border bg-card shadow-sm">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-full bg-primary/10">
                    <span className="text-xl">🌳</span>
                </div>
                <div>
                    <h2 className="text-xl font-semibold text-card-foreground">
                        {username}'s Garden
                    </h2>
                    <p className="text-sm text-muted-foreground">
                        {totalContributions} contributions this year
                    </p>
                </div>
            </div>

            <div className="p-4 rounded-lg bg-muted border">
                <div className="overflow-x-auto pb-2">
                    <div className="inline-grid grid-flow-col gap-1">
                        {contributionData.map((week, weekIndex) => (
                            <div key={weekIndex} className="grid gap-1">
                                {week.map(({ date, intensity, count }) => (
                                    <TooltipProvider key={date.toString()} delayDuration={0}>
                                        <Tooltip>
                                            <TooltipTrigger className="h-6 w-6 relative">
                                                <div className={`
                                                    h-full w-full rounded-sm flex items-center justify-center
                                                    ${intensity > 0 ? plants[Math.min(intensity - 1, plants.length - 1)].color : 'bg-background'}
                                                    ${intensity > 0 ? 'hover:scale-110 transition-transform' : ''}
                                                `}>
                                                    <span className={`${intensity > 0 ? plants[Math.min(intensity - 1, plants.length - 1)].text : ''} text-sm`}>
                                                        {intensity > 0 ? plants[Math.min(intensity - 1, plants.length - 1)].emoji : ''}
                                                    </span>
                                                </div>
                                            </TooltipTrigger>
                                            <TooltipContent side="top" className="bg-popover text-popover-foreground">
                                                <p className="text-xs font-medium">
                                                    {format(date, 'MMM d, yyyy')}
                                                </p>
                                                <p className="text-xs text-muted-foreground">
                                                    {count} contribution{count !== 1 ? 's' : ''}
                                                </p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-4 justify-center">
                {plants.map((plant, index) => {
                    let range;
                    switch (index) {
                        case 0:
                            range = '1-2 contributions';
                            break;
                        case 1:
                            range = '3-5 contributions';
                            break;
                        case 2:
                            range = '6-10 contributions';
                            break;
                        case 3:
                            range = '11+ contributions';
                            break;
                        default:
                            range = '';
                    }
                    return (
                        <div key={index} className="flex items-center gap-1.5">
                            <span className={`text-sm ${plant.text}`}>{plant.emoji}</span>
                            <span className="text-xs text-muted-foreground">
                                {range}
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