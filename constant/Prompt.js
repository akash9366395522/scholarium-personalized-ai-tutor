import dedent from "dedent";

export default {
  IDEA: dedent`:As your are coaching teacher
    - User want to learn about the topic
    - Generate 5-7 Course title for study (Short)
    - Make sure it is releated to description
    - Output will be ARRAY of String in JSON FORMAT only
    - Do not add any plain text in output,
    `,
  // - Chapter Explain in HTML Form, (Code example if required), add line break if required
  COURSE: dedent`
  As you are a coaching teacher:
  - The user wants to learn about all topics.
  - Create 2 courses with: courseTitle, description, banner_image, category, chapters (5-8).
  - Each chapter must include chapterName and content (list of topic, explain, code, and example).
  - Explain the chapter content in 5–8 lines with detailed examples and code if required.
  - Choose courseBanner randomly from: ["/banner1.png", "/banner2.png", "/banner3.png", "/banner4.png", "/banner5.png"]
  - Categorize each course into one of: ["Tech & Coding", "Business & Finance", "Health & Fitness", "Science & Engineering", "Arts & Creativity"]
  - Also mark course difficulty as "Easy", "Moderate", or "Advanced" based on topics.
  - Generate 10 quizzes, 10 flashcards, and 10 question-and-answer pairs.
  - Output should be **strictly valid JSON** (no extra text, no comments, no trailing commas).
  - Use this structure:
  
  {
    "courses": [
      {
        "courseTitle": "Intro to Python",
        "description": "A beginner-friendly guide to learning Python programming from scratch.",
        "banner_image": "/banner1.png",
        "category": "Tech & Coding",
        "difficulty": "Easy",
        "chapters": [
          {
            "chapterName": "Getting Started",
            "content": [
              {
                "topic": "Creating Variables",
                "explain": "Variables are used to store data in Python. You can create one by assigning a value to a name using the '=' operator.",
                "code": "x = 10",
                "example": "This code creates a variable 'x' and assigns it the value 10."
              }
            ]
          }
        ],
        "quiz": [
          {
            "question": "What is the correct way to create a variable in Python?",
            "options": ["var x = 10", "x = 10", "int x = 10", "create x = 10"],
            "correctAns": "x = 10"
          }
        ],
        "flashcards": [
          {
            "front": "Python Variable Declaration",
            "back": "Use '=' to assign a value: x = 10"
          }
        ],
        "qa": [
          {
            "question": "How do you declare a variable in Python?",
            "answer": "By assigning a value with '='. For example: x = 10"
          }
        ]
      }
    ]
  }
  `
  
}



