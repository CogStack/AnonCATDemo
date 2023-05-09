# Deidentify app

The Deidentify app is a tool for redacting and replacing sensitive information in a document. It uses [MedCAT](https://github.com/CogStack/MedCAT), an advanced natural language processing tool, to identify and classify sensitive information, such as names, addresses, and medical terms.

## Features
Redact sensitive information: The Deidentify app can automatically redact sensitive information from a document, replacing it with a placeholder value, such as "REDACTED".
Replace sensitive information: Alternatively, the app can replace sensitive information with a different value, such as a random name or address, to maintain the structure and context of the original document.
Customizable rules: The app allows users to create custom rules for identifying and classifying sensitive information based on their specific needs and use cases.
Batch processing: The app can process multiple documents at once, making it easy to redact or replace sensitive information in large datasets.


## Usage 

Install the required packages:

`pip install -r requirements.txt`

To run the app:

`python manage.py runserver 8000`