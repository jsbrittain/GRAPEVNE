FROM condaforge/mambaforge:23.3.1-1 as conda
FROM ubuntu:22.04 as base

ENV DEBIAN_FRONTEND noninteractive
RUN apt-get update && \
    apt-get -y install \
      gcc=4:11.2.0-1ubuntu1 \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Set-up conda
COPY --from=conda /opt/conda /opt/conda
ENV PATH="/opt/conda/bin:${PATH}"
RUN conda config --set channel_priority strict

# Install python 3.11 (required for snakemake 8.2)
RUN apt-get update && \
    apt-get install -y software-properties-common && \
    add-apt-repository -y ppa:deadsnakes/ppa && \
    apt-get update && \
    apt install -y python3.11 && \
    apt install -y python3.11-dev && \
    apt install -y python3-pip

# Install snakemake
RUN python3.11 -m pip install --upgrade pip && \
    python3.11 -m pip install snakemake==8.4

# Pass UID to container (ensures appropriate permissions for created files/directories)
ARG HOST_UID
RUN useradd --uid ${HOST_UID} --create-home user
USER user

# Copy workflow files to container
COPY --chown=user . /home/user/workflow
WORKDIR /home/user/workflow

# Set-up the workflow conda environments
ENV TERM=xterm-color
RUN snakemake --conda-create-envs-only --use-conda --cores 1 

# Run the workflow script
CMD ["bash", "-i", "-c", "./run.sh"]
