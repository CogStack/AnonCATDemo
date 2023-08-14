# Use the official Python image as the base image
FROM python:3.11

# Set environment variables (This overwrites all defualts in the app)
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
ENV DJANGO_SETTINGS_MODULE=api.settings  

# Set the working directory in the container
WORKDIR /anoncat/

# Install system dependencies 
RUN apt-get update && \
    apt-get install -y nodejs npm build-essential vim bash wget

# Install Rust
RUN curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y
ENV PATH="/root/.cargo/bin:${PATH}"

# Copy the requirements file into the container
COPY requirements.txt /anoncat/

# Install the required Python packages
RUN pip install --no-cache-dir --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code into the container
COPY anoncat /anoncat/

# Run the command to build frontend assets using Webpack
WORKDIR /anoncat/deidentify_app/
RUN npm install .
RUN npx webpack --config webpack.config.js

# Download the default Anoncat model
RUN wget -O deid_medcat_n2c2_modelpack.zip https://medcat.rosalind.kcl.ac.uk/media/deid_medcat_n2c2_modelpack.zip && \
    unzip deid_medcat_n2c2_modelpack.zip -d deidentify_app/models/

# Collect static files (if needed)
WORKDIR /anoncat/
RUN python manage.py migrate
RUN python manage.py collectstatic --noinput

# Expose the port that your Django app will run on
EXPOSE 8000

# Run the Django development server
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
