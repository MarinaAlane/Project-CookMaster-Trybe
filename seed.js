const query = db.users.insertOne({ name: 'admin', email: 'root@email.com', password: 'admin', role: 'admin' });

module.exports = { query };
