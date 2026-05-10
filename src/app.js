const form = document.getElementById("audit-form");
const tool = document.getElementById("tool");
const plan = document.getElementById("plan");
const spend = document.getElementById("spend");
const seats = document.getElementById("seats");
const teamSize = document.getElementById("teamSize");
const useCase = document.getElementById("useCase");
const addBtn = document.querySelector(".add-btn");
const selectedTools = document.getElementById("selected-tools");
let addedTools = [];
const pricingData = {
  chatgpt: {
    free: 0,
    go: 8,
    plus: 20,
    pro: 100,
    business: 20,
  },
  cursor: {
    hobby: 0,
    pro: 20,
    proPlus: 60,
    ultra: 200,
    teams: 40,
  },
  claude: {
    free: 0,
    pro: 20,
    max: 100,
    teamStandard: 25,
    teamPremium: 125,
  },
  githubCopilot: {
    free: 0,
    pro: 10,
    proPlus: 39,
    business: 19,
    enterprise: 39,
  },
  gemini: {
    base: 99,
    starter: 270,
    standard: 864,
  },
  v0: {
    free: 0,
    team: 30,
    business: 100,
  },
};

const capabilities = {
  coding: ["cursor", "github copilot", "chatgpt", "claude"],
  writing: ["claude", "chatgpt", "gemini"],
  research: ["chatgpt", "claude", "gemini"],
};

function getFormData() {
  return {
    tool:
      tool.value,
    plan:
      plan.value,
    spend:
      Number(spend.value),
    seats:
      Number(seats.value),
    teamSize:
      Number(teamSize.value),
    useCase:
      useCase.value,
  };

}

function saveTool(toolData) {
  addedTools.push(toolData);
}

function renderTool(toolData) {
  const card = document.createElement("div");

  card.classList.add("selected-card");

  const totalSpend = pricingData[toolData.tool][toolData.plan] * toolData.seats;

  card.innerHTML = `
      <div class="selected-content">
        <div class="tool-info">
          <span class="tool-label">
            Tool added :-
          </span>
          <span class="tool-text">
           ${formatText(toolData.tool)}-
           ${formatText(toolData.plan)}-
            ${toolData.seats} seats-
            $${totalSpend}/mo
          </span>
        </div>
        <button class="remove-btn">✕</button>
      </div>`;
  selectedTools.appendChild(card);
}
function resetToolForm() {
  tool.value = "";
  renderPlans("");
  spend.value = "";
  seats.value = "";
  teamSize.value = "";
  useCase.selectedIndex = 0;
}

// tool.addEventListener("change", function () {
//   const selectedTool = tool.value;
//   const plans = pricingData[selectedTool];
//   plan.innerHTML = "";

//   for (let singlePlan in plans) {
//     const option = document.createElement("option");
//     option.value = singlePlan;
//     option.textContent = `${singlePlan} ($${plans[singlePlan]})`;
//     plan.appendChild(option);
//   }
// });

function renderPlans(selectedTool) {
  if (!selectedTool) {
    plan.disabled = true;
    plan.innerHTML = `
          <option value="">
            Select Plan
          </option>
        `;
    return;
  }

  plan.disabled = false;
  const plans = pricingData[selectedTool];
  plan.innerHTML = `
      <option value="">
        Select Plan
      </option>
    `;

  for (let singlePlan in plans) {
    const option = document.createElement("option");
    option.value = singlePlan;
    option.textContent = `${singlePlan} ($${plans[singlePlan]})`;
    plan.appendChild(option);
  }
}

function calculateCurrentSpend(toolData) {
  const toolPrice = pricingData[toolData.tool][toolData.plan];
  return toolPrice * toolData.seats;
}

function checkTeamOverkill(toolData) {
  if (toolData.seats <= 2 && toolData.plan.toLowerCase().includes("team")) {
    return {
      recommendedPlan: "pro",
      reason: "Team plans are excessive for small teams.",
      recommendation: "Downgrade to Pro",
    };
  }
  return null;
}

function checkEnterpriseOverkill(toolData) {
  if (
    toolData.seats < 10 &&
    toolData.plan.toLowerCase().includes("enterprise")
  ) {
    return {
      recommendedPlan: "business",
      reason: "Enterprise plans are expensive for smaller teams.",
      recommendation: "Switch to Business",
    };
  }

  return null;
}

function checkCursorUltra(toolData) {
  if (toolData.tool === "cursor" && toolData.plan === "ultra") {
    return {
      recommendedPlan: "pro",
      reason: "Cursor Ultra is usually unnecessary for startups.",
      recommendation: "Downgrade to Cursor Pro",
    };
  }

  return null;
}

function runAudit() {
  const auditResults = [];
  addedTools.forEach(function (toolData) {
    const currentSpend = calculateCurrentSpend(toolData);
    let audit = checkTeamOverkill(toolData);
    if (!audit) {
      audit = checkEnterpriseOverkill(toolData);
    }
    if (!audit) {
      audit = checkCursorUltra(toolData);
    }
    if (!audit) {
      audit = {
        recommendedPlan: toolData.plan,
        recommendation: "No changes needed",
        reason: "Current setup looks optimized.",
      };
    }
   const optimizedPlanPrice =

  pricingData[
    toolData.tool
  ][
    audit.recommendedPlan
  ]

  ||

  pricingData[
    toolData.tool
  ][
    toolData.plan
  ];
    const optimizedSpend = optimizedPlanPrice * toolData.seats;
    const savings = currentSpend - optimizedSpend;
    auditResults.push({
      ...toolData,

      currentSpend,

      optimizedSpend,

      savings,

      ...audit,
    });
  });

  console.log(auditResults);
}

function formatText(text) {
  return text.replace(/([A-Z])/g, " $1").replace(/^./, function (str) {
    return str.toUpperCase();
  });
}

form.addEventListener("submit", function (event) {
  event.preventDefault();

  runAudit();
});

tool.addEventListener("change", function () {
  renderPlans(tool.value);
});

addBtn.addEventListener("click", function () {
  const toolData = getFormData();
  if (!toolData.tool || !toolData.plan) {
    alert("Please select tool and plan");

    return;
  }
  saveTool(toolData);
  renderTool(toolData);
  resetToolForm();
  console.log(addedTools);
});

renderPlans("");