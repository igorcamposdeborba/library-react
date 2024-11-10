interface ButtonProps {
    className?: string
    children: any;
    onClick: () => void;
}
export default function Button(props){

    return (
        <button onClick={props.onClick} className={`bg-emerald-600 text-white px-3 py-2 rounded-md ${props.className}` }>
            {props.children}
        </button>
    )
}