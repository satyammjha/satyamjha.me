import { Request, Response } from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();

export const fetchCommits = async (req: Request, res: Response) => {
    const username = "satyammjha";
    const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

    let page = 1;
    const allCommits: any[] = [];

    try {
        while (true) {
            const apiUrl = `https://api.github.com/search/commits?q=author:${username}&sort=author-date&order=desc&per_page=100&page=${page}`;
            const response = await fetch(apiUrl, {
                headers: {
                    Authorization: `token ${GITHUB_TOKEN}`,
                    Accept: "application/vnd.github.cloak-preview",
                },
            });

            const data = (await response.json()) as { items?: any[] };
            if (!data.items || data.items.length === 0) break;

            allCommits.push(...data.items);
            if (data.items.length < 100) break;

            page++;
        }

        const commitMap: Record<string, number> = {};
        allCommits.forEach((commit) => {
            const date = new Date(commit.commit.author.date).toISOString().split("T")[0];
            commitMap[date] = (commitMap[date] || 0) + 1;
        });

        const result = Object.entries(commitMap)
            .map(([date, count]) => ({ date, count }))
            .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

        return res.status(200).json(result);
    } catch (error: any) {
        console.error("Error:", error.message);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};
