export default class Book {
    #id: string
    #title: string
    #author: string

    constructor(title: string, author: string, id: string = null){
        this.#title = title;
        this.#author = author;
        this.#id = id;
    }

    static empty(){
        return new Book("", "");
    }


    get id() {
        return this.#id;
    }

    get title(){
        return this.#title;
    }

    get author(){
        return this.#author;
    }
}