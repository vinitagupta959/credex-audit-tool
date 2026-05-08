const toolPricingData = {
    "cursor": {
        url: "https://cursor.com/pricing",
        verified: "2026-05-08",
        plans: {
            "hobby": { price: 0, type: "individual" },
            "pro": { price: 20, type: "individual" },
            "pro-plus": { price: 60, type: "individual" },
            "ultra": { price: 200, type: "individual" },
            "teams": { price: 40, type: "per-seat" }
        },
        auditLogic: (seats, currentPlan) => {
            if (seats <= 2 && currentPlan === "teams") {
                return "Switch to Pro. Teams plan is overkill for < 3 users."; 
            }
            return null;
        }
    },
    "chatgpt": {
        url: "https://chatgpt.com/pricing",
        verified: "2026-05-08",
        plans: {
            "free": { price: 0, type: "individual" },
            "go": { price: 8, type: "individual" },
            "plus": { price: 20, type: "individual" },
            "pro": { price: 100, type: "individual" },
            "business": { price: 20, type: "per-seat" }
        },
        auditLogic: (seats, currentPlan) => {
            if (currentPlan === "pro" && seats === 1) {
                return "Check if Plus ($20) covers your needs unless you need high-cap API access.";
            }
            return null;
        }
    },
    "claude": {
        url: "https://claude.com/pricing",
        verified: "2026-05-08",
        plans: {
            "free": { price: 0, type: "individual" },
            "pro": { price: 20, type: "individual" }, // Note: Annual $17 option
            "max": { price: 100, type: "individual" },
            "team-standard": { price: 25, type: "per-seat" },
            "team-premium": { price: 125, type: "per-seat" }
        },
        auditLogic: (seats, currentPlan) => {
            if (currentPlan === "team-standard" && seats < 5) {
                return "Individual Pro accounts might be cheaper if team features aren't used.";
            }
            return null;
        }
    },
    "copilot": {
        url: "https://github.com/features/copilot/plans",
        verified: "2026-05-08",
        plans: {
            "free": { price: 0, type: "individual" },
            "pro": { price: 10, type: "individual" },
            "pro-plus": { price: 39, type: "individual" },
            "business": { price: 19, type: "per-seat" },
            "enterprise": { price: 39, type: "per-seat" }
        },
        auditLogic: (seats, currentPlan) => {
            if (currentPlan === "enterprise" && seats < 10) {
                return "Consider Business plan ($19) unless you specifically need fine-tuned models.";
            }
            return null;
        }
    },
    "gemini": {
        url: "https://workspace.google.com/pricing",
        verified: "2026-05-08",
        plans: {
            "base": { price: 1.20, type: "per-seat" }, // Approximate conversion from ₹99
            "starter": { price: 3.25, type: "per-seat" }, // Approximate conversion from ₹270
            "standard": { price: 10.40, type: "per-seat" } // Approximate conversion from ₹864
        }
    },
    "v0": {
        url: "https://v0.dev/pricing",
        verified: "2026-05-08",
        plans: {
            "free": { price: 0, type: "individual" },
            "team": { price: 30, type: "per-seat" },
            "business": { price: 100, type: "per-seat" }
        }
    }
};