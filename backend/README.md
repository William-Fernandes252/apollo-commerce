# Apollo Commerce Backend

The backend for the test is built with Django and Django Rest API, and the data is stored in a PostgreSQL instance. I chose this stask because:

-   it's feature rich: Django is one of the most robust and widely used web framework for Python, its includes a really powerfull ORM and a very broad ecosystem of open-source packages to solve the majority of the problems faced on the development of server-side applications;
-   Django REST Framework integrates seamsly with Django functionalities, wich makes the implementation of API resources from the business models fast and straight-forward;

## Run locally

I like to use Docker in my projects, as it allows you to establish a fixed and reproducible environment on any machine or in the cloud. So, in order to run the server,

-   install [Docker and Docker Compose](https://docs.docker.com/engine/install/) in your machine (I recommend installing Docker Desktop);
-   navigate to the project backend directory;
-   create a `.env` file with the content

          SECRET_KEY="django-insecure-wrmzj#y4o_-pn2!95wn+8(txrv5r9i$mho(%6*o)b4s4=_k31p"
          DEBUG=1
          ALLOWED_HOSTS=*

          POSTGRES_DB=apollo
          POSTGRES_USER=django
          POSTGRES_PASSWORD="EyQibMcmmZTkYk4thw6bJHuzYduwG6Sjzqiad9XNFQnP7knrFE5Q5JHftTqAPeiMrqLkAbebT49MwYRAa9DAe5RQNDNxoa5kTNwukYxE4kGpwC3fbYD7H4D7faAdsAAf"
          POSTGRES_HOST="127.0.0.1"

          DATABASE_URL=postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@postgres:5432/${POSTGRES_DB}

-   run

          docker compose --file docker-compose.local.yml up -d

-   to run the project tests, run

          docker compose exec django pytest
