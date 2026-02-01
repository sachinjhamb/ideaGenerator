import { describe, it, expect } from 'vitest';
import { getWeeklyIdeas } from './ideas';

describe('ideas data logic', () => {
    it('should return 3 leaders ideas with premium content', () => {
        const ideas = getWeeklyIdeas(1);
        expect(ideas).toHaveProperty('service-mgmt');
        expect(ideas['service-mgmt'].title).toBe('MTTR Reduction through AIOps');
    });

    it('should have 4 to-dos for the updated service-mgmt idea', () => {
        const ideas = getWeeklyIdeas(1);
        expect(ideas['service-mgmt'].todos).toHaveLength(4);
        expect(ideas['service-mgmt'].todos[0].priority).toBeDefined();
    });

    it('should return different ideas for different weeks (rotation)', () => {
        const week1 = getWeeklyIdeas(1);
        const week2 = getWeeklyIdeas(2);
        expect(week1['service-mgmt'].title).not.toBe(week2['service-mgmt'].title);
    });
});
