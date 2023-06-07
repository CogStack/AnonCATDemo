import React, { Component } from 'react';
import { createRoot } from 'react-dom/client';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import deidCat from '../media/deidcat.png';

// Create a custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#2196f3', // Replace with your desired blue color
    },
  },
});

class DeidentifyForm extends Component {
  state = {
    inputText: '',
    redact: false,
    outputText: ''
  };

  handleSubmit = async (event) => {
    event.preventDefault();

    const { inputText, redact } = this.state;

    const formData = new FormData();
    formData.append('input_text', inputText);
    formData.append('redact', redact);

    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          'X-CSRFToken': window.csrfToken,
        },
        body: formData,
      });

      const data = await response.json();
      this.setState({ outputText: data.output_text });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    const inputValue = type === 'checkbox' ? checked : value;
    this.setState({ [name]: inputValue });  
  };

  render() {
    const { inputText, redact, outputText } = this.state;

    return (
      <ThemeProvider theme={theme}>
        <div>
          <form onSubmit={this.handleSubmit}>
            <div className="form-grid">
              <div className="form-item document-container">
                <textarea
                  rows={40}
                  name="inputText"
                  value={inputText}
                  onChange={this.handleChange}
                  className="input-text"
                  style={{resize: 'none', }}
                  placeholder="Enter text here"
                />
              </div>
              <div className="form-item center-column">
                <div className="logo-container">
                  <img src={deidCat} alt="DeIDCAT logo" className="image-size" />
                </div>
                <div className="button-container">
                  <Button variant="contained" color="primary" type="submit">
                    Deidentify
                  </Button>
                </div>
                <div className="redact-checkbox">
                  <label>
                    Redact
                    <span style={{ marginLeft: '9px' }}></span>
                    <input
                      type="checkbox"
                      name="redact"
                      checked={redact}
                      onChange={this.handleChange}
                    />
                  </label>
                </div>
              </div>
              <div className="form-item document-container output-text">
                <div className="output-text-container">
                  {outputText ? (
                  <p> {outputText}</p>
                  ) : (
                  <p className="output-text-default">Deidentification Demo</p>
                  )}
                </div>
              </div>
            </div>
          </form>
        </div>
      </ThemeProvider>
    );
  }
}

const rootElement = document.getElementById('root');
createRoot(rootElement).render(<DeidentifyForm />);
