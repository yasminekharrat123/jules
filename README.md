# Jules

## What is Jules

A student management system with a Next.js frontend and Node.js backend.
This app have been created for our entry technical test for our devops teams.

## Features

- View and add students
- View grades of students and add new grades

## Tech Stack

Frontend:

- Next.js
- TypeScript
- Axios
- Tailwind CSS
- Zod

Backend:

- Node.js
- Kysely
- Hono
- Zod
- PostgreSQL

## Prerequisites

- Node.js
- PNPM
- PostgreSQL

## Start the project

### Frontend

1. Navigate to the frontend directory: `cd web`
2. Copy the `.env.example` file to `.env.local` and fill the variables
3. Install the dependencies: `pnpm install`
4. Start the development server: `pnpm run dev`
5. Open `http://localhost:3000` in your browser

### Backend

1. Navigate to the backend directory: `cd api`
2. Copy the `.env.example` file to `.env` and configure your PostgreSQL connection
3. Install the dependencies: `pnpm install`
4. Run database migrations: `pnpm kysely migrate:latest`
5. Start the development server: `pnpm run dev`
6. The API will be available at `http://localhost:3001`

## Environment Variables

### Frontend (.env.local)

```txt
NEXT_PUBLIC_API__URL=<http://domain:port> # The API URL
```

### Backend (.env)

```txt
API__API_PORT=3001 # The port of the API
API__PAGINATION__PAGE_SIZE=20 # The number of items per page
DB__DB_URI=postgres://user:password@host:port/database # The database URI
SEED__USERS__COUNT=50 # The number of users to seed
API__CORS__ALLOWED_HOST_JSON=["http://orgin1.com", "http://orgin2.fr", "http://orgin3.io"] # The allowed hosts for CORS
```
## Deployment & Infrastructure Guide

This section explains how to initialize the infrastructure, provision and configure machines, deploy the Jules app, and manage secrets securely.

### 1. Initializing Infrastructure

The infrastructure should be prepared before deploying the application. This includes:

* Setting up VPS or cloud instances.
* Ensuring SSH access with a private key for ansible deployment.

### 2. Provisioning & Configuring Machines

Provisioning and configuration are automated using Ansible. Steps include:

1. Clone the repository to your local machine or CI environment.
2. Ensure the Ansible playbooks are available under the `ansible` directory.
3. Configure the `inventory/hosts.yml` file to list the deployment server.

Ansible handles:

* Installing required packages.
* Setting up directories.
* Pulling and running Docker images.
* Configuring environment variables.

### 3. Deploying the App

Deployment is fully automated through GitHub Actions CI/CD.

1. **Build & Push Docker Images:**

   * Triggered on push to `master` branch.
   * Frontend and backend services are built and pushed to GitHub Container Registry when any changes happen under /web or /api (build jobs for frontend or backend are seperate).
   * Images are tagged with both environment and git commit SHA.

2. **Deploy with Ansible:**

   * Triggered automatically after successful build or manually via workflow dispatch.
   * Ansible playbook `deploy-app.yml` runs on the provisioned machines.
   * Pulls the Docker images and starts the containers.
   * Configures environment variables and ports.

### 4. Managing Secrets Securely

All sensitive information such as passwords, API keys, and SSH keys are managed using GitHub Secrets. Examples include:

* `POSTGRES_DB`, `POSTGRES_USER`, `POSTGRES_PASSWORD`: Database credentials.
* `DOCKER_REGISTRY`, `DOCKER_REGISTRY_USER`, `DOCKER_REGISTRY_PASSWORD`: Docker registry credentials.

Secrets are injected into the deployment process via GitHub Actions environment variables and passed to Ansible playbooks securely.

### 5. Summary of CI/CD Flow

1. Code pushed to `master` triggers the build workflow.
2. Docker images for backend and frontend are built and pushed.
3. Upon successful build, the deploy workflow is triggered.
4. Ansible playbook pulls the images and deploys the application.
5. All secrets are handled securely and never stored in the repository.

### 6. Monitoring
Monitoring is fully automated and can be deployed seperately using CICD workflow. See README.md under ansible/roles/monitoring for details


# Deployed App
```
![alt text](deployed_app_vps.png)

```