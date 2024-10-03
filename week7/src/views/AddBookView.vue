<template>
    <div class="center-container">
        <h1>Add New Book</h1>
        <form @submit.prevent="addBook">
            <div>
                <label for="isbn">ISBN: </label>
                <input type="text" v-model="isbn" id="isbn" required />
            </div>
            <div>
                <label for="name">Name: </label>
                <input type="text" v-model="name" id="name" required />
            </div>
            <button type="submit">Add Book</button>
        </form>
    </div>
</template>
<script>
import { ref } from 'vue';
export default {
    setup() {
        const isbn = ref('');
        const name = ref('');

        const addBook = async () => {
            const response = await fetch('https://us-central1-week7-haotian.cloudfunctions.net/addBook', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    isbn: isbn.value,
                    name: name.value
                }),
            });
            if (response.ok) {
                alert('Book added successfully!');
                isbn.value = '';
                name.value = '';
            } else {
                alert('Error adding book.');
            }
        };
        return {
            isbn,
            name,
            addBook
        };
    }
};
</script>
<!-- <template>
    <div class="center-container">
        <h1>Add/Update Book</h1>
        <form @submit.prevent="addOrUpdateBook">
            <div>
                <label for="isbn">ISBN: </label>
                <input type="text" v-model="isbn" id="isbn" required />
            </div>
            <div>
                <label for="name">Name: </label>
                <input type="text" v-model="name" id="name" required />
            </div>
            <button type="submit">{{ isEditing ? 'Update Book' : 'Add Book' }}</button>
        </form>

        <h2>Filter & Fetch Books</h2>
        <div>
            <label for="isbn-filter">Filter by ISBN greater than: </label>
            <input type="text" v-model="isbnFilter" id="isbn-filter" placeholder="e.g., 1000" />
        </div>
        <div>
            <label for="limit">Limit Results: </label>
            <input type="number" v-model.number="limitValue" id="limit" placeholder="Number of results" />
        </div>
        <div>
            <label for="order">Order By: </label>
            <select v-model="orderByField" id="order">
                <option value="isbn">ISBN</option>
                <option value="name">Name</option>
            </select>
        </div>
        <button @click="fetchFilteredBooks">Fetch Books</button>

        <h2>Book List</h2>
        <ul>
            <li v-for="book in books" :key="book.id">
                {{ book.name }} - ISBN: {{ book.isbn }}
                <button @click="editBook(book)">Edit</button>
                <button @click="deleteBook(book.id)">Delete</button>
            </li>
        </ul>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import db from '@/firebase/init.js';
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, query, where, orderBy, limit } from 'firebase/firestore';

export default {
    setup() {
        const books = ref([]);
        const isbn = ref('');
        const name = ref('');
        const isbnFilter = ref('1000');  
        const orderByField = ref('isbn'); 
        const limitValue = ref(10);  
        const isEditing = ref(false);
        const currentBookId = ref(null);

        const fetchBooks = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'books'));
                const booksArray = [];
                querySnapshot.forEach(doc => {
                    booksArray.push({ id: doc.id, ...doc.data() });
                });
                books.value = booksArray;
            } catch (error) {
                console.error('Error fetching books: ', error);
            }
        };

        const addOrUpdateBook = async () => {
            const isbnNumber = Number(isbn.value);
            if (isNaN(isbnNumber)) {
                alert('ISBN must be a valid number');
                return;
            }

            try {
                if (isEditing.value) {
                    const bookRef = doc(db, 'books', currentBookId.value);
                    await updateDoc(bookRef, {
                        isbn: isbnNumber,
                        name: name.value
                    });
                    alert('Book updated successfully!');
                } else {
                    await addDoc(collection(db, 'books'), {
                        isbn: isbnNumber,
                        name: name.value
                    });
                    alert('Book added successfully!');
                }

                isbn.value = '';
                name.value = '';
                isEditing.value = false;
                currentBookId.value = null;
                fetchBooks();
            } catch (error) {
                console.error('Error adding/updating book: ', error);
            }
        };

        const editBook = (book) => {
            isbn.value = book.isbn;
            name.value = book.name;
            isEditing.value = true;
            currentBookId.value = book.id;
        };

        const deleteBook = async (id) => {
            try {
                const bookRef = doc(db, 'books', id);
                await deleteDoc(bookRef);
                alert('Book deleted successfully!');
                fetchBooks();
            } catch (error) {
                console.error('Error deleting book: ', error);
            }
        };

        const fetchFilteredBooks = async () => {
            try {
                const booksCollection = collection(db, 'books');
                const queries = [];
                if (isbnFilter.value) {
                    queries.push(where('isbn', '>', Number(isbnFilter.value)));
                }
                queries.push(orderBy(orderByField.value));
                if (limitValue.value) {
                    queries.push(limit(Number(limitValue.value)));
                }
                const q = query(booksCollection, ...queries);
                const querySnapshot = await getDocs(q);
                const booksArray = [];
                querySnapshot.forEach(doc => {
                    booksArray.push({ id: doc.id, ...doc.data() });
                });
                books.value = booksArray;
            } catch (error) {
                console.error('Error fetching filtered books: ', error);
                if (error.code === 'failed-precondition') {
                    alert('You may need to create a composite index for the query.');
                }
            }
        };
        onMounted(() => {
            fetchBooks();
        });
        return {
            books,
            isbn,
            name,
            isEditing,
            currentBookId,
            isbnFilter,
            orderByField,
            limitValue,
            addOrUpdateBook,
            editBook,
            deleteBook,
            fetchFilteredBooks
        };
    }
};
</script> -->

<style scoped>
.center-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;
}

input, select {
    padding: 10px;
    width: 200px;
    margin-bottom: 10px;
}

button {
    padding: 10px 20px;
}

ul {
    list-style: none;
    padding: 0;
}

li {
    margin: 10px 0;
}

button {
    margin-left: 10px;
}
</style>
