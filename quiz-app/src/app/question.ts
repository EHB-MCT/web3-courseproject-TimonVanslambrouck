export interface IQuestion {
    id: number,
    question: string,
    description: string,
    answers: object,
    correct_answers: object,
    categorie: string,
    difficulty: string
}