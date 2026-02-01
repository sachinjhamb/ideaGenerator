import { describe, it, expect, vi, beforeEach } from 'vitest';
import { logger } from './logger';
import JSZip from 'jszip';

describe('logger utility', () => {
    beforeEach(() => {
        localStorage.clear();
        vi.restoreAllMocks();
    });

    it('should write logs to localStorage', () => {
        logger.info('Test Info');
        const logs = JSON.parse(localStorage.getItem('leadership-pulse-logs-active'));
        expect(logs.length).toBe(1);
        expect(logs[0].message).toBe('Test Info');
        expect(logs[0].level).toBe('INFO');
    });

    it('should cap logs at 500 entries', () => {
        for (let i = 0; i < 510; i++) {
            logger.info(`Log ${i}`);
        }
        const logs = JSON.parse(localStorage.getItem('leadership-pulse-logs-active'));
        expect(logs.length).toBe(500);
        expect(logs[logs.length - 1].message).toBe('Log 509');
    });

    it('should rollover and zip logs if date changes', async () => {
        // Set up a "yesterday" log
        const yesterday = '2026-01-31';
        localStorage.setItem('leadership-pulse-logs-last-date', yesterday);
        logger.info('Yesterday log');

        // Initialize today
        await logger.init();

        const activeLogs = JSON.parse(localStorage.getItem('leadership-pulse-logs-active'));
        const archives = JSON.parse(localStorage.getItem('leadership-pulse-logs-archives'));

        // Active logs should contain the init message but not previous logs
        expect(activeLogs.some(l => l.message.includes('Yesterday'))).toBe(false);
        expect(activeLogs.some(l => l.message.includes('Logger initialized'))).toBe(true);

        // Archives should have the zipped content
        expect(archives.length).toBe(1);
        expect(archives[0].date).toBe(yesterday);
        expect(archives[0].zippedContent).toBeDefined();
    });

    it('should retain only last 7 days of archives', async () => {
        const archives = [];
        for (let i = 1; i <= 10; i++) {
            archives.push({ date: `2026-01-${i}`, zippedContent: `zip${i}` });
        }
        localStorage.setItem('leadership-pulse-logs-archives', JSON.stringify(archives));

        // Create a new rollover
        localStorage.setItem('leadership-pulse-logs-last-date', '2026-01-11');
        localStorage.setItem('leadership-pulse-logs-active', JSON.stringify([{ message: 'Old' }]));

        await logger.init();

        const finalArchives = JSON.parse(localStorage.getItem('leadership-pulse-logs-archives'));
        expect(finalArchives.length).toBe(7);
        expect(finalArchives[finalArchives.length - 1].date).toBe('2026-01-11');
    });
});
