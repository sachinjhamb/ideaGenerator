import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fetchWeeklyIdeas, fetchTrendingHeadlines } from './ideaService';
import * as ideasData from '../data/ideas';

describe('ideaService (Real Network)', () => {
    beforeEach(() => {
        vi.stubGlobal('fetch', vi.fn());
        // Mock import.meta.env
        vi.stubGlobal('import.meta', { env: { VITE_API_BASE_URL: 'https://test-api.com' } });
    });

    it('should use a valid base URL to fetch ideas', async () => {
        fetch.mockResolvedValue({
            ok: true,
            json: () => Promise.resolve({})
        });

        await fetchWeeklyIdeas(1);
        // Verify it calls a URL ending with week-1.json
        expect(fetch).toHaveBeenCalledWith(expect.stringMatching(/week-1\.json$/));
    });

    it('should return data from API on success', async () => {
        const mockData = {
            'service-mgmt': { title: 'Cloud Success', todos: [] },
            'investments': { title: 'Cloud Success', todos: [] },
            'data-eng': { title: 'Cloud Success', todos: [] }
        };

        fetch.mockResolvedValue({
            ok: true,
            json: () => Promise.resolve(mockData)
        });

        const data = await fetchWeeklyIdeas(1);
        expect(data['service-mgmt'].title).toBe('Cloud Success');
    });

    it('should fallback to local data if API returns 404', async () => {
        fetch.mockResolvedValue({ ok: false, status: 404 });
        const localSpy = vi.spyOn(ideasData, 'getWeeklyIdeas');

        const data = await fetchWeeklyIdeas(1);
        expect(localSpy).toHaveBeenCalledWith(1);
        expect(data['service-mgmt'].title).toBe('MTTR Reduction through AIOps');
    });

    it('should fallback to local data if network throws error', async () => {
        fetch.mockRejectedValue(new Error('Network Down'));
        const data = await fetchWeeklyIdeas(1);
        expect(data['service-mgmt'].title).toBe('MTTR Reduction through AIOps');
    });

    describe('fetchTrendingHeadlines', () => {
        it('should return combined sorted headlines', async () => {
            const mockRes = {
                items: [{ title: 'News 1', pubDate: '2026-02-01', link: '#' }]
            };
            fetch.mockResolvedValue({
                ok: true,
                json: () => Promise.resolve(mockRes)
            });

            const headlines = await fetchTrendingHeadlines();
            expect(headlines.length).toBeGreaterThan(0);
            expect(headlines[0]).toHaveProperty('source');
        });

        it('should return empty array on failure', async () => {
            fetch.mockRejectedValue(new Error('API Error'));
            const headlines = await fetchTrendingHeadlines();
            expect(headlines).toEqual([]);
        });
    });
});
