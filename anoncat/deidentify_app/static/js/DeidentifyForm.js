import React, { Component } from 'react';
import { createRoot } from 'react-dom/client';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import deidCat from '../media/deidcat.png';
import {Checkbox} from "@mui/material"

// Create a custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#2196f3', // Replace with your desired blue color
    },
  },
});

const exampleText = `
Patient Information:

Name: John Parkinson
Date of Birth: February 12, 1958
Gender: Male
Address: 789 Wellness Lane, Healthville, HV 56789
Phone: (555) 555-1234
Email: john.parkinson@email.com
Emergency Contact:

Name: Mary Parkinson
Relationship: Spouse
Phone: (555) 555-5678
Insurance Information:

Insurance Provider: HealthWell Assurance
Policy Number: HW765432109
Group Number: G876543
Medical History:

Allergies:

None reported
Medications:

Levodopa/Carbidopa for Parkinson's disease symptoms
Pramipexole for restless legs syndrome
Lisinopril for hypertension
Atorvastatin for hyperlipidemia
Metformin for Type 2 Diabetes
Medical Conditions:

Parkinson's Disease (diagnosed on June 20, 2015)
Hypertension
Hyperlipidemia
Type 2 Diabetes
Osteoarthritis
Vital Signs:

Blood Pressure: 130/80 mmHg
Heart Rate: 72 bpm
Temperature: 98.4°F
Respiratory Rate: 18 breaths per minute
Recent Inpatient Stay (Dates: September 1-10, 2023):

Reason for Admission: Acute exacerbation of Parkinson's symptoms, pneumonia, and uncontrolled diabetes.

Interventions:

Neurology Consultation for Parkinson's disease management adjustments.
Antibiotic therapy for pneumonia.
Continuous glucose monitoring and insulin therapy for diabetes control.
Physical therapy sessions to maintain mobility.
Complications:

Delirium managed with close monitoring and appropriate interventions.
Discharge Plan:

Medication adjustments for Parkinson's disease.
Follow-up appointments with neurologist, endocrinologist, and primary care.
Home health care for continued physical therapy.
Follow-up Visits:

Date: October 15, 2023

Reason for Visit: Post-discharge Follow-up
Notes: Stable Parkinson's symptoms, pneumonia resolved. Adjusted diabetes medications for better control.
Date: December 5, 2023

Reason for Visit: Neurology Follow-up
Notes: Fine-tuned Parkinson's medication regimen. Recommended ongoing physical therapy.
`


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
  setExampleText = (_) => {
    this.setState({inputText: exampleText})
  }

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
                      <Checkbox
                          name="redact"
                          checked={redact}
                          onChange={this.handleChange}
                      />
                    </label>
                  </div>
                  <div>
                    <Button color="secondary" variant="contained" onClick={this.setExampleText}>Use Example Text</Button>
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
