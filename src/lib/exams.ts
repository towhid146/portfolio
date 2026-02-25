import fs from "fs";
import path from "path";

const examsPath = path.join(process.cwd(), "data", "exams");
const resultsPath = path.join(process.cwd(), "data", "results");

export type Question = {
  q: string;
  opts: string[];
  ans: number;
};

export type ExamMeta = {
  title: string;
  subtitle?: string;
  duration: string;
  totalMarks: number;
  correctMark: number;
  wrongMark: number;
  public: boolean;
  createdAt: string;
};

export type Exam = ExamMeta & {
  slug: string;
  questions: Question[];
};

export type ExamResult = {
  examSlug: string;
  submittedAt: string;
  totalQuestions: number;
  answered: number;
  correct: number;
  wrong: number;
  skipped: number;
  score: number;
  maxScore: number;
  userAnswers: (number | null)[];
  userId?: string;
};

// Ensure directories exist
function ensureDirectories() {
  if (!fs.existsSync(examsPath)) {
    fs.mkdirSync(examsPath, { recursive: true });
  }
  if (!fs.existsSync(resultsPath)) {
    fs.mkdirSync(resultsPath, { recursive: true });
  }
}

export async function getExamSlugs(): Promise<string[]> {
  ensureDirectories();
  const files = fs.readdirSync(examsPath).filter((f) => f.endsWith(".json"));
  return files.map((f) => f.replace(/\.json$/, ""));
}

export async function getExamBySlug(slug: string): Promise<Exam | null> {
  ensureDirectories();
  const fullPath = path.join(examsPath, `${slug}.json`);
  if (!fs.existsSync(fullPath)) {
    return null;
  }
  const raw = fs.readFileSync(fullPath, "utf-8");
  const data = JSON.parse(raw) as Exam;
  return { ...data, slug };
}

export async function getAllExams(): Promise<Exam[]> {
  ensureDirectories();
  const slugs = await getExamSlugs();
  const exams: Exam[] = [];

  for (const slug of slugs) {
    const exam = await getExamBySlug(slug);
    if (exam) {
      exams.push(exam);
    }
  }

  // Sort by creation date descending
  return exams.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
}

export async function getPublicExams(): Promise<Exam[]> {
  const exams = await getAllExams();
  return exams.filter((e) => e.public);
}

export async function createExam(
  exam: Omit<Exam, "slug" | "createdAt">,
): Promise<string> {
  ensureDirectories();
  const date = new Date().toISOString().split("T")[0];
  const slug = `${date}-${exam.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")}`;

  const fullExam: Exam = {
    ...exam,
    slug,
    createdAt: new Date().toISOString(),
  };

  fs.writeFileSync(
    path.join(examsPath, `${slug}.json`),
    JSON.stringify(fullExam, null, 2),
  );

  return slug;
}

export async function updateExam(
  slug: string,
  updates: Partial<Exam>,
): Promise<boolean> {
  ensureDirectories();
  const exam = await getExamBySlug(slug);
  if (!exam) return false;

  const updatedExam = { ...exam, ...updates, slug };
  fs.writeFileSync(
    path.join(examsPath, `${slug}.json`),
    JSON.stringify(updatedExam, null, 2),
  );

  return true;
}

export async function deleteExam(slug: string): Promise<boolean> {
  ensureDirectories();
  const fullPath = path.join(examsPath, `${slug}.json`);
  if (!fs.existsSync(fullPath)) return false;

  fs.unlinkSync(fullPath);

  // Also delete results for this exam
  const resultsFile = path.join(resultsPath, `${slug}.json`);
  if (fs.existsSync(resultsFile)) {
    fs.unlinkSync(resultsFile);
  }

  return true;
}

// Results management - keeps only last 2 submissions per exam
export async function getExamResults(slug: string): Promise<ExamResult[]> {
  ensureDirectories();
  const resultsFile = path.join(resultsPath, `${slug}.json`);
  if (!fs.existsSync(resultsFile)) {
    return [];
  }
  const raw = fs.readFileSync(resultsFile, "utf-8");
  return JSON.parse(raw) as ExamResult[];
}

export async function saveExamResult(result: ExamResult): Promise<void> {
  ensureDirectories();
  const resultsFile = path.join(resultsPath, `${result.examSlug}.json`);

  let results: ExamResult[] = [];
  if (fs.existsSync(resultsFile)) {
    const raw = fs.readFileSync(resultsFile, "utf-8");
    results = JSON.parse(raw) as ExamResult[];
  }

  // Add new result
  results.unshift(result);

  // Keep only last 2 submissions
  results = results.slice(0, 2);

  fs.writeFileSync(resultsFile, JSON.stringify(results, null, 2));
}

export async function getAllResults(): Promise<Record<string, ExamResult[]>> {
  ensureDirectories();
  const files = fs.readdirSync(resultsPath).filter((f) => f.endsWith(".json"));
  const allResults: Record<string, ExamResult[]> = {};

  for (const file of files) {
    const slug = file.replace(/\.json$/, "");
    const raw = fs.readFileSync(path.join(resultsPath, file), "utf-8");
    allResults[slug] = JSON.parse(raw) as ExamResult[];
  }

  return allResults;
}
