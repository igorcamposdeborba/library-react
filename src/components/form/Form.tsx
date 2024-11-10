import { useState } from "react";
import Book from "../../domain/Book";

import { Box, Button, TextField } from "@mui/material";

interface FormProps {
    book: Book;
    canceled?: () => void;
    changeBook?: (book: Book) => void;
}
export default function Form(props: FormProps){

    // Desestructuring para armazenar numa variável cada item E alterar o estado via UseState
    const [title, setTitle] = useState(props.book?.title ?? "");
    const [author, setAuthor] = useState(props.book?.author ?? "");  
    const id = props.book?.id; // armazenar id se existir ou null
    const [titleError, setTitleError] = useState(false);
    const [authorError, setAuthorError] = useState(false);

    const handleSave = () => {
        // Validação
        if (!title) {
            setTitleError(true);
        } else {
            setTitleError(false);
        }

        if (!author) {
            setAuthorError(true);
        } else {
            setAuthorError(false);
        }

        // Se não houver erros, chama a função de salvar
        if (title && author) {
            props.changeBook?.(new Book(title, author, id));
        }
    };

    return (  // Mostrar input se id existir
        <Box>
            {id && (
                <TextField label="Id" value={id} fullWidth margin="normal" variant="outlined" disabled/>
            )}

            <TextField label="Título" type="text" value={title} onChange={(e) => setTitle(e.target.value)}
                fullWidth margin="normal" variant="outlined" required 
                error={titleError} helperText={titleError ? "O título é obrigatório" : ""}/>

            <TextField label="Autor" type="text" value={author} onChange={(e) => setAuthor(e.target.value)}
                fullWidth margin="normal" variant="outlined" required
                error={authorError} helperText={authorError ? "O autor é obrigatório" : ""}/>

            <Box display="flex" justifyContent="flex-end" mt={2}>
                <Button variant="contained" sx={{ backgroundColor: '#9E9E9E', color: 'white', marginRight: 2 }} 
                        onClick={props.canceled}>
                    Cancelar
                </Button>
                
                <Button variant="contained" sx={{ backgroundColor: '#4299e1', color: 'white' }} 
                        disabled={!title || !author} // Desabilita o botão caso título ou autor não sejam preenchidos
                        onClick={handleSave}>
                    {id ? "Editar" : "Salvar"}
                </Button>
            </Box>
        </Box>
    )
}