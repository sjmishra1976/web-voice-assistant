require("dotenv").config();
const { OpenAI } = require("openai");



//const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
// Initialize OpenAI with API key
const openai = new OpenAI({  baseURL: process.env.LLM_API_URL, apiKey: process.env.OPENAI_API_KEY });

const fintechTools = {
  getBalance: () => "Your balance is $5,200.",
  detectFraud: () => "No suspicious activity found.",
  portfolioStatus: () => "Your portfolio is up 3.2% this quarter."
};

async function handleMCPMessage(user_input, context, goal) {
  const toolPrompt = `You are a fintech assistant. Respond using tools if needed:
- getBalance
- detectFraud
- portfolioStatus

User: ${user_input}`;

  const completion = await openai.chat.completions.create({
   // model: "gpt-3.5-turbo",
   model: "llama3",
    messages: [
      { role: "system", content: toolPrompt },
      { role: "user", content: user_input }
    ]
  });

  const reply = completion.choices[0].message.content;

  let toolOutput = "";
  if (/balance/i.test(user_input)) toolOutput = fintechTools.getBalance();
  if (/fraud/i.test(user_input)) toolOutput = fintechTools.detectFraud();
  if (/portfolio|investment/i.test(user_input)) toolOutput = fintechTools.portfolioStatus();

  return {
    context,
    goal,
    response: `${reply}\n\n[Tool]: ${toolOutput}`
  };
}

module.exports = { handleMCPMessage };
