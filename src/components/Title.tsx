export default function Title(props){
    return (
        <div className="flex flex-col justify-center items-center">
            <h1 className="px-4 py-2 text-3xl" >
                {props.children}
            </h1>
            <hr className="border-2 border-gray-400 w-full"></hr>
        </div>
    )
}