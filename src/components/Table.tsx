import Book from "../domain/Book"
import { IconEdit, IconTrash } from "../utils/Icon";
import React, { useEffect, useState } from "react"; // Adicione o import para useEffect e useState

// contrato
interface TableBookProps {
    books : Book[];
    selectedBook?: (book: Book) => void;
    deletedBook?: (book: Book) => void;
}

// Hook Props: propriedade estática que não pode alterar valor (readOnly)
export default function Table(props: TableBookProps) {
    const [showActions, setShowActions] = useState<boolean>(false);

    // Atualiza o estado showActions quando selectedBook ou deletedBook mudam
    useEffect(() => {
        setShowActions(!!props.selectedBook || !!props.deletedBook);
    }, [props.selectedBook, props.deletedBook]);

    function renderTableHeader() {
        return (
            <tr>
                <th className="text-left p-4">Id</th>
                <th className="text-left p-4">Título</th>
                <th className="text-left p-4">Autor</th>
                {showActions && <th className="text-center p-4">Ações</th>}
            </tr>
        );
    }

    function renderTableData() {
        return (
            props.books.map((book, i) => {
                return (
                    <tr key={book.id} className={`${i % 2 === 0 ? 'bg-slate-100' : 'bg-white'}`}>
                        <td className="text-left p-4">{book.id}</td>
                        <td className="text-left p-4">{book.title}</td>
                        <td className="text-left p-4">{book.author}</td>
                        {showActions && renderActions(book)}
                    </tr>
                );
            })
        );
    }

    function renderActions(book: Book){

        return (// if ternário para mostrar ou ocultar botões de editar ou exluir
            <td className="flex justify-center"> 
                {props.selectedBook ? (
                    <button onClick={() => props.selectedBook?.(book)} // Evento: objeto book sendo passado por parâmetro
                            className={`flex justify-center items-center p-2 m-1
                                     text-green-700 rounded-full hover:bg-green-200`}>{IconEdit}</button> //bidding para inserir o ícone svg
                                      ): false}

                {props.deletedBook ? (
                <button onClick={() => props.deletedBook?.(book)}
                            className={`flex justify-center items-center p-2 m-1
                                  text-red-700 rounded-full hover:bg-red-100`}>{IconTrash}</button>
                                    ): false}
            </td>
        )
    }

    return (
        <table className="w-full rounded-xl overflow-hidden">
            <thead className="bg-gradient-to-r from-blue-300 to-blue-500 text-white">
                {renderTableHeader()}
            </thead>
            <tbody>
                {renderTableData()}
            </tbody>
        </table>
    );
}