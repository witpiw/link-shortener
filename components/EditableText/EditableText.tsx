import { useState } from "react"
import styles from "./EditableText.module.css"

function EditableText(props: IProps) {
    const [text, setText] = useState(props.initialValue)

    function handleBlur() {
        !text ? setText(props.initialValue) : null
    }

    return <input size={text.length} className={styles["editable-text"]} onBlur={handleBlur} value={text} onInput={(e) => setText((e.target as HTMLInputElement).value)}></input>
}

interface IProps {
    initialValue: string
}

export {EditableText}