import mongoose from 'mongoose';

console.log('🔍 בודק משתני סביבה...');
console.log('📁 process.env.NODE_ENV:', process.env.NODE_ENV);
console.log('📁 process.env.MONGODB_URI exists:', !!process.env.MONGODB_URI);
console.log('📁 process.env.MONGODB_URI length:', process.env.MONGODB_URI?.length || 0);

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI לא מוגדר!');
  console.error('📋 כל משתני הסביבה:', Object.keys(process.env).filter(key => key.includes('MONGO')));
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

console.log('✅ MONGODB_URI נמצא:', MONGODB_URI.substring(0, 50) + '...');

// Define the cached type
interface Cached {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

// Add the mongoose property to global
declare global {
  // eslint-disable-next-line no-var
  var mongoose: Cached | undefined;
}

const cached: Cached = global.mongoose || { conn: null, promise: null };

if (!global.mongoose) {
  global.mongoose = cached;
}

export async function connectToDatabase() {
  if (cached.conn) {
    console.log('♻️ משתמש בחיבור קיים');
    return cached.conn;
  }

  if (!cached.promise) {
    console.log('🔗 יוצר חיבור חדש ל-MongoDB...');
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI!, opts).then((mongoose) => {
      console.log('✅ חיבור ל-MongoDB הצליח!');
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    console.error('❌ שגיאה בחיבור ל-MongoDB:', e);
    cached.promise = null;
    throw e;
  }

  return cached.conn;
} 