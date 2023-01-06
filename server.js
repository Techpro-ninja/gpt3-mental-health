const express = require("express");
const cors = require("cors");

// Import the OpenAI
const { Configuration, OpenAIApi } = require("openai");

// Create a new OpenAI configuration and paste your API key
// obtained from Step 1
// The key displayed here is a fake key
const configuration = new Configuration({
    apiKey: "sk-grcXXXXJn5KZHXXX7rT3BlbkFJtufXz7xErXXXXXXXXW",
});
const openai = new OpenAIApi(configuration);

const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const port = 3000;

// create a post route
app.post("/openai-api", async (req, res) => {
    const data = req.body;

    // Query the OpenAI API
    // Bringing in the training model from Part 1 of the tutorial on mental health
    let promptContext = `Application to precede the mental health diagnosis before going to a psychologist. We will listen to the patient very calmly and try to understand the issue and its root causes. We will keep asking a variety of questions in and around the issue and ultimately try to understand the root cause. Once, we are thorough, we will prepare a summary and suggest a psychologist for further diagnosis. If we are unsure of the given situation, we will answer with a question asking for more details, and only if the patient asks about suicide, we will provide them suicide helpline number
    P: I have a mental health issue 
    A: Alright, we will try to understand the issue and identify the root cause. Once we understand your problem thoroughly, we will try to find a solution. 
    P: I have a very abusive manager at the office 
    A: Can you give me some background about your office culture 
    P: I work in a multi-national company and my manager is not sympathetic toward the problems in team building. Instead, he thinks that these are non-issue and we should only focus on work and compete with each other.`;

    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `${promptContext} ${data.queryPrompt} ?`,
        temperature: 0,
        max_tokens: 60,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
    });
    console.log(response.data);
    res.json(response.data);
});

app.listen(port, () => {
    console.log(`Node server listening at http://localhost:${port}`);
});
