Perfect project for learning backend architecture. Rather than building a large email service, we'll build a **minimal but production-style Email Queue Service** where every concept is isolated and easy to understand.

# Tech Stack

* Node.js
* Express
* Redis
* BullMQ
* Docker (Redis)
* Nodemailer (later)
* dotenv

---

# What You'll Learn

By the end you'll understand:

* Queue
* Worker
* Producer
* Consumer
* Background Jobs
* Async Processing
* Retry Mechanism
* Delayed Jobs
* Cron Jobs
* Dead Letter Queue (Failed Jobs)
* Queue Events
* Graceful Shutdown

---

# Project Architecture

```
email-queue-service
│
├── src
│   ├── config
│   │   ├── env.js
│   │   └── redis.js
│   │
│   ├── queues
│   │   ├── email.queue.js
│   │   └── queue.events.js
│   │
│   ├── workers
│   │   └── email.worker.js
│   │
│   ├── producers
│   │   └── email.producer.js
│   │
│   ├── services
│   │   └── email.service.js
│   │
│   ├── routes
│   │   └── email.routes.js
│   │
│   ├── controllers
│   │   └── email.controller.js
│   │
│   ├── jobs
│   │   └── cleanup.job.js
│   │
│   ├── utils
│   │   └── logger.js
│   │
│   ├── app.js
│   └── server.js
│
├── .env
├── .gitignore
├── docker-compose.yml
├── package.json
└── README.md
```

Notice there is **no database**. This project focuses purely on queues.

---

# Folder Purpose

## config

Contains configuration.

```
env.js
```

Loads environment variables.

```
redis.js
```

Creates Redis connection.

---

## queues

Contains BullMQ Queue definitions.

```
email.queue.js
```

Creates

```
Email Queue
```

Later we'll configure

* retries
* delay
* removeOnComplete
* removeOnFail

---

```
queue.events.js
```

Listens for

* completed
* failed
* waiting
* active

---

## producers

Producer means

> Someone who adds jobs into the queue.

```
email.producer.js
```

Example

```
POST /send-email

↓

Producer

↓

Email Queue
```

Producer **never sends email**.

It only pushes jobs.

---

## workers

Consumer

```
Worker

↓

Reads queue

↓

Processes jobs
```

```
email.worker.js
```

This is where background processing happens.

---

## services

Actual business logic.

```
email.service.js
```

Initially

```
console.log("Sending Email")
```

Later

```
Nodemailer

↓

AWS SES

↓

SendGrid

↓

Mailgun
```

---

## controllers

Receives HTTP request.

```
POST /email
```

Calls Producer.

Nothing else.

---

## routes

Simple Express routes.

---

## jobs

Used for

Cron Jobs

Examples

```
Delete Old Jobs

Cleanup Queue

Retry Failed Jobs

Nightly Reports
```

---

## utils

Simple logger.

---

# Project Flow

```
Client

↓

POST /email

↓

Controller

↓

Producer

↓

Redis Queue

↓

Worker

↓

Email Service

↓

Success
```

No waiting.

API responds instantly.

Worker processes later.

This is exactly why queues exist.

---

# Learning Roadmap

## Phase 1

Basic Queue

```
Client

↓

Queue

↓

Worker

↓

Console.log()
```

---

## Phase 2

Email Service

```
Worker

↓

Fake Email
```

---

## Phase 3

Retries

```
attempts:3
```

Fail intentionally.

Watch retries.

---

## Phase 4

Delayed Jobs

```
Send after 30 seconds
```

---

## Phase 5

Cron Jobs

```
Every minute

↓

Add Email Job
```

---

## Phase 6

Dead Letter Queue

Failed jobs go here.

---

## Phase 7

Queue Events

Observe

```
Waiting

Active

Completed

Failed
```

---

## Phase 8

Graceful Shutdown

Close Worker

Close Redis

Exit cleanly.

---

# README.md

````markdown
# Email Queue & Background Job Service

A minimal Node.js project for learning asynchronous background processing using BullMQ and Redis.

---

## Concepts Covered

- Redis
- BullMQ
- Queue
- Worker
- Producer
- Consumer Pattern
- Background Jobs
- Async Processing
- Retry Mechanism
- Delayed Jobs
- Cron Jobs
- Dead Letter Queue
- Queue Events
- Graceful Shutdown

---

## Tech Stack

- Node.js
- Express
- Redis
- BullMQ
- Docker

---

## Project Structure

```text
src
├── config
├── controllers
├── jobs
├── producers
├── queues
├── routes
├── services
├── utils
├── workers
├── app.js
└── server.js
```
````

---

## Learning Order

1. Basic Queue
2. Producer
3. Worker
4. Background Jobs
5. Retry Mechanism
6. Delayed Jobs
7. Queue Events
8. Cron Jobs
9. Dead Letter Queue
10. Graceful Shutdown

---

## Flow

```text
Client
   │
   ▼
Express API
   │
   ▼
Producer
   │
   ▼
Redis Queue
   │
   ▼
Worker
   │
   ▼
Email Service
```

---

## Run Project

```bash
npm install
docker compose up -d
npm run dev
```

---

## API

```
POST /api/email
```

Body

```json
{
  "to": "john@example.com",
  "subject": "Hello",
  "text": "BullMQ Learning"
}
```

---

## Goal

The goal of this project is **not** to build a complete email service but to understand how asynchronous job processing works in production systems.

```
