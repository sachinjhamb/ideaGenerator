import { getWeeklyIdeas } from '../data/ideas';
import { logger } from '../utils/logger';

/**
 * Service to fetch leadership ideas from an external source.
 * Falls back to high-quality local industry best practices on failure.
 */
export const fetchWeeklyIdeas = async (week) => {
    const baseUrl = import.meta.env.VITE_API_BASE_URL || 'https://raw.githubusercontent.com/sachinjhamb/leadership-ideas/main';
    const API_URL = `${baseUrl}/week-${week}.json`;

    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error(`Cloud sync failed: ${response.status}`);
        }

        const data = await response.json();
        logger.info(`Successfully fetched ideas for week ${week} from cloud.`);
        return data;
    } catch (error) {
        logger.warn(`Network fetch failed for week ${week}, falling back to local: ${error.message}`);
        console.warn('Network fetch failed, falling back to local best practices:', error.message);

        // Local fallback logic
        const localIdeas = getWeeklyIdeas(week);
        if (!localIdeas) throw new Error('No ideas available even in fallback.');

        return localIdeas;
    }
};

/**
 * Fetches trending technical headlines from credible RSS feeds via rss2json.
 */
export const fetchTrendingHeadlines = async () => {
    // SRE Weekly feed converted to JSON
    const SRE_WEEKLY_RSS = 'https://sreweekly.com/feed/';
    const AWS_FINSERV_RSS = 'https://aws.amazon.com/blogs/financial-services/feed/';

    // Using a public rss2json converter (no API key required for basic use)
    const CONVERTER_URL = (rss) => `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rss)}`;

    try {
        const [sreRes, awsRes] = await Promise.all([
            fetch(CONVERTER_URL(SRE_WEEKLY_RSS)),
            fetch(CONVERTER_URL(AWS_FINSERV_RSS))
        ]);

        const [sreData, awsData] = await Promise.all([
            sreRes.json(),
            awsRes.json()
        ]);

        logger.info(`Fetched headlines: ${sreData.items?.length || 0} SRE, ${awsData.items?.length || 0} AWS.`);

        // Combine and format
        const headlines = [
            ...(sreData.items || []).map(item => ({ ...item, source: 'SRE Weekly' })),
            ...(awsData.items || []).map(item => ({ ...item, source: 'AWS Financial Services' }))
        ];

        // Sort by pubDate descending and limit to 10
        return headlines
            .sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate))
            .slice(0, 10);
    } catch (error) {
        logger.error(`Failed to fetch trending headlines: ${error.message}`);
        console.error('Failed to fetch trending headlines:', error);
        return []; // Return empty list on failure to avoid breaking UI
    }
};
