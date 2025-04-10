import { useState, useEffect } from 'react';
import { Skeleton } from "@/components/ui/skeleton";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { parseISO, format, eachDayOfInterval, subWeeks, startOfWeek } from 'date-fns';

const GitHubContributionGarden = () => {
    const username = "satyammjha";
    const [loading, setLoading] = useState(true);

    const generateContributionData = () => {
        const today = new Date();
        const startDate = startOfWeek(subWeeks(today, 51), { weekStartsOn: 0 });
        const days = eachDayOfInterval({ start: startDate, end: today });

        const data: { date: Date; intensity: number; }[][] = [];
        let weekData: { date: Date; intensity: number; }[] = [];

        days.forEach((date: Date, index: number) => {
            const intensity = calculateIntensity(date);
            weekData.push({ date, intensity });

            if ((index + 1) % 7 === 0) {
                data.push(weekData);
                weekData = [];
            }
        });

        return data;
    };
    const calculateIntensity = (date: Date) => {
        const yearStart = new Date(date.getFullYear(), 0, 1);
        const yearEnd = new Date(date.getFullYear() + 1, 0, 1);
        const yearProgress = (date.getTime() - yearStart.getTime()) /
            (yearEnd.getTime() - yearStart.getTime());

        let intensity = 0;
        const month = date.getMonth();
        const day = date.getDay();
        const isWeekend = day === 0 || day === 6;

        if (month >= 10) {
            intensity = Math.random() > 0.3 ? Math.floor(Math.random() * 4) + 1 : 0;
        } else if (month >= 6 && month <= 8) {
            intensity = Math.random() > 0.6 ? Math.floor(Math.random() * 2) + 1 : 0;
        } else if (month >= 3 && month <= 5) {
            intensity = Math.random() > 0.4 ? Math.floor(Math.random() * 3) + 1 : 0;
        } else {
            intensity = Math.random() > 0.5 ? Math.floor(Math.random() * 4) : 0;
        }

        if (month === 2 || month === 9) {
            intensity = Math.min(4, intensity + 1);
        }

        if (isWeekend && intensity > 0) {
            intensity = Math.max(1, intensity - 1);
        }

        if (!isWeekend && date.getDate() <= 7 && Math.random() > 0.8) {
            intensity = Math.min(4, intensity + 1);
        }

        return intensity;
    };
    const contributionData = generateContributionData();
    const totalContributions = contributionData.flat().reduce((sum, { intensity }) => sum + intensity, 0) * 3;

    const plants = [
        { emoji: '🌱', color: 'bg-emerald-100 dark:bg-emerald-900/50', text: 'text-emerald-600 dark:text-emerald-300' },
        { emoji: '🌿', color: 'bg-green-100 dark:bg-green-900/50', text: 'text-green-600 dark:text-green-300' },
        { emoji: '🌷', color: 'bg-pink-100 dark:bg-pink-900/50', text: 'text-pink-600 dark:text-pink-300' },
        { emoji: '🌸', color: 'bg-rose-100 dark:bg-rose-900/50', text: 'text-rose-600 dark:text-rose-300' },
    ];

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 800);
        return () => clearTimeout(timer);
    }, []);

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
                                {week.map(({ date, intensity }) => (
                                    <TooltipProvider key={date.toString()} delayDuration={0}>
                                        <Tooltip key={date.toString()}>
                                            <TooltipTrigger className="h-6 w-6 relative">
                                                <div className={`
                        h-full w-full rounded-sm flex items-center justify-center
                        ${plants[intensity]?.color || 'bg-background'}
                        ${intensity > 0 ? 'hover:scale-110 transition-transform' : ''}
                      `}>
                                                    <span className={`${intensity > 0 ? plants[Math.min(intensity, plants.length - 1)].text : ''} text-sm`}>
                                                        {intensity > 0 ? plants[Math.min(intensity, plants.length - 1)].emoji : ''}
                                                    </span>
                                                </div>
                                            </TooltipTrigger>
                                            <TooltipContent side="top" className="bg-popover text-popover-foreground">
                                                <p className="text-xs font-medium">
                                                    {format(date, 'MMM d, yyyy')}
                                                </p>
                                                <p className="text-xs text-muted-foreground">
                                                    {intensity * 3} contributions
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
                {plants.map((plant, index) => (
                    <div key={index} className="flex items-center gap-1.5">
                        <span className={`text-sm ${plant.text}`}>{plant.emoji}</span>
                        <span className="text-xs text-muted-foreground">
                            {index * 3 + 1}-{index * 3 + 3} contributions
                        </span>
                    </div>
                ))}
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