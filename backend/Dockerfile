FROM golang:1.18
# Add a work directory
WORKDIR /app
# Cache and install dependencies
COPY go.* ./
RUN go mod download
# Copy app files
COPY ./ ./
# Install Reflex for development
RUN go install github.com/cespare/reflex@latest

ADD start.sh /
RUN chmod +x /start.sh
# Expose port
EXPOSE 8000
# Start app
# CMD reflex -g '*.go' go run main.go --start-service
# CMD reflex -r '\.go$' go mod tidy --start-service
CMD ["/start.sh"]