import driver from './db.js';

const resolvers = {
  transactions: async () => {
    const session = driver.session();
    const result = await session.run('MATCH (t:Transaction) RETURN t');
    session.close();
    return result.records.map(record => record.get('t').properties);
  },

  users: async () => {
    const session = driver.session();
    const result = await session.run('MATCH (u:User) RETURN u');
    session.close();
    return result.records.map(record => record.get('u').properties);
  },

  fraudPatterns: async () => {
    const session = driver.session();
    const result = await session.run('MATCH (f:FraudPattern) RETURN f');
    session.close();
    return result.records.map(record => record.get('f').properties);
  },

  detectFraud: async () => {
    const session = driver.session();
    // Example query: Return transactions with amount > threshold (e.g., 10000)
    const result = await session.run(`
      MATCH (t:Transaction)
      WHERE t.amount > 10000 OR t.timestamp < datetime({epochMillis: timestamp() - 86400000})
      RETURN t
    `);
    session.close();
    return result.records.map(record => record.get('t').properties);
  },

  createTransaction: async ({ amount, timestamp, userId }) => {
    const session = driver.session();
    const result = await session.run(
      'CREATE (t:Transaction {amount: $amount, timestamp: $timestamp, userId: $userId}) RETURN t',
      { amount, timestamp, userId }
    );
    session.close();
    return result.records[0].get('t').properties;
  },

  createUser: async ({ name }) => {
    const session = driver.session();
    const result = await session.run('CREATE (u:User {name: $name}) RETURN u', { name });
    session.close();
    return result.records[0].get('u').properties;
  },

  createFraudPattern: async ({ name, criteria }) => {
    const session = driver.session();
    const result = await session.run('CREATE (f:FraudPattern {name: $name, criteria: $criteria}) RETURN f', { name, criteria });
    session.close();
    return result.records[0].get('f').properties;
  },

  linkTransactionToFraud: async ({ transactionId, fraudPatternId }) => {
    const session = driver.session();
    const result = await session.run(
      `MATCH (t:Transaction), (f:FraudPattern)
      WHERE id(t) = $transactionId AND id(f) = $fraudPatternId
      CREATE (t)-[:LINKED_TO]->(f)
      RETURN t`,
      { transactionId: parseInt(transactionId), fraudPatternId: parseInt(fraudPatternId) }
    );
    session.close();
    return result.records[0].get('t').properties;
  }
};

export default resolvers;
