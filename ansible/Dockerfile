FROM alpine/ansible

ENV ANSIBLE_JINJA2_NATIVE=True \
    ANSIBLE_SSH_ARGS="-o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null -o IdentitiesOnly=yes -o ControlMaster=auto -o ControlPersist=60s"
WORKDIR /ansible
COPY requirements.yml .
RUN ansible-galaxy collection install -r requirements.yml --force
COPY . /ansible
