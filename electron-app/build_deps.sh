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
python -m pip install pyinstaller
python -m PyInstaller src/python/pyrunner.py \
    --hidden-import builder \
    --hidden-import runner \
    --add-data "src/python/Dockerfile:." \
    --add-data "src/python/run_docker_sh:."

# Ensure nodemapper has the most up-to-date electron api file
cp src/api.ts ../nodemapper/src

# Build nodemapper (front-end)
pushd ../nodemapper
cp src/redux/globals_electron.ts src/redux/globals.ts
rm -rf dist
yarn install
yarn
yarn build
popd
