# MCQ Exam Input Format Guide

This document explains how to create MCQ exams by pasting HTML/JavaScript code or using the command format.

## Method 1: HTML Code Import

Paste HTML code containing a questions array like this:

```javascript
const questions = [
  {
    q: "বাংলাদেশের দীর্ঘতম নদী কোনটি?",
    opts: ["ক) পদ্মা", "খ) মেঘনা", "গ) যমুনা", "ঘ) ব্রহ্মপুত্র"],
    ans: 3,
  },
  { q: "2 + 2 = ?", opts: ["ক) 3", "খ) 4", "গ) 5", "ঘ) 6"], ans: 1 },
];
```

### Format Rules:

- `q`: Question text (string)
- `opts`: Array of 4 options (strings, can include Bengali option labels like "ক)")
- `ans`: Index of correct answer (0 = first option, 1 = second, 2 = third, 3 = fourth)

---

## Method 2: Simple Text Format (Demo Type)

You can also create exams using this simplified text format. Copy and paste this template:

```
EXAM_TITLE: প্রিলিমিনারি টেস্ট ২০২৬
EXAM_SUBTITLE: বাংলা ভার্সন — SET 03
DURATION: ২ ঘণ্টা
CORRECT_MARK: 1
WRONG_MARK: 0.5
PUBLIC: true

---QUESTIONS---

Q: বাংলাদেশের দীর্ঘতম নদী কোনটি?
A: পদ্মা
B: মেঘনা
C: যমুনা
D: ব্রহ্মপুত্র
ANS: D

Q: 2, 3, 4 এবং 7 সংখ্যাগুলির গড় বিচ্যুতি কত?
A: 0
B: 2
C: 3/2
D: 4
ANS: B

Q: 'Helena said I took the laptop home with me.' Its indirect form is:
A: Helena said that she took the laptop home with her
B: Helena said that she had taken the laptop home with her
C: Helena confirmed that she has taken the laptop home with her
D: Helena told that she had the laptop taken home with her
ANS: B

Q: একটি ত্রিভুজের তিনটি কোণের পরিমাণ X, X/2 ও 3X/2। ক্ষুদ্রতম কোণের মান রেডিয়ানে কত হবে?
A: π/6
B: π/3
C: π/2
D: 2π/3
ANS: A

Q: কোন সংস্থা বাংলাদেশের GDP হিসাব করে?
A: বাংলাদেশ পরিসংখ্যান ব্যুরো
B: বাংলাদেশ ব্যাংক
C: অর্থ বিভাগ
D: বাংলাদেশ পরিকল্পনা কমিশন
ANS: A
```

### Format Rules:

1. **Header Section** (before `---QUESTIONS---`):
   - `EXAM_TITLE`: Required - The exam title
   - `EXAM_SUBTITLE`: Optional - Subtitle/description
   - `DURATION`: Time duration (e.g., "২ ঘণ্টা", "2 hours", "90 minutes")
   - `CORRECT_MARK`: Points for correct answer (default: 1)
   - `WRONG_MARK`: Points deducted for wrong answer (default: 0.5)
   - `PUBLIC`: true/false - Whether exam is publicly visible

2. **Questions Section** (after `---QUESTIONS---`):
   - `Q:` Question text
   - `A:` Option 1 (ক)
   - `B:` Option 2 (খ)
   - `C:` Option 3 (গ)
   - `D:` Option 4 (ঘ)
   - `ANS:` Correct answer (A, B, C, or D)

3. **Important Notes**:
   - Each question block must have Q, A, B, C, D, and ANS
   - Leave a blank line between questions
   - ANS must be A, B, C, or D (case insensitive)
   - Multi-line questions are NOT supported in this format

---

## Method 3: JSON Format

For advanced users, you can directly create a JSON file in `/data/exams/`:

```json
{
  "slug": "2026-02-26-my-exam",
  "title": "My Exam Title",
  "subtitle": "Optional Subtitle",
  "duration": "2 hours",
  "totalMarks": 100,
  "correctMark": 1,
  "wrongMark": 0.5,
  "public": true,
  "createdAt": "2026-02-26T00:00:00.000Z",
  "questions": [
    {
      "q": "Question text here?",
      "opts": ["Option A", "Option B", "Option C", "Option D"],
      "ans": 0
    }
  ]
}
```

---

## Marking System

- **Correct Mark**: Points awarded for each correct answer
- **Wrong Mark**: Points deducted for each wrong answer (negative marking)
- **Skipped**: No points (neither added nor deducted)

**Score Calculation:**

```
Final Score = (Correct × CORRECT_MARK) - (Wrong × WRONG_MARK)
```

Example with 100 questions, +1 correct, -0.5 wrong:

- 80 correct, 15 wrong, 5 skipped
- Score = (80 × 1) - (15 × 0.5) = 80 - 7.5 = **72.5**

---

## Tips

1. Use the "Import from HTML" tab for mass importing questions
2. Use the "Simple Text Format" for quick manual entry
3. Always verify the correct answer index (ANS) is accurate
4. Bengali Unicode characters are fully supported
5. Results are automatically saved (last 2 submissions per exam)
