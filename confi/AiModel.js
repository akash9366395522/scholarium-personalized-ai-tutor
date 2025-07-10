import { GoogleGenerativeAI } from "@google/generative-ai";

const apikey = process.env.EXPO_PUBLIC_GEMINI_API_KEY;

const genAI = new GoogleGenerativeAI(apikey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-exp",
});

const generationConfig = {
  temperature: 1,
  topP: 1,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export const GenerateTopicsAIModel = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: `Learn Python : :As your are coaching teacher
- User want to learn about the topic
- Generate 5-7 Course title for study (Short)
- Make sure it is related to description
- Output will be ARRAY of String in JSON FORMAT only
- Do not add any plain text in output
- Provide the name of the Array ,`,
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: `{
  "coursetitles": [
    "Python Basics: A Gentle Introduction",
    "Data Manipulation with Python",
    "Python for Automation & Scripting",
    "Object-Oriented Programming in Python",
    "Web Development with Python (Flask/Django)",
    "Data Analysis with Python (Pandas/NumPy)",
    "Machine Learning Fundamentals using Python"
  ]
}`,
        },
      ],
    },
  ],
});

export const GenerateCourseAIModel = model.startChat({
  generationConfig,
  history:[

  ],
});
