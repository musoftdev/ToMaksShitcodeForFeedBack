import { useState } from "react"
import "./SelectInput.css"

interface SelectorProps {
    selectedItem: string,
    setSelectedItem: (val: string) => void
}

export const SelectInput = ({selectedItem, setSelectedItem} : SelectorProps) => {

    let items = ["First", "Second", "Third"]

    const [showList, setShowList] = useState(false)
   
    const onItemClick = (item: string) => (e: React.MouseEvent<HTMLElement>) => {
        setSelectedItem(item)
        setShowList(false)
    }

    const listItems = items.map((item) => 
        <li key = {item} onClick = {onItemClick(item)}>{item}</li>
    )

    return (
        <div>
            <p>Test input</p>
            <input 
                value = {selectedItem}
                onClick = {() => setShowList(!showList)}
                placeholder = "Make your choice"
                readOnly
            />
            <div className = "inputItems">
                {showList && <ul>{listItems}</ul>}
            </div>
        </div>
    )
}
