const mongoose = require('mongoose');
require('dotenv').config({ path: 'server/.env' });

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/smart_attendance';

async function testConnection() {
  console.log('🔍 Testing MongoDB Database Connection...');
  console.log(`📡 Connecting to: ${MONGO_URI}`);

  try {
    const startTime = Date.now();
    await mongoose.connect(MONGO_URI);
    const latency = Date.now() - startTime;

    console.log(`✅ SUCCESS: Connected to MongoDB! (Latency: ${latency}ms)`);
    console.log(`📦 Database Name: "${mongoose.connection.name}"`);

    const collections = await mongoose.connection.db.collections();

    console.log('\n📊 Database Collection Audit:');
    console.log('-------------------------------------------');

    for (const col of collections) {
      const count = await col.countDocuments();
      console.log(`  • ${col.collectionName.padEnd(20)}: ${count} documents`);
    }

    console.log('-------------------------------------------');
    console.log('🎉 MongoDB Connection & Data Verification PASSED!');
    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error.message);
    process.exit(1);
  }
}

testConnection();
