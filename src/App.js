import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './util.css';
import { FormGroup, FormControl, InputGroup } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
import Gallery from './components/Gallery.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      items: [],
      error: null, // Add error state
    };
  }

  search() {
    const API_URL = 'https://www.googleapis.com/books/v1/volumes?q=';
    fetch(`${API_URL}${this.state.query}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((json) => {
        let { items } = json;
        this.setState({ items, error: null }); // Clear errors on success
      })
      .catch((error) => {
        this.setState({ error: 'Failed to fetch data. Please try again.' }); // Handle errors
      });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Book Finder</h1>
        </header>
        <div className="container main-content">
          <FormGroup>
            <InputGroup>
              <FormControl
                type="text"
                placeholder="Search for a book"
                onChange={(event) => this.setState({ query: event.target.value })}
                onKeyPress={(event) => {
                  if ('Enter' === event.key) {
                    this.search();
                  }
                }}
              />
              <InputGroup.Text onClick={() => this.search()} style={{ cursor: 'pointer' }}>
                <FaSearch />
              </InputGroup.Text>
            </InputGroup>
          </FormGroup>
          {this.state.error && <div className="error">{this.state.error}</div>}
          <Gallery items={this.state.items} />
        </div>
      </div>
    );
  }
}

export default App;