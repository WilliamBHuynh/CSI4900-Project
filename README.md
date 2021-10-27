# CSI4900[F] Honours Project: NBA Vision

## Development Environment Setup
Prerequisites: npm, Python, Angular CLI, Django 
### Angular
In the root directory, navigate to Angular project
>cd NBA-Vision

Install packages
>npm install

Compile, build and run the webapp
>ng serve

###Python
In the root directory, create virtual Python environment 
>python -m venv <env_name>

Start the virtual environment
>.\<env_name>\Scripts\activate

Navigate to Django project
>cd NbaAPI

Apply database migrations
>python manage.py makemigrations NbaApp \
>python manage.py migrate NbaApp 

Start the server
>python manage.py runserver
