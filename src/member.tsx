import { useState, useRef } from "react"
import { flushSync } from "react-dom"
import "./App.css"

const cats = [
    {
        id: 0,
        imageUrl: 'https://placekitten.com/250/200?image=0'
    },
    {
        id: 1,
        imageUrl: 'https://placekitten.com/250/200?image=1'
    },
    {
        id: 2,
        imageUrl: 'https://placekitten.com/250/200?image=2'
    }
]


export const App = () => {

    const [index, setIndex] = useState(0)
    const imageRef = useRef<HTMLLIElement>(null)

    console.log(`currImage = ${imageRef.current?.innerHTML}`)


    const handleNextClick = () => {

        flushSync(() => {
            setIndex((index + 1) % cats.length)
            console.log("Flush here")
        })

        imageRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
            inline: "center"
        })
           
    }
    


    return (
        <div>
            <button onClick={handleNextClick}>Next</button>
            <ul>
                {cats.map((cat, i) => (
                    <li ref = {i === index ? imageRef : undefined}
                        key={cat.id}>
                        <img
                            src={cat.imageUrl}
                            className={i === index ? "active" : ""}
                            alt="" />
                    </li>
                ))}
            </ul>
        </div>
    )
}
