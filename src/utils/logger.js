import JSZip from 'jszip';

const LOG_KEYS = {
    ACTIVE: 'leadership-pulse-logs-active',
    ARCHIVES: 'leadership-pulse-logs-archives',
    LAST_DATE: 'leadership-pulse-logs-last-date'
};

/**
 * Modular logging utility for Leadership Idea Generator.
 * Handles daily rolling logs in localStorage and auto-compression using JSZip.
 */
export const logger = {
    /**
     * Initializes the logger, handles daily rollover and compression.
     */
    async init() {
        const today = new Date().toISOString().split('T')[0];
        const lastDate = localStorage.getItem(LOG_KEYS.LAST_DATE);

        if (lastDate && lastDate !== today) {
            await this._rollover(lastDate);
        }

        localStorage.setItem(LOG_KEYS.LAST_DATE, today);
        this.info(`Logger initialized for ${today}`);
    },

    /**
     * Log an informational message.
     */
    info(message) { this._log('INFO', message); },

    /**
     * Log a warning message.
     */
    warn(message) { this._log('WARN', message); },

    /**
     * Log an error message.
     */
    error(message) { this._log('ERROR', message); },

    /**
     * Internal logging logic.
     */
    _log(level, message) {
        const entry = {
            timestamp: new Date().toISOString(),
            level,
            message
        };

        // Standard console output for developer visibility
        const consoleMethod = level === 'ERROR' ? 'error' : (level === 'WARN' ? 'warn' : 'log');
        console[consoleMethod](`[${entry.timestamp}] ${level}: ${message}`);

        try {
            const logs = this._getLogs();
            logs.push(entry);
            // Cap the active log size to avoid localStorage limits (e.g., last 500 entries)
            if (logs.length > 500) logs.shift();
            localStorage.setItem(LOG_KEYS.ACTIVE, JSON.stringify(logs));
        } catch (e) {
            console.error('Failed to write to localStorage logger:', e);
        }
    },

    /**
     * Get active logs from storage.
     */
    _getLogs() {
        const logs = localStorage.getItem(LOG_KEYS.ACTIVE);
        return logs ? JSON.parse(logs) : [];
    },

    /**
     * Move logs to archive and compress.
     */
    async _rollover(date) {
        const logs = this._getLogs();
        if (logs.length === 0) return;

        try {
            const zip = new JSZip();
            zip.file(`logs-${date}.json`, JSON.stringify(logs, null, 2));
            const content = await zip.generateAsync({ type: 'base64' });

            const archives = this._getArchives();
            // Keep last 7 days of archives
            archives.push({
                date,
                zippedContent: content
            });
            while (archives.length > 7) archives.shift();

            localStorage.setItem(LOG_KEYS.ARCHIVES, JSON.stringify(archives));
            localStorage.removeItem(LOG_KEYS.ACTIVE);
            console.log(`Successfully zipped and archived logs for ${date}`);
        } catch (err) {
            console.error('Failed to rollover logs safely:', err);
        }
    },

    /**
     * Get archived logs.
     */
    _getArchives() {
        const archives = localStorage.getItem(LOG_KEYS.ARCHIVES);
        return archives ? JSON.parse(archives) : [];
    },

    /**
     * Public API to get history.
     */
    getHistory() {
        return this._getLogs();
    },

    /**
     * Resets all logs (useful for debugging/testing).
     */
    clearAll() {
        localStorage.removeItem(LOG_KEYS.ACTIVE);
        localStorage.removeItem(LOG_KEYS.ARCHIVES);
        localStorage.removeItem(LOG_KEYS.LAST_DATE);
    }
};
