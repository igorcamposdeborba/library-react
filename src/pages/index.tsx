import Layout from '../components/Layout'
import Table from '../components/Table'
import Book from '../domain/Book'
import Button from '../components/ButtonCustom'
import Form from '../components/form/Form'
import { useState } from 'react'
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import BibleApi from '../components/api/BibleApi'

export default function Home() {

  const [books, setBooks] = useState<Book[]>([
    new Book("Harry Potter: a ordem da Fênix", "J. K. Rowling", "1"),
    new Book("Java: como programar", "Deitel Brothers", "2"),
    new Book("Mobi Dick", "Herman Melville", "3"),
  ]);

  const [visible, setVisible] = useState<"table" | "form">("table");
  const [book, setBook] = useState<Book>(Book.empty());

  const [error, setError] = useState<string | null>(null); // Validação: estado para mensagens de erro
  const [openSnackbar, setOpenSnackbar] = useState(false);  // Validação: controle do Snackbar

  function selectedBook(book: Book){
    console.log(book);
    setBook(book); // Guardar livro selecionado no botão de editar/excluir 
    setVisible("form"); // Mostrar formulário
  } 

  function deletedBook(book: Book){
    try {
    setBooks(books.filter(b => b.id !== book.id));
    } catch (err) {
      handleError("Falha ao deletar o livro.");
    }
  } 

  function saveBook(updatedBook : Book){
    try {
      const isValidBook : boolean = validBook(updatedBook);

      if (updatedBook.id) {
        // Editar livro existente
        setBooks(books.map(b => (b.id === updatedBook.id ? updatedBook : b)));
      
      } else if (isValidBook) { // Adicionar novo livro
        const newBook = new Book(updatedBook.title, updatedBook.author, `${Date.now()}`); // Gera um ID temporário único
        setBooks([...books, newBook]);
      } else {
        handleError("Já existe um livro com esse título.");
      }
      setVisible("table");
    } catch (err) {
      handleError("Falha ao salvar o livro.");
    }
  }

  function newBook(){
    setBook(Book.empty()); // limpar formulário
    setVisible("form");
  } 

   // Handler de erro
  function handleError(message: string) {
    setError(message);
    setOpenSnackbar(true);
  }
  function handleCloseSnackbar(event?: React.SyntheticEvent | Event, reason?: string) {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  }

  function validBook(book : Book){ // Validar se o título já existe na lista
    const existingBook = books.find(b => b.title.toLowerCase() === book.title.toLowerCase());
    if (existingBook && !book.id) {
      return false;
    }
    return true;
  }

  return (
    <div className={`
      flex
      items-center
      justify-center
      h-screen
      rounded-md
      bg-gradient-to-r from-gray-100 to-gray-400
    `}>
      <Layout title="Biblioteca">

        {/* if ternário para mostrar tela de formulário ou de cadastro */}
        {visible === "table" ? (
          <>
            <BibleApi/> {/* API de terceiros para mostrar citação bíblica */}
            <div className="flex justify-end">
              <Button onClick={newBook} className="mb-4">Novo Livro</Button>
            </div>
            <Table books={books} selectedBook={selectedBook} deletedBook={deletedBook}></Table>
            {/* selectedBook passa a funcão por parametro (high ordem function) para passar o livro por parametro ao botão e habilitar o botão */}
          </> 
        ) : (
          <>
            <Form book={book} 
                  changeBook={saveBook}
                  canceled={() => setVisible("table")}></Form>
          </>
        )}
        
        {/* Snackbar das mensagens de erro */}
        <Snackbar open={openSnackbar} 
                  autoHideDuration={2000}
                  onClose={handleCloseSnackbar}
                  anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
        </Snackbar>
      </Layout>
    </div>
  ) 
}
