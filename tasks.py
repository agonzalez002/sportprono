from invoke import task

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
def django(ctx):
    """Run django server"""
    ctx.run("docker compose run django python manage.pu runserver 0.0.0.0:8000")

@task
def logs(ctx):
    ctx.run("docker compose logs -f")

@task
def shell(ctx):
    ctx.run("docker compose exec django /bin/bash")
