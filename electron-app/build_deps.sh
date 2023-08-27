#!/usr/bin/env bash

set -eoux pipefail

# activate virtual environment
if [ ! -d "venv" ]; then
    python3 -m venv venv
fi
RUNNER_OS=${RUNNER_OS:-$(uname)}
if [[ "$RUNNER_OS" == "Windows" ]]; then
    venv/Scripts/Activate.bat
else
    source venv/bin/activate
fi
python -m pip install --upgrade pip
python -m pip install -r requirements.txt
python -m pip install ../builder
python -m pip install ../runner

# compile python code to binary for deployment
mkdir dist
python -m pip install pyinstaller
python -m PyInstaller src/python/pyrunner.py \
    --onefile \
    --hidden-import builder \
    --hidden-import runner \
    --hidden-import smart_open.ftp \
    --hidden-import smart_open.gcs \
    --hidden-import smart_open.hdfs \
    --hidden-import smart_open.http \
    --hidden-import smart_open.s3 \
    --hidden-import smart_open.ssh \
    --hidden-import smart_open.webhdfs

# Ensure nodemapper up-to-date
pushd ../nodemapper
cp src/redux/globals_electron.ts src/redux/globals.ts
yarn
yarn build
popd

# Bundle Mambaforge
if [[ "$RUNNER_OS" == "Windows" ]]; then
    echo "Downloading Mambaforge for Windows..."
    # curl does not work on git-bash, so use the activated python environment
    python -c "import requests; open('Mambaforge-Windows-x86_64.exe', 'wb').write(requests.get('https://github.com/conda-forge/miniforge/releases/latest/download/Mambaforge-Windows-x86_64.exe', allow_redirects=True).content)"
    powershell.exe -Command 'Start-Process .\Mambaforge-Windows-x86_64.exe -ArgumentList "/S /NoRegistry=1 /D=$env:UserProfile\mambaforge" -Wait'
    powershell.exe -Command 'Start-Process mv -ArgumentList "$env:UserProfile\mambaforge .\dist\conda" -Wait'
    echo "done."
elif [[ "$RUNNER_OS" == "Linux" ]]; then
    echo "Downloading Mambaforge for Linux..."
    wget -O Mambaforge.sh "https://github.com/conda-forge/miniforge/releases/latest/download/Mambaforge-$(uname)-$(uname -m).sh"
    bash Mambaforge.sh -b -p "./dist/conda"
    echo "done."
elif [[ "$RUNNER_OS" == "macOS" || "$RUNNER_OS" == "Darwin" ]]; then
    # Check for existing installation (will only present on developer machines)
    echo "Downloading Mambaforge for macOS..."
    if [ -f "Mambaforge.sh" ]; then
        echo "Mambaforge.sh already exists, skipping download."
    else
        curl -fsSLo Mambaforge.sh "https://github.com/conda-forge/miniforge/releases/latest/download/Mambaforge-MacOSX-$(uname -m).sh"
    fi
    if [ -d "./dist/conda" ]; then
        echo "Conda environment already exists, skipping installation."
    else
        bash Mambaforge.sh -b -p "./dist/conda"
    fi
    echo "done."
else
    echo "Unknown OS: $RUNNER_OS"
    exit 1
fi
