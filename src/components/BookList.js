import React, { useState, useEffect } from 'react';
import './BookList.css'; // Import your CSS file

function BookList() {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetch('https://freetestapi.com/api/v1/books');
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                setBooks(data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="book-list">
            <h1>Books</h1>
            <div className="book-container">
                {books.map(book => (
                    <div className="book-item" key={book.id}>
                        <img className='book-itemimg' src={book.cover_image} alt={book.name} />
                        <div className="book-details">
                            <h2 className="book-title">{book.title}</h2>
                            <p className="book-description">{book.description}</p>
                            <p className="book-price">Price: ₹999/-</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default BookList;
