import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Tool from '@/models/Tool';

const seedTools = [
  {
    name: 'ChatGPT',
    link: 'https://chat.openai.com',
    logo: '🤖',
    description: 'מודל שפה מתקדם לכתיבה, תכנון שיעורים ויצירת תוכן חינוכי. יכול לעזור במגוון משימות כמו כתיבת שאלות, הסבר מושגים, יצירת תרגילים ועוד.',
    limitations: 'מוגבל לנתונים עד אפריל 2024, לא תמיד מדויק, דורש בדיקה של התוכן שנוצר',
    advantages: 'קל לשימוש, תוצאות איכותיות, מגוון רחב של יכולות, זמין 24/7',
    disadvantages: 'דורש מנוי בגרסה המתקדמת, לא תמיד מדויק, יכול להמציא מידע',
    usageInTeaching: 'יצירת שאלות בחינה, הכנת חומרי לימוד, הסבר מושגים מורכבים, יצירת תרגילים מותאמים',
    toolRating: 4.5,
    difficultyLevel: 'בינוני',
    hebrewSupport: true,
    isFree: false,
    outputType: 'טקסט',
    communicationFormat: 'צ\'אט אינטראקטיבי',
    tags: ['כתיבה', 'תכנון שיעורים', 'שאלות', 'הסבר', 'יצירת תוכן'],
    pedagogicalContext: ['הקניה', 'תרגול', 'הערכה'],
    createdBy: 'system'
  },
  {
    name: 'Canva AI',
    link: 'https://www.canva.com',
    logo: '🎨',
    description: 'כלי עיצוב גרפי עם יכולות בינה מלאכותית ליצירת חומרי לימוד ויזואליים, פוסטרים, מצגות ועוד.',
    limitations: 'אפשרויות מוגבלות בגרסה החינמית, דורש חיבור לאינטרנט, תלוי בתבניות קיימות',
    advantages: 'ממשק ידידותי, תבניות רבות, יצירה מהירה, איכות גרפית גבוהה',
    disadvantages: 'מוגבל לתבניות קיימות, דורש מנוי לתכונות מתקדמות, לא תמיד מתאים לעברית',
    usageInTeaching: 'יצירת פוסטרים חינוכיים, עיצוב מצגות, יצירת אינפוגרפיקה, חומרי לימוד ויזואליים',
    toolRating: 4.2,
    difficultyLevel: 'קל',
    hebrewSupport: true,
    isFree: true,
    outputType: 'תמונה, מצגת, וידאו',
    communicationFormat: 'ממשק גרפי',
    tags: ['עיצוב', 'ויזואלי', 'פוסטרים', 'מצגות', 'אינפוגרפיקה'],
    pedagogicalContext: ['הקניה'],
    createdBy: 'system'
  },
  {
    name: 'Kahoot AI',
    link: 'https://kahoot.com',
    logo: '🎯',
    description: 'פלטפורמה ליצירת חידונים אינטראקטיביים עם בינה מלאכותית שמייצרת שאלות אוטומטית מתוכן נתון.',
    limitations: 'מוגבל לפורמט שאלות סגורות, דורש מכשירים לתלמידים, תלוי בחיבור אינטרנט',
    advantages: 'מעורר עניין ומוטיבציה, קל ליצירה, מתאים לכיתות גדולות, נתונים מיידיים',
    disadvantages: 'דורש מכשירים לכל תלמיד, לא מתאים לכל סוגי התוכן, יכול להיות מסיח דעת',
    usageInTeaching: 'הערכה מעצבת, חזרה על חומר, הפעלת הכיתה, בדיקת הבנה מיידית',
    toolRating: 4.7,
    difficultyLevel: 'קל',
    hebrewSupport: true,
    isFree: true,
    outputType: 'חידון אינטראקטיבי',
    communicationFormat: 'משחק מקוון',
    tags: ['חידונים', 'אינטראקטיבי', 'הערכה', 'משחק', 'מוטיבציה'],
    pedagogicalContext: ['תרגול', 'הערכה'],
    createdBy: 'system'
  },
  {
    name: 'Grammarly',
    link: 'https://www.grammarly.com',
    logo: '✍️',
    description: 'כלי לבדיקה ושיפור כתיבה באנגלית עם בינה מלאכותית שמזהה שגיאות דקדוק, איות וסגנון.',
    limitations: 'מתמחה באנגלית בלבד, לא תמיד מבין הקשר, יכול להציע שינויים לא מתאימים',
    advantages: 'שיפור משמעותי בכתיבה, הסברים ברורים, למידה מתמשכת, אינטגרציה עם כלים רבים',
    disadvantages: 'לא תומך בעברית, דורש מנוי לתכונות מתקדמות, לא מתאים לכל סגנונות כתיבה',
    usageInTeaching: 'שיפור כתיבה באנגלית, הוראת דקדוק, פיתוח כישורי כתיבה אקדמית',
    toolRating: 4.3,
    difficultyLevel: 'קל',
    hebrewSupport: false,
    isFree: true,
    outputType: 'הצעות שיפור טקסט',
    communicationFormat: 'תוסף דפדפן/אפליקציה',
    tags: ['כתיבה', 'אנגלית', 'דקדוק', 'איות', 'עריכה'],
    pedagogicalContext: ['הקניה', 'תרגול'],
    createdBy: 'system'
  },
  {
    name: 'Quizlet AI',
    link: 'https://quizlet.com',
    logo: '📚',
    description: 'פלטפורמה ליצירת כרטיסיות לימוד ומשחקי זיכרון עם בינה מלאכותית שיוצרת תוכן אוטומטית.',
    limitations: 'מתאים בעיקר לשינון, לא לכל סוגי הלמידה, דורש הקלדה של התוכן',
    advantages: 'יעיל לשינון, מגוון פורמטים, קל לשיתוף, מעקב אחר התקדמות',
    disadvantages: 'מוגבל לשינון בסיסי, לא מתאים לחשיבה ביקורתית, דורש הכנה מוקדמת',
    usageInTeaching: 'שינון אוצר מילים, לימוד עובדות, חזרה על חומר, הכנה לבחינות',
    toolRating: 4.1,
    difficultyLevel: 'קל',
    hebrewSupport: true,
    isFree: true,
    outputType: 'כרטיסיות דיגיטליות',
    communicationFormat: 'אפליקציה/אתר',
    tags: ['שינון', 'כרטיסיות', 'זיכרון', 'אוצר מילים', 'חזרה'],
    pedagogicalContext: ['תרגול'],
    createdBy: 'system'
  }
];

export async function GET() {
  try {
    // בדיקה אם יש כבר כלים במסד הנתונים
    await connectToDatabase();
    const existingTools = await Tool.countDocuments();
    
    if (existingTools > 0) {
      return NextResponse.json({
        message: `מסד הנתונים כבר מכיל ${existingTools} כלים. לא נדרש אתחול.`,
        existingCount: existingTools
      });
    }

    // אתחול מסד הנתונים
    const tools = await Tool.insertMany(seedTools);
    
    return NextResponse.json({
      message: `מסד הנתונים אותחל בהצלחה! נוספו ${tools.length} כלים.`,
      tools: tools.map(tool => ({
        id: tool._id,
        name: tool.name,
        logo: tool.logo
      }))
    });
  } catch (error) {
    console.error('שגיאה באתחול מסד הנתונים:', error);
    return NextResponse.json(
      { 
        error: 'שגיאה באתחול מסד הנתונים',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 