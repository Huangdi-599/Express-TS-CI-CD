# Lightweight Node.js Application

A minimal Node.js application optimized for running on t2.micro EC2 instances.

## Features

- Express.js server with minimal dependencies
- Compression enabled for better performance
- Security headers with Helmet
- Health check endpoint
- Docker support
- Optimized for t2.micro EC2 instances

## Prerequisites

- Node.js >= 18
- Docker
- Jenkins (for CI/CD)

## Local Development

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

## Docker Build and Run

1. Build the Docker image:
```bash
docker build -t lightweight-node-app .
```

2. Run the container:
```bash
docker run -p 3000:3000 lightweight-node-app
```

## Jenkins Deployment

The application is designed to be deployed through Jenkins to an EC2 instance. The Docker image will be built and pushed to your container registry, then pulled and run on the EC2 instance.

## Environment Variables

- `PORT`: The port the application will run on (default: 3000)
- `NODE_ENV`: The environment (development/production)

## Health Check

The application includes a health check endpoint at `/health` that returns a 200 status code when the application is running properly.

## Performance Considerations

- Uses compression for all responses
- Implements security best practices
- Minimal dependencies to reduce memory footprint
- Alpine-based Docker image for smaller size 