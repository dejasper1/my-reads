import React, { Component } from "react";
import Book from "./Book";
import escapeStringRegexp from "escape-string-regexp";
import * as BooksAPI from "../BooksAPI";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

class SearchPage extends Component {
  state = {
    query: "",
    searchedBooks: []
  };

  static propTypes = {
    books: PropTypes.array.isRequired
  };

  updateQuery = query => {
    this.setState({ query: query });
    this.updateSearchedBooks(query);
  };

  updateSearchedBooks = query => {
    if (query) {
      BooksAPI.search(query).then(searched => {
        if (searched.error) {
          this.setState({ searchedBooks: [] });
        } else {
          this.setState({ searchedBooks: searched });
        }
      });
    } else {
      this.setState({ searchedBooks: [] });
    }
  };

  render() {
    const { searchedBooks } = this.state;
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.state.query}
              onChange={e => this.updateQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {searchedBooks.map(searchedBook => {
              return (
                <li key={searchedBook.id}>
                  <Book book={searchedBook} moveBook={this.props.moveBook} />
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    );
  }
}

export default SearchPage;
