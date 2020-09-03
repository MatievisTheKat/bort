#!/usr/bin/env bash

function install() {
    if [ -d "./node_modules/" ]; then
        npm ci
    else
        npm i
    fi
}

if [ $1 == "bot" ]; then
    install
else
    if [ $1 == "client" ]; then
        (cd client && install)
    else
        if [ $1 == "all" ]; then
            install
            (cd client && install)
        fi
    fi
fi