import db from "../config/Database";
import FormInputs from "../models/FormInputs";

class InventoryRepository {

    private sqlUpdateInventory = (bookTitle: string): string => {
        const sqlUpdateInventory = 
        `UPDATE inventory INNER JOIN book ON inventory.bookTitle=book.bookTitle 
        SET inventory.book_id=book.id 
        WHERE book.bookTitle='${bookTitle}';`
        return sqlUpdateInventory
    }

    private sqlUpdateBook = (bookTitle: string, id: number): string => {
        const sqlUpdateBook = 
        `UPDATE book INNER JOIN inventory ON book.bookTitle=inventory.bookTitle 
        SET book.user_id=${id} 
        WHERE inventory.bookTitle='${bookTitle}';`
        return sqlUpdateBook
    }

    public addBook = (input: FormInputs, callback: Function) => {
        const { id, bookTitle }: FormInputs = input
        const sqlAdd = 
        `INSERT INTO inventory (user_id, bookTitle) 
        VALUES ('${id}', '${bookTitle}');`
            db.query(sqlAdd, (error) => {
                if (error) {
                    return callback("fail")
                } 
                return callback("success")
            })
            db.query(this.sqlUpdateInventory(bookTitle))
            db.query(this.sqlUpdateBook(bookTitle, id))
    }

    private sqlUpdateBookNull = (bookTitle: string): string => {
        const sqlUpdateBookNull = 
        `UPDATE book INNER JOIN inventory ON book.bookTitle=inventory.bookTitle 
        SET book.user_id=NULL 
        WHERE inventory.bookTitle='${bookTitle}';`
        return sqlUpdateBookNull
    }

    public checkAvailability = (input: FormInputs, callback: Function) => {
        const { bookTitle }: FormInputs = input
        const sqlQuery = `SELECT book.bookTitle, book.isAvailable
        FROM book INNER JOIN inventory
        ON inventory.user_id=book.user_id
        WHERE isAvailable=0 AND book.bookTitle='${bookTitle}';`

        db.query(sqlQuery, (error, result) => {
            const res = JSON.stringify(result)
            return callback(res)
        })
    }

    public removeBook = (input: FormInputs, callback: Function) => {
        const { bookTitle }: FormInputs = input
        const sqlRemove = 
        `DELETE FROM inventory 
        WHERE bookTitle='${bookTitle}';`
        try {
            db.query(this.sqlUpdateBookNull(bookTitle))
            db.query(sqlRemove, (error, result) => {
                const res = JSON.stringify(result)
                return callback(res)
            })
        } catch (error) {
            throw error
        }
    }

    public fetchInventory = (input: FormInputs, callback: Function) => {
        const { id }: FormInputs = input
        const sqlQuery = 
        `SELECT book.id, book.bookTitle, book.authorName FROM book 
        INNER JOIN inventory ON book.bookTitle=inventory.bookTitle 
        WHERE inventory.user_id='${id}';`
        try {
            db.query(sqlQuery, (error, result) => {
                const res: string = JSON.stringify(result)
                return callback(res)
            })
        } catch (error) {
            throw error;
        }
    }
}

export const inventoryRepo = new InventoryRepository()