#!/bin/bash

go mod tidy
reflex -r '\.go$' go run main.go --start-service