interface InputProps {
    type?: "text" | "number";
    label: string;
    value: any;
    readOnly?: boolean;
    changeValue?: (value: any) => void; // armazenar valor alterado em value para se comunicar com onChange
}
export default function Input(props: InputProps){
    return (
        <div className="flex flex-col">
            <label className="mb-1 ml-1">
                {props.label}
            </label>
            <input type={props.type ?? 'text'}
                   value={props.value}
                   readOnly={props.readOnly}
                   onChange={e => props.changeValue?.(e.target.value)} // onChange altera estado do valor
                   className="border border-gray-300 rounded-lg bg-gray-100 px-4 py-2 mb-4"/>
        </div>
    )
}