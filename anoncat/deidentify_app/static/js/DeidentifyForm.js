import React, { Component } from 'react';
import { createRoot } from 'react-dom/client';
import cogstackLogo from '../media/cogstack_logo.jpg';

class DeidentifyForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputText: '',
      redact: false,
      outputText: ''
    };
  }

  handleSubmit(event) {
    event.preventDefault();

    // Get the form input values from the component state
    const { inputText, redact } = this.state;

    // Make an AJAX request to the backend API
    fetch('/api/deidentify/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        input_text: inputText,
        redact: redact
      })
    })
      .then(response => response.json())
      .then(data => {
        // Update the state with the processed output
        this.setState({ outputText: data.output_text });
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  render() {
    const { inputText, redact, outputText } = this.state;
    
    return (
      <div>

        <form onSubmit={event => this.handleSubmit(event)}>
          <div className="form-grid">
            <div className="form-item document-container">
              <textarea
                rows={4}
                value={inputText}
                onChange={event => this.setState({ inputText: event.target.value })}
              />
            </div>
            <div className="form-item center-column">
              <button type="submit">Deidentify</button>
              <div className="redact-checkbox">
                <label>
                  <input
                    type="checkbox"
                    checked={redact}
                    onChange={event => this.setState({ redact: event.target.checked })}
                  />
                </label>
              </div>
            </div>
            <div className="form-item document-container">
              {outputText && <p className="output-text">{outputText}</p>}
              {!outputText && <p className="output-text">No output available.</p>}
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const rootElement = document.getElementById('root');
createRoot(rootElement).render(<DeidentifyForm />);
