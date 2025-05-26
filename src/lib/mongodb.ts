import mongoose from 'mongoose';

console.log('🔵 [mongodb.ts] התחיל להיטען');
console.log('🔵 [mongodb.ts] בודק process.env.NODE_ENV:', process.env.NODE_ENV);
console.log('🔵 [mongodb.ts] בודק process.env.MONGODB_URI ישירות:', process.env.MONGODB_URI);
console.log('🔵 [mongodb.ts] אורך process.env.MONGODB_URI:', process.env.MONGODB_URI?.length || 0);
if (process.env.MONGODB_URI) {
  console.log('🔵 [mongodb.ts] process.env.MONGODB_URI קיים. תוכן חלקי:', process.env.MONGODB_URI.substring(0, 50) + '...');
} else {
  console.log('🔴 [mongodb.ts] process.env.MONGODB_URI ***אינו קיים***');
}

// Fallback למקרה שאין משתני סביבה - ***הוסר זמנית לצורך אבחון***
// const MONGODB_URI = process.env.MONGODB_URI || 
//   'mongodb+srv://chepti:5ZcaxFWVkNJt2C8w@cluster0.tl7xwvn.mongodb.net/holmim-tikshuv?retryWrites=true&w=majority&appName=Cluster0';

const MONGODB_URI = process.env.MONGODB_URI; // ***שימוש ישיר לצורך אבחון***

if (!MONGODB_URI) {
  console.error('❌ [mongodb.ts] MONGODB_URI לא מוגדר לאחר בדיקה ישירה!');
  console.error('📋 [mongodb.ts] כל משתני הסביבה הזמינים:', Object.keys(process.env));
  console.error('📋 [mongodb.ts] משתני סביבה הקשורים ל-MONGO:', Object.keys(process.env).filter(key => key.toUpperCase().includes('MONGO')));
  console.error('📋 [mongodb.ts] משתני סביבה הקשורים ל-VERCEL (אם רלוונטי):', Object.keys(process.env).filter(key => key.toUpperCase().includes('VERCEL')));
  console.error('📋 [mongodb.ts] משתני סביבה הקשורים ל-NEXT_PUBLIC (צד לקוח):', Object.keys(process.env).filter(key => key.startsWith('NEXT_PUBLIC_')));
  throw new Error('[mongodb.ts] Please define the MONGODB_URI environment variable inside .env.local');
}

console.log('✅ [mongodb.ts] MONGODB_URI לשימוש:', MONGODB_URI.substring(0, 50) + '...');

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