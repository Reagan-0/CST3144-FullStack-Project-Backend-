const { MongoClient } = require('mongodb');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error('MONGODB_URI not set in .env file');
  process.exit(1);
}

const client = new MongoClient(uri);

async function importData() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    
    const db = client.db(process.env.DB_NAME || 'lessonsdb');
    
    // Read and import lessons
    const lessonsPath = path.join(__dirname, 'sample_lessons_data.json');
    const lessonsData = JSON.parse(fs.readFileSync(lessonsPath, 'utf8'));
    const lessonsCollection = db.collection('lesson');
    
    // Clear existing data (optional - comment out if you want to keep existing data)
    // await lessonsCollection.deleteMany({});
    
    const lessonResult = await lessonsCollection.insertMany(lessonsData);
    console.log(`✅ Imported ${lessonResult.insertedCount} lessons`);
    
    // Verify import
    const lessonCount = await lessonsCollection.countDocuments();
    console.log(`\n📊 Total lessons in database: ${lessonCount}`);
    
    // Display sample lesson
    const sampleLesson = await lessonsCollection.findOne({});
    console.log('\n📝 Sample lesson:');
    console.log(JSON.stringify(sampleLesson, null, 2));
    
    console.log('\n✅ Data import completed successfully!');
    console.log('\n💡 Note: Each lesson includes an "icon" field with Font Awesome class names.');
    console.log('   Example: "fa-solid fa-calculator" for Mathematics');
    
  } catch (error) {
    console.error('❌ Error importing data:', error);
    process.exit(1);
  } finally {
    await client.close();
    console.log('\n🔌 Disconnected from MongoDB');
  }
}

// Run the import
importData();

