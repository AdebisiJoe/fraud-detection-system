

# Fraud Detection System

## Overview

The Fraud Detection System is a simple web application that uses a graph database (Neo4j) to detect and prevent fraudulent activities by analyzing transaction and behavior patterns. It features the ability to store and analyze data on transactions, user behavior, and known fraud patterns. The application links related fraudulent activities and identifies common tactics.

## Features

- Store and analyze transactions and user behavior.
- Define and manage fraud patterns.
- Detect fraudulent transactions based on predefined and user-defined patterns.
- Link transactions to fraud patterns to visualize relationships.
- Provide alerts and detailed analysis of detected fraud.

## Requirements

- Node.js
- Neo4j

## Installation

1. Clone the repository:

    ```sh
    git clone https://github.com/AdebisiJoe/fraud-detection-system.git
    cd fraud-detection-system
    ```

2. Install the dependencies:

    ```sh
    npm install
    ```

3. Set up the environment variables. Create a `.env` file in the root directory and add the following:

    ```plaintext
    NEO4J_URI=bolt://localhost:7687
    NEO4J_USER=neo4j
    NEO4J_PASSWORD=yourpassword
    PORT=3000
    ```

4. Ensure your Neo4j database is running.

5. Start the application:

    ```sh
    node app.js
    ```

6. Open your browser and navigate to `http://localhost:3000/graphql` to access the GraphiQL interface.

## Usage

### GraphQL Queries and Mutations

**Create a User:**

```graphql
mutation {
  createUser(name: "Alice") {
    id
    name
  }
}
```

**Create a Transaction:**

```graphql
mutation {
  createTransaction(amount: 15000, timestamp: "2024-07-03T10:00:00Z", userId: "1") {
    id
    amount
    timestamp
    userId
  }
}
```

**Create a Fraud Pattern:**

```graphql
mutation {
  createFraudPattern(name: "High Amount", criteria: "amount > 10000") {
    id
    name
    criteria
  }
}
```

**Link a Transaction to a Fraud Pattern:**

```graphql
mutation {
  linkTransactionToFraud(transactionId: "1", fraudPatternId: "1") {
    id
    amount
    timestamp
    userId
  }
}
```

**Get All Users:**

```graphql
query {
  users {
    id
    name
  }
}
```

**Get All Transactions:**

```graphql
query {
  transactions {
    id
    amount
    timestamp
    userId
  }
}
```

**Get All Fraud Patterns:**

```graphql
query {
  fraudPatterns {
    id
    name
    criteria
  }
}
```

**Detect Fraud (Based on default criteria):**

```graphql
query {
  detectFraud {
    id
    amount
    timestamp
    userId
  }
}
```

## Project Structure

```plaintext
.
├── db.js
├── resolvers.js
├── schema.js
├── app.js
├── package.json
├── .env
└── README.md
```

- `db.js`: Contains the Neo4j database connection setup.
- `resolvers.js`: Contains the GraphQL resolvers for handling queries and mutations.
- `schema.js`: Defines the GraphQL schema.
- `app.js`: Sets up the Express.js server and integrates GraphQL.
- `package.json`: Lists the project dependencies.
- `.env`: Stores environment variables for database connection and server configuration.

## Contributing

Contributions are welcome! Please fork the repository and submit pull requests for any improvements or bug fixes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.


