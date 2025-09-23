# Jules Ansible Deployment Documentation

This documentation explains how to set up and deploy the Jules application using Ansible, Docker, PostgreSQL, Nginx proxy, and GitHub Actions workflows.

---

## 1. Project Structure

```
ansible/
├── Dockerfile
├── deploy-app.yml
├── ansible.cfg
├── inventory/
│   └── hosts.yml
├── group_vars/
│   └── all.yml
├── roles/
│   ├── base/
│   ├── db/
│   ├── docker/
│   ├── nginx_proxy/
│   └── app/
└── workflows/
    ├── app-docker-build.yml
    ├── ansible-docker-build.yml
    └── deploy-prod.yml
```

---

## 2. Docker Image for Ansible

**Dockerfile**:

* Base image: `alpine/ansible`
* Environment:

  * `ANSIBLE_JINJA2_NATIVE=True`
  * SSH arguments to avoid strict host key checking
* Install Ansible collections from `requirements.yml`

---

## 3. Roles

### 3.1 Base Role

Updates the system's apt cache.

### 3.2 Docker Role

Installs Docker, adds repository, plugins, and creates a network.

* Install Docker packages and dependencies
* Enable Docker service
<!-- * Install Loki plugin -->
* Login to Docker registry using credentials
* Create Docker network for the application

### 3.3 DB Role

Runs PostgreSQL in Docker with healthchecks.

* Create Docker volume for Postgres
* Run Postgres container with environment variables for DB, user, password
* Healthcheck configuration
* Handler to restart Postgres container if needed

### 3.4 Nginx Proxy Role

Deploys Nginx to proxy API and frontend applications.

* Install Nginx and Certbot
* Deploy API and APP configs using Jinja templates
* Enable sites and reload Nginx
* Obtain SSL certificates using Certbot
* Handler to reload Nginx when configs change

### 3.5 App Role

Deploys backend, frontend, and migration containers.

* Create env files in the VPS using jinja2 templates for backend (`api.env.j2`) and frontend (`web.env.j2`)
* Run backend container
* Run migration container (one-shot)
* Run frontend container

**Environment variables templates:**

```text
# api.env.j2
API__API_PORT={{ api_port }}
API__PAGINATION__PAGE_SIZE={{ api_page_size }}
DB__DB_URI={{ db_uri }}
SEED__USERS__COUNT={{ seed_users_count }}
API__CORS__ALLOWED_HOST_JSON={{ api_cors_json | replace("'", '"') }}

# web.env.j2
NEXT_PUBLIC_API__URL={{ next_public_api_url }}
```

---

## 4. Playbook (`deploy-app.yml`)

### Steps:

1. Apply base role
2. Deploy Docker
3. Deploy Postgres
4. Deploy Nginx Proxy
5. Deploy App containers (backend, migration, frontend)

Each role can be tagged individually (`deploy-app`, `deploy-docker`, `database`, `deploy-webserver`).

---

## 5. GitHub Actions Workflows

### 5.1 Build & Push App Docker Images (`app-docker-build.yml`)

* Build and push frontend/backend Docker images if files changed
* Tag images with environment and commit SHA

### 5.2 Build & Push Ansible Image (`ansible-docker-build.yml`)

* Build Ansible image with all roles and dependencies
* Push image to GitHub Container Registry

### 5.3 Deploy App (`deploy-prod.yml`)

* Triggered manually or after successful build workflow
* Runs Ansible playbook inside Ansible Docker image
* Uses environment variables and SSH key for VPS access

---

## 6. Notes

* Ensure Docker and Ansible are installed on your control machine if running outside the Docker image.
* Nginx proxy handles SSL with Certbot and reverse proxy for API and frontend.
* Environment variable templating allows seamless deployment across environments.

---

