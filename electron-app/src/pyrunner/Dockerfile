FROM condaforge/miniforge3:24.3.0-0 as conda

# Install snakemake
RUN mamba install -y "snakemake-minimal<9" pip -c bioconda
RUN pip install grapevne

# Pass UID to container (ensures appropriate permissions for created files/directories)
ARG HOST_UID
RUN useradd --uid ${HOST_UID} --create-home user
USER user

# Copy workflow files to container
COPY --chown=user . /home/user/
WORKDIR /home/user/

# Set-up the workflow conda environments
ENV TERM=xterm-color
RUN snakemake --conda-create-envs-only --use-conda --cores 1 $(snakemake --list)

# Run the workflow script
CMD ["bash", "-i", "-c", "./run.sh"]
