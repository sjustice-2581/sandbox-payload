# Payload CMS Sandbox

A sandbox environment for experimenting with Payload CMS, block-based content modeling, and custom admin features.

## 🚀 Getting Started

### Requirements

- Node.js 18+
- Docker (for local MongoDB)
- Git + GitHub personal access token

### Local Setup

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git
cd YOUR_REPO
yarn install
docker-compose up -d  # start MongoDB
yarn dev              # start Payload dev server
