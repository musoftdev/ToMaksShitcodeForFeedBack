export function submitAnswer(answer: string) {

    const correctAnswer = "mem"

    return new Promise<string>((resolve, reject) => {
        setTimeout(() => {
            if (correctAnswer === answer.toLowerCase()) {
                resolve("")
            } else {
                reject(new Error("It's a wrong answer")); 
            }
        }, 1500)
    })
}