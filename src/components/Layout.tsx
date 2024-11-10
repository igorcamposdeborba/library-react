import Title from "./Title";

interface LayoutProps { // contrato
    title: string,
    children: any
}

// props e children: passa dados entre componentes
export default function Layout (props: LayoutProps){
    return (
        <div className={`flex flex-col w-2/3
                        bg-white rounded-md`}>
            <Title>{props.title}</Title>

            <div className="p-4">
                {props.children}
            </div>
        </div>

    )
}