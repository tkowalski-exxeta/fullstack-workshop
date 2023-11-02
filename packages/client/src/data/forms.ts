export type FormOverview = Omit<FormDetails, "questions">

export interface FormDetails {
  _id: string
  title: string
  questions: Question[]
}

export type Question = SelectQuestion | TextQuestion

type SelectQuestion = {
  _id: string
  type: "select"
  question: string
  multiSelect: boolean
  options: string[]
}

type TextQuestion = {
  _id: string
  type: "text"
  question: string
}

const form1: FormDetails = {
  _id: "65440a0235331789ab36d1af",
  title: "form #1",
  questions: [
    {
      _id: "65440a0235331789ab36d1b0",
      type: "select",
      question: "What is your favorite number?",
      options: ["0", "1", "42", "256"],
      multiSelect: false,
    },
    {
      _id: "65440a0235331789ab36d1b1",
      type: "text",
      question: "Why do you like it best?",
    },
  ],
}
const form2: FormDetails = {
  _id: "654415246022b91ca7abcef4",
  title: "form #2",
  questions: [
    {
      _id: "654415286022b91ca7abcef5",
      type: "select",
      question: "What is your programming language?",
      options: ["java", "c#", "python", "javascript", "typescript"],
      multiSelect: false,
    },
    {
      _id: "6544152b6022b91ca7abcef6",
      type: "text",
      question: "Why do you like it best?",
    },
  ],
}

export const formService = {
  getAllForms: async () => {
    await delay(800)
    return [form1, form2].map(toFormOverview)
  },
  getFormById: async (id: string) => {
    await delay(500)
    if (id === form1._id) return { formById: form1 }
    if (id === form2._id) return { formById: form1 }
    return null
  },
}

function toFormOverview(f: FormDetailResponse): FormOverview {
  return {
    _id: f._id,
    title: f.title,
  }
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
