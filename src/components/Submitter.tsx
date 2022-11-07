import React, { useState } from "react"
import { submitAnswer } from "../utilities/ans-submit"

type inputStatus = "success" | "typing" | "loading"


const Submitter = () => {

    const [status, setStatus] = useState<inputStatus>("typing")
    const [answer, setAnswer] = useState("")
    const [error, setError] = useState("")

    if (status === "success") {
        return <h1>You're right!</h1>
    }

    const onFormSubmit = () => async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setStatus("loading")

        submitAnswer(answer)
            .then((result) => {
                setStatus("success")
                console.log(result)
            })
            .catch((error: Error) => {
                setError(error.message)
                setStatus("typing")
            })
        
    }

    const answerChangeHandler = () => (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setAnswer(event.target.value)
        
    }

    return (
        <>
            <h1>State study</h1>
            <form
                onSubmit={onFormSubmit()}
            >
                <textarea 
                    style = {{display: "block", marginBottom: "1rem"}}
                    value = {answer}
                    onChange = {answerChangeHandler()}
                    disabled = {status === "loading"}
                />
                <button
                    disabled = {answer.length === 0 || status === "loading"}
                >
                    Submit
                </button>
            </form>
            {error && <p>{error}</p>}
        </>
    )
}

export default Submitter