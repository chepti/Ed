# חולמים תקשוב - מאגר כלי AI לחינוך

פלטפורמה חדשנית למורים לגילוי, דירוג ושיתוף כלי בינה מלאכותית מתאימים לחינוך.

## תכונות עיקריות

### 🔍 חיפוש וגילוי כלים
- מנוע חיפוש מתקדם לאיתור כלי AI מתאימים לכל צורך חינוכי
- מסננים מתקדמים לפי רמת קושי, הקשר פדגוגי, תמיכה בעברית וחינמיות
- תצוגת כלים עם דירוגים, תגיות ומידע מפורט

### 📚 הדרכות ודוגמאות
- מאגר עשיר של הדרכות מעשיות לכל כלי
- דוגמאות ופרומפטים מוכנים לשימוש
- תוכן בפורמטים שונים: וידאו, טקסט, PDF

### ⭐ דירוגים וביקורות
- מערכת דירוגים מקיפה לכלים, הדרכות ודוגמאות
- ביקורות מפורטות ממורים אחרים
- הצגת יתרונות, חסרונות ומגבלות

### 📂 מדפים אישיים
- יצירת אוספי כלים אישיים לפי נושאים
- שיתוף מדפים עם מורים אחרים
- גילוי קשרים בין כלים שונים

### 👥 קהילת מורים
- פלטפורמה שיתופית למורים
- הוספת תוכן חדש למאגר
- למידה הדדית ושיתוף ניסיון

## טכנולוגיות

- **Frontend**: Next.js 14 עם App Router
- **UI**: shadcn/ui + Tailwind CSS
- **Authentication**: Clerk
- **Database**: MongoDB Atlas עם Mongoose
- **TypeScript**: תמיכה מלאה בטיפוסים

## התקנה והפעלה

### דרישות מוקדמות
- Node.js 18+ 
- npm או yarn
- חשבון MongoDB Atlas
- חשבון Clerk

### שלבי התקנה

1. **שכפול הפרויקט**
```bash
git clone <repository-url>
cd hoodiny2
```

2. **התקנת תלויות**
```bash
npm install
```

3. **הגדרת משתני סביבה**
צרו קובץ `.env.local` בשורש הפרויקט:

```env
# MongoDB
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/hoodiny2

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
```

4. **הפעלת שרת הפיתוח**
```bash
npm run dev
```

האתר יהיה זמין בכתובת: `http://localhost:3000`

## מבנה הפרויקט

```
src/
├── app/                    # App Router pages
│   ├── (dashboard)/       # Protected dashboard routes
│   │   ├── dashboard/     # Main dashboard
│   │   └── tools/         # Tools management
│   ├── api/               # API routes
│   └── globals.css        # Global styles
├── components/
│   └── ui/                # Reusable UI components
├── lib/                   # Utility functions
│   └── mongodb.ts         # Database connection
├── models/                # Mongoose schemas
│   ├── Tool.ts           # AI tools
│   ├── Tutorial.ts       # Tutorials
│   ├── Example.ts        # Examples & prompts
│   ├── Shelf.ts          # User collections
│   └── User.ts           # User data
└── utils/                 # Helper functions
```

## מודלי נתונים

### Tool (כלי AI)
- שם הכלי, קישור, לוגו
- תיאור, יתרונות, חסרונות, מגבלות
- רמת קושי, תמיכה בעברית, חינמיות
- הקשר פדגוגי, תגיות
- דירוג ומידע על היוצר

### Tutorial (הדרכות)
- כותרת, פורמט (וידאו/טקסט/PDF)
- קישור, מידע נוסף
- קרדיט ליוצר, דירוג

### Example (דוגמאות)
- כותרת, תיאור, פרומפט
- קישור לתוצר
- קרדיט ליוצר, דירוג

### Shelf (מדפים)
- שם המדף, תיאור
- רשימת כלים, תגיות
- הגדרות פרטיות/ציבוריות

## API Routes

### Tools
- `GET /api/tools` - קבלת כלים עם סינון
- `POST /api/tools` - יצירת כלי חדש
- `GET /api/tools/[id]` - פרטי כלי ספציפי
- `PUT /api/tools/[id]` - עדכון כלי
- `DELETE /api/tools/[id]` - מחיקת כלי

### Tutorials
- `GET /api/tutorials` - קבלת הדרכות
- `POST /api/tutorials` - הוספת הדרכה חדשה

### Examples
- `GET /api/examples` - קבלת דוגמאות
- `POST /api/examples` - הוספת דוגמה חדשה

## פיתוח נוסף

### תכונות מתוכננות
- [ ] מערכת דירוגים מתקדמת
- [ ] התראות על כלים חדשים
- [ ] ייצוא מדפים
- [ ] אינטגרציה עם כלי חינוך נוספים
- [ ] מערכת תגובות ודיונים
- [ ] ממשק ניהול למנהלים

### הוספת תכונות חדשות
1. צרו branch חדש
2. פתחו את המודלים הרלוונטיים ב-`src/models/`
3. הוסיפו API routes ב-`src/app/api/`
4. צרו רכיבי UI ב-`src/components/`
5. הוסיפו דפים ב-`src/app/`

## תרומה לפרויקט

אנו מזמינים מורים ומפתחים לתרום לפרויקט:

1. Fork את הפרויקט
2. צרו branch לתכונה החדשה
3. בצעו commit לשינויים
4. פתחו Pull Request

## יצירת קשר

**חפציה בן ארצי - חולמים תקשוב**
- Email: chepti@gmail.com
- פרויקט: חולמים עתיד חינוכי טוב יותר עם כלי בינה מלאכותית

## רישיון

פרויקט זה מיועד לשימוש חינוכי ולא מסחרי.

---

*חולמים תקשוב - מגשרים בין טכנולוגיה לחינוך*


