from invoke import task
import os

@task
def build(ctx):
    """Build docker images"""
    ctx.run("docker compose build")

@task
def up(ctx):
    """Start docker services"""
    ctx.run("docker compose up")

@task
def down(ctx):
    """Stop docker services"""
    ctx.run("docker compose down")

@task
def restart(ctx):
    ctx.run("docker compose down && docker compose up")

@task
def migrate(ctx):
    """Apply migrations on db"""
    ctx.run("docker compose run django python manage.py migrate")

@task
def makemigrations(ctx):
    """Create django migrations"""
    ctx.run("docker compose run django python manage.py makemigrations")

@task
def createsuperuser(ctx):
    """Create django superuser"""
    ctx.run("docker compose run django python manage.py createsuperuser")

@task
def collectstatic(ctx):
    """Collect djando static files"""
    ctx.run("docker compose run django python manage.py collectstatic --noinput")

@task
def frontend(ctx):
    """Run react server"""
    ctx.run("docker compose run react npm start")

@task
def lint(ctx):
    """Run react linter"""
    ctx.run("docker compose run -e FORCE_COLOR=1 react npm run lint")

@task
def django(ctx):
    """Run django server"""
    ctx.run("docker compose run django python manage.pu runserver 0.0.0.0:8000")

@task
def logs(ctx):
    ctx.run("docker compose logs -f")

@task
def shell(ctx):
    ctx.run("docker compose exec django /bin/bash")

@task
def createdump(ctx):
    """Create a dump of the PostgreSQL database"""
    # Assurez-vous que le dossier dumps existe
    if not os.path.exists("dumps"):
        os.makedirs("dumps")

    # Commande pour créer le dump de la base de données
    dump_file_path = "./dumps/sportprono_dump.sql"
    
    # Exécute la commande pg_dump dans le conteneur db
    ctx.run(f"docker exec -t sportprono-db-1 pg_dump -U sportpronoadmin sportprono > {dump_file_path}")
    
    print(f"Database dump created at {dump_file_path}")

@task
def importdump(ctx, dump_file="dumps/sportprono_dump.sql", db_container="sportprono-db-1", db_name="sportprono", db_user="sportpronoadmin"):
    """Import a PostgreSQL dump into the specified database in the Docker container."""
    
    # Vérifie si le fichier dump existe
    if not os.path.exists(dump_file):
        print(f"Dump file {dump_file} does not exist.")
        return

    # Copie le fichier dump dans le conteneur
    ctx.run(f"docker cp {dump_file} {db_container}:/tmp/sportprono_dump.sql")
    print(f"Copied {dump_file} to {db_container}:/tmp/sportprono_dump.sql")

    # Exécute la commande pour importer le dump
    ctx.run(f"docker exec -i {db_container} psql -U {db_user} -d {db_name} -f /tmp/sportprono_dump.sql")
    print(f"Imported {dump_file} into {db_name} database.")

    # Supprime le fichier temporaire du conteneur après l'importation
    ctx.run(f"docker exec -i {db_container} rm /tmp/sportprono_dump.sql")
    print("Removed temporary dump file from the container.")
