export const leaders = [
    { id: 'service-mgmt', name: 'Service Management Team Lead', color: '#6366f1', class: 'service-mgmt' },
    { id: 'investments', name: 'Investments Team Leader', color: '#10b981', class: 'investments' },
    { id: 'data-eng', name: 'Data Engineering Leader', color: '#f59e0b', class: 'data-eng' },
];

export const getWeeklyIdeas = (week) => {
    const rotationIndex = (week - 1) % 5;

    const ideas = {
        'service-mgmt': [
            {
                title: "MTTR Reduction through AIOps",
                rationale: "In high-stakes asset management environments, downtime directly impacts trading desk availability. Shifting from reactive to predictive resolution is critical.",
                todos: [
                    { text: "Audit top 5 recurring incidents from the last 30 days", priority: "High" },
                    { text: "Evaluate one observability tool for anomaly detection", priority: "Medium" },
                    { text: "Update escalation matrix for 'Gold' tier services", priority: "High" },
                    { text: "Hold a 'Failure Mode and Effects' (FMEA) workshop", priority: "Low" }
                ]
            },
            {
                title: "Servant Leadership for On-Call Teams",
                rationale: "Sustainable service management requires psychological safety and burnout prevention for support engineers.",
                todos: [
                    { text: "Conduct 1:1 'Burnout Check' with on-call rotation lead", priority: "High" },
                    { text: "Review 'No-Blame Post-Mortem' template", priority: "Medium" },
                    { text: "Implement a 'Recovery Day' policy for overnight incidents", priority: "Low" },
                    { text: "Set up a shared team kudos board", priority: "Low" }
                ]
            },
            {
                title: "SLO Alignment with Business Owners",
                rationale: "Service Level Objectives (SLOs) must reflect the true cost of downtime for portfolio managers, not just technical uptime.",
                todos: [
                    { text: "Schedule 15m interview with a lead Portfolio Manager", priority: "High" },
                    { text: "Map technical uptime to business 'Error Budget'", priority: "Medium" },
                    { text: "Draft a simplified monthly service health report", priority: "Medium" },
                    { text: "Identify 1 service where SLO is set too high/low", priority: "Low" }
                ]
            },
            {
                title: "Automation of Standards (Compliance as Code)",
                rationale: "Audit and regulatory compliance in asset management should be a byproduct of the pipeline, not a manual fire drill.",
                todos: [
                    { text: "Identify one manual compliance check to automate", priority: "High" },
                    { text: "Review the 'Golden Signal' dashboards for drifts", priority: "Medium" },
                    { text: "Validate backup restoration for trading db", priority: "High" },
                    { text: "Update the Service Catalog metadata", priority: "Low" }
                ]
            },
            {
                title: "The Service Catalog as a Product",
                rationale: "Treating internal tools and service listings as products improves adoption and reduces shadow IT costs.",
                todos: [
                    { text: "Review user feedback on the service request portal", priority: "High" },
                    { text: "Simplify the 'Request for Admin Access' workflow", priority: "Medium" },
                    { text: "Draft a 1-page user guide for the VPN migration", priority: "Low" },
                    { text: "Analyze most searched terms in Knowledge Base", priority: "Medium" }
                ]
            }
        ],
        'investments': [
            {
                title: "AI/ML Strategy for Alpha Generation",
                rationale: "Integrating alternative data and machine learning into investment processes provides a competitive edge in portfolio construction.",
                todos: [
                    { text: "Map out the path for 'Data Scientist in Residence'", priority: "High" },
                    { text: "Review the 'Feature Store' for investment signals", priority: "Medium" },
                    { text: "Discuss AI ethical bias in model selection with Risk", priority: "High" },
                    { text: "Audit 3rd party NLP tools for news sentiment", priority: "Low" }
                ]
            },
            {
                title: "Modernizing the Portfolio Management System",
                rationale: "Legacy PMS systems are the biggest bottleneck to agility. A decoupled, API-first approach is the industry standard.",
                todos: [
                    { text: "Document 3 friction points in current trade entry", priority: "High" },
                    { text: "Review API documentation for the current vendor", priority: "Medium" },
                    { text: "Budget for a 'UI/UX Refresh' of internal dash", priority: "Low" },
                    { text: "Evaluate cloud-native PM solutions", priority: "Medium" }
                ]
            },
            {
                title: "Market Tech Pulse: Tokenization & DeFi",
                rationale: "Understanding the impact of private markers and tokenization of assets is essential for long-term strategic positioning.",
                todos: [
                    { text: "Read the latest BIS report on Digital Assets", priority: "Medium" },
                    { text: "Schedule a tech demo with a crypto-custody provider", priority: "Low" },
                    { text: "Identify investable themes in 'FinTech 2.0'", priority: "High" },
                    { text: "Review internal readiness for T+1 settlement", priority: "High" }
                ]
            },
            {
                title: "Bridging the Gap: Engineers & Traders",
                rationale: "The 'Smartest Person in the Room' culture can create silos. Tech leads must facilitate empathy between builders and users.",
                todos: [
                    { text: "Pair an engineer with a trader for 2 hours", priority: "High" },
                    { text: "Host a 'Lunch & Learn' on Python for Analysts", priority: "Medium" },
                    { text: "Review the 'Value Stream' for a single trade flow", priority: "High" },
                    { text: "Simplify technical jargon in board decks", priority: "Low" }
                ]
            },
            {
                title: "Sustainable Investing (ESG) Data Integration",
                rationale: "ESG is no longer a niche. Real-time ESG data integration into pre-trade compliance is a top-tier requirement.",
                todos: [
                    { text: "Audit the accuracy of current ESG data provider", priority: "High" },
                    { text: "Integrate ESG score into the OMS pre-trade check", priority: "High" },
                    { text: "Define 'Materiality' metrics for tech companies", priority: "Medium" },
                    { text: "Review reporting requirements for SFDR", priority: "Low" }
                ]
            }
        ],
        'data-eng': [
            {
                title: "Data Observability & Trust",
                rationale: "Data engineering is about building trust. Silent data failures at the source are the most dangerous.",
                todos: [
                    { text: "Deploy proactive data quality checks at ingest", priority: "High" },
                    { text: "Set up 'Data Freshness' alerts for the warehouse", priority: "High" },
                    { text: "Review the Data Lineage map for Core NAV", priority: "Medium" },
                    { text: "Interview a consumer about 'Data Trust Score'", priority: "Low" }
                ]
            },
            {
                title: "Decoupling Storage from Compute",
                rationale: "Cost optimization and scalability in asset management require moving away from monolithic data warehouses.",
                todos: [
                    { text: "Analyze Snowflake/BigQuery credit usage", priority: "High" },
                    { text: "Draft a plan for a 'Delta Lake' architecture", priority: "Medium" },
                    { text: "Optimized 3 most expensive SQL queries", priority: "Medium" },
                    { text: "Retire 2 unused legacy data pipelines", priority: "Low" }
                ]
            },
            {
                title: "Data Governance as a Business Enabler",
                rationale: "Good governance isn't a hurdle; it's the speed rail that allows analysts to find and use data safely.",
                todos: [
                    { text: "Enable 'Self-Service' catalog for 1 business unit", priority: "High" },
                    { text: "Review PII maskings in the sandbox environment", priority: "High" },
                    { text: "Appoint 3 'Data Stewards' from the business side", priority: "Medium" },
                    { text: "Clean up the 'General Purpose' bucket permissions", priority: "Low" }
                ]
            },
            {
                title: "Building a Real-Time Data Fabric",
                rationale: "Batch processing is dying. T+0 reporting requires a robust streaming architecture (Kafka/Flink).",
                todos: [
                    { text: "Identify one use case for real-time trade monitoring", priority: "High" },
                    { text: "Audit current Kafka cluster performance", priority: "Medium" },
                    { text: "Review 'Schema Registry' versions for drifts", priority: "Low" },
                    { text: "Design a failover for the event-bus", priority: "High" }
                ]
            },
            {
                title: "The Pythonic Data Engineering Culture",
                rationale: "Shifting from SQL-only to a software engineering mindset in data improves maintainability and CI/CD rigor.",
                todos: [
                    { text: "Standardize the 'Data Pipeline' CI/CD template", priority: "High" },
                    { text: "Introduce 'Unit Testing' for SQL transformations", priority: "Medium" },
                    { text: "Review the 'Docstring' coverage in data models", priority: "Low" },
                    { text: "Host a team session on 'Effective Pandas'", priority: "Low" }
                ]
            }
        ]
    };

    return {
        'service-mgmt': ideas['service-mgmt'][rotationIndex],
        'investments': ideas['investments'][rotationIndex],
        'data-eng': ideas['data-eng'][rotationIndex]
    };
};
