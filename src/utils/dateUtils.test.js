import { describe, it, expect } from 'vitest';
import { getWeekDates } from './dateUtils';

describe('dateUtils', () => {
    it('should return correct date range for week 1 of 2026', () => {
        // 2026-01-01 is a Thursday. Week 1 Monday is Dec 29, 2025.
        const range = getWeekDates(1, 2026);
        expect(range).toContain('29');
        expect(range).toContain('Dec');
        expect(range).toContain('4');
        expect(range).toContain('Jan');
        expect(range).toContain('2026');
    });

    it('should return correct date range for week 5 of 2026', () => {
        // Week 5 Monday is Jan 26
        const range = getWeekDates(5, 2026);
        expect(range).toContain('26');
        expect(range).toContain('Jan');
        expect(range).toContain('1');
        expect(range).toContain('Feb');
        expect(range).toContain('2026');
    });
});
