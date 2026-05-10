const form = document.getElementById("audit-form");
const tool = document.getElementById("tool");
const plan = document.getElementById("plan");
const spend = document.getElementById("spend");
const seats = document.getElementById("seats");
const teamSize = document.getElementById("teamSize");
const useCase = document.getElementById("useCase");
const addBtn =document.querySelector(".add-btn");
const toolContainer =document.getElementById("tool-container");
let toolCount = 1;
let addedTools = [];
const pricingData = {
  chatgpt: {
    free: 0,
    go: 8,
    plus: 20,
    pro: 100,
    business: 20
  },
  cursor: {
    hobby: 0,
    pro: 20,
    proPlus: 60,
    ultra: 200,
    teams: 40
  },
  claude: {
    free: 0,
    pro: 20,
    max: 100,
    teamStandard: 25,
    teamPremium: 125
  },
  githubCopilot: {
    free: 0,
    pro: 10,
    proPlus: 39,
    business: 19,
    enterprise: 39
  },
  gemini: {
    base: 99,
    starter: 270,
    standard: 864
  },
  v0: {
    free: 0,
    team: 30,
    business: 100
  }
};

const capabilities = {
  coding: ["cursor", "github copilot", "chatgpt", "claude"],
  writing: ["claude", "chatgpt", "gemini"],
  research: ["chatgpt", "claude", "gemini"],
};


form.addEventListener("submit", function (event) {
  event.preventDefault();

  const auditData = {
    tool: tool.value,
    plan: plan.value,
    spend: spend.value,
    seats: seats.value,
    teamSize: teamSize.value,
    useCase: useCase.value,
  };

  console.log(auditData);
});

form.addEventListener("submit", function (event) {
  event.preventDefault();

  console.log("Form Submitted");
});


tool.addEventListener("change", function(){

    const selectedTool = tool.value;

    const plans =
        pricingData[selectedTool];

    plan.innerHTML = "";

    for(let singlePlan in plans){

        const option =
            document.createElement("option");

        option.value = singlePlan;

        option.textContent =
            `${singlePlan} ($${plans[singlePlan]})`;

        plan.appendChild(option);

    }

});
addBtn.addEventListener("click", function(){

    toolCount++;

    const toolCard =
    document.createElement("div");

    toolCard.classList.add("tool-card");

    toolCard.innerHTML = `

        <span class="tool-number">
            TOOL ${toolCount}
        </span>

        <div class="input-group">

            <label>Tool</label>

            <select class="tool-select">

                <option value="">
                    Select Tool
                </option>

                <option value="chatgpt">
                    ChatGPT
                </option>

                <option value="cursor">
                    Cursor
                </option>

                <option value="claude">
                    Claude
                </option>

                <option value="githubCopilot">
                    GitHub Copilot
                </option>

                <option value="gemini">
                    Gemini
                </option>

                <option value="v0">
                    v0
                </option>

            </select>

        </div>

        <div class="input-group">

            <label>Current plan</label>

            <select class="plan-select">

                <option>
                    Select Plan
                </option>

            </select>

        </div>

        <div class="input-group">

            <label>Number of seats</label>

            <input
                type="number"
                class="seat-input"
                placeholder="1"
            >

        </div>

    `;

    toolContainer.appendChild(toolCard);

});