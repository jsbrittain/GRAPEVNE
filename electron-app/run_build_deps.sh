#!/usr/bin/env bash

set -eoux pipefail

# activate virtual environment
if [ ! -d "venv" ]; then
	python3 -m venv venv
fi
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
python -m PyInstaller src/python/backend.py --onefile --hidden-import ../builder

# Ensure nodemapper up-to-date
pushd ../nodemapper
yarn
yarn build
popd

# compile builderjs
pushd ../builderjs
yarn
yarn build
popd
