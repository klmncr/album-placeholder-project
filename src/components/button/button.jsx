import './button.css'

export default function Button({ handle, className, label }) {

    return (
        <button className={className} onClick={handle}><span>{label}</span></button>
    )
}