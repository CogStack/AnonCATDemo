# Use the official Python image as the base image
FROM python:3.11

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
ENV DJANGO_SETTINGS_MODULE=anoncat.api.settings

# Set the working directory in the container
WORKDIR /app

# Install system dependencies (if needed)
# Example: RUN apt-get update && apt-get install -y your_dependencies

# Copy the requirements file into the container
COPY requirements.txt /app/

# Install the required Python packages
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code into the container
COPY anoncat /app/

# Expose the port that your Django app will run on (if needed)
# Example: EXPOSE 8000

# Collect static files (if needed)
RUN python manage.py collectstatic --noinput

# Run the Django development server (replace with your actual command to run the app)
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]