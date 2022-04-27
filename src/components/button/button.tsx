import { FC } from 'react'
import './button.css'

interface ButtonProps {
    className: string;
    label: string;
    handle: () => void;
}

const Button: FC<ButtonProps> = ({ className, label, handle }) => {

    return <button className={className} onClick={handle}><span>{label}</span></button>
}

export default Button;