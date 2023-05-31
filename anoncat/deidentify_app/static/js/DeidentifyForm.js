import React, { Component } from 'react';
import { createRoot } from 'react-dom/client';

class DeidentifyForm extends Component {
  state = {
    inputText: '',
    redact: false,
    outputText: ''
  };

  handleSubmit = async (event) => {
    event.preventDefault();

    const { inputText, redact } = this.state;
    const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]').value;

    const formData = new FormData();
    formData.append('input_text', inputText);
    formData.append('redact', redact);
    formData.append('csrfmiddlewaretoken', csrfToken);

    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          'X-CSRFToken': csrfToken,
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
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className="form-grid">
            <div className="form-item document-container">
              <textarea
                rows={29}
                name="inputText"
                value={inputText}
                onChange={this.handleChange}
                style={{ width: '100%', resize: 'none' }}
                placeholder="Enter text here"
              />
            </div>
            <div className="form-item center-column">
              <button type="submit">Deidentify</button>
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
            <div className="form-item document-container">
              {outputText ? (
                <p className="output-text">{outputText}</p>
              ) : (
                <p className="output-text">Deidentification Demo7</p>
              )}
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const rootElement = document.getElementById('root');
createRoot(rootElement).render(<DeidentifyForm />);
