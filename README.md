# Streak App

[![Netlify Status](https://api.netlify.com/api/v1/badges/5a63434e-054d-4c60-b69b-a9672659742e/deploy-status)](https://app.netlify.com/sites/serverless-streak-client/deploys)

This is a single page application for tracking your goals. The idea is to quantify
goals and set an amount (or checklist) to complete it within certain period.
The goal is automatically divided into equal pieces and distributed to each day.
User can update their progress every day and visualize how far away they're behind
or ahead of schedule.

The backend service of this app is [here](https://github.com/ChloeLiang/serverless-streak-api).

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Installation

Set up environment variables:

```bash
cp .env.example .env
```

Install all dependencies:

```bash
npm install
```

Start development server:

```bash
npm start
```

Open localhost:3000 to view the app.

## Deployment

Changes on master branch are automatically deployed to production.
Branch preview is enabled for development deployment.
