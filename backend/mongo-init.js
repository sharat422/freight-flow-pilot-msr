
db = db.getSiblingDB('messageDB');

// Create the messages collection
db.createCollection('messages');

// Create indexes for better performance
db.messages.createIndex({ "email": 1 });
db.messages.createIndex({ "createdAt": 1 });
db.messages.createIndex({ "ip": 1, "createdAt": 1 }); // For rate limiting by IP

print('Database initialized successfully');
