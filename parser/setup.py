#!/usr/bin/env python
from setuptools import setup


setup(
    name="parser",
    version="0.1",
    description="phyloflow parser",
    packages=["parser", "parser.snakemake_parser"],
    zip_safe=False,
)