# MEMORY BANK - חולמים תקשוב | AI Tools Platform

## פרטי הפרויקט
- **שם הפרויקט**: חולמים תקשוב
- **יוצר**: חפציה בן ארצי (chepti@gmail.com)
- **מטרה**: פלטפורמה למורים לגילוי, דירוג ושיתוף כלי בינה מלאכותית לחינוך
- **טכנולוגיות**: Next.js 15, TypeScript, MongoDB, Clerk Auth, Tailwind CSS, shadcn/ui
- **סטטוס**: ✅ פרוס בהצלחה ב-Vercel + ✅ מחובר לנתונים אמיתיים

## מה כבר בוצע ✅

### 1. תשתית בסיסית
- ✅ Next.js 15 boilerplate מותקן ומוגדר
- ✅ TypeScript מוגדר
- ✅ Tailwind CSS מותקן
- ✅ shadcn/ui components מותקנים
- ✅ Clerk Authentication מחובר ומוגדר
- ✅ MongoDB Atlas מחובר (משתני סביבה מוגדרים)
- ✅ פריסה מוצלחת ב-Vercel

### 2. מודלי נתונים (MongoDB Schemas)
- ✅ **Tool.ts**: מודל מקיף לכלי AI
  - שדות: name, link, logo, description, limitations, advantages, disadvantages
  - דירוגים: toolRating, usageInTeaching
  - מאפיינים: difficultyLevel, hebrewSupport, isFree, outputType, communicationFormat
  - תגיות ופדגוגיה: tags, pedagogicalContext
  - מטא-דאטה: createdBy, createdAt, updatedAt

- ✅ **Tutorial.ts**: מודל להדרכות
  - שדות: toolId, title, format, link, additionalInfo, credit, rating
  - מטא-דאטה: contributedBy, createdAt

- ✅ **Example.ts**: מודל לדוגמאות ופרומפטים
  - שדות: toolId, productLink, title, description, credit, rating
  - מטא-דאטה: contributedBy, createdAt

- ✅ **Shelf.ts**: מודל למדפים אישיים
  - שדות: name, description, tools, isPublic, tags
  - מטא-דאטה: createdBy, createdAt, updatedAt

### 3. רכיבי UI שנוצרו ידנית
- ✅ Badge.tsx
- ✅ Select.tsx (Radix UI)
- ✅ Checkbox.tsx (Radix UI)
- ✅ Textarea.tsx
- ✅ Label.tsx (Radix UI)
- ✅ Tabs.tsx (Radix UI)

### 4. דפי האפליקציה
- ✅ **דף הבית** (`src/app/page.tsx`): עמוד נחיתה עם תיאור הפלטפורמה
- ✅ **דאשבורד** (`src/app/(dashboard)/dashboard/page.tsx`): 
  - מרכז בקרה למורים
  - ✅ כפתור אתחול מסד נתונים
- ✅ **דף כלים** (`src/app/(dashboard)/tools/page.tsx`): 
  - ✅ חיפוש וסינון כלים מחובר לנתונים אמיתיים
  - ✅ תצוגת כרטיסים עם דירוגים
  - ✅ מסננים: קושי, הקשר פדגוגי, עברית, חינמיות
  - ✅ מצב טעינה ו-Empty state
- ✅ **הוספת כלי** (`src/app/(dashboard)/tools/new/page.tsx`): 
  - ✅ טופס מפורט מחובר ל-API
- ✅ **פרטי כלי** (`src/app/(dashboard)/tools/[id]/page.tsx`): 
  - ✅ תצוגה מפורטת עם טאבים מחוברת לנתונים אמיתיים
  - ✅ מצב טעינה ו-Error handling

### 5. API Routes - ✅ מחובר לנתונים אמיתיים
- ✅ **Tools API** (`src/app/api/tools/route.ts`):
  - GET: קבלת כלים עם סינון
  - POST: יצירת כלי חדש
  - אינטגרציה עם Clerk authentication
- ✅ **Single Tool API** (`src/app/api/tools/[id]/route.ts`):
  - GET: קבלת פרטי כלי בודד
- ✅ **Seed API** (`src/app/api/seed/route.ts`):
  - GET: אתחול מסד הנתונים עם נתונים ראשוניים

### 6. אתחול מסד הנתונים ✅
- ✅ **סקריפט אתחול** (`src/scripts/seed-database.ts`):
  - 5 כלים ראשוניים: ChatGPT, Canva AI, Kahoot AI, Grammarly, Quizlet AI
  - נתונים מפורטים עם יתרונות, חסרונות, מגבלות
- ✅ **API route לאתחול** (`/api/seed`):
  - ניתן להריץ דרך הדפדפן
  - בדיקה אם כבר יש נתונים
- ✅ **כפתור אתחול בדאשבורד**:
  - ממשק ידידותי לאתחול
  - הודעות משוב למשתמש

### 7. תיקוני Build ו-Deploy
- ✅ תיקון שגיאות TypeScript (any types, unused variables)
- ✅ תיקון שגיאות ESLint (unescaped entities, unused imports)
- ✅ אופטימיזציה לפריסה ב-Vercel
- ✅ פריסה מוצלחת

## מה בהמשך 🚧

### 1. תכונות חסרות
- 🔄 מערכת דירוגים אינטראקטיבית
- 🔄 מערכת ביקורות ותגובות
- 🔄 מדפים אישיים (Shelves) - CRUD מלא
- 🔄 מערכת חיפוש מתקדמת
- 🔄 העלאת קבצים (לוגואים, קבצי הדרכה)
- 🔄 מערכת התראות
- 🔄 פרופיל משתמש

### 2. API Routes נוספים
- 🔄 `/api/tutorials` (GET, POST)
- 🔄 `/api/examples` (GET, POST)
- 🔄 `/api/shelves` (GET, POST, PUT, DELETE)
- 🔄 `/api/tools/[id]` (PUT, DELETE)

### 3. שיפורי UX/UI
- 🔄 אנימציות ומעברים
- 🔄 מצב כהה/בהיר
- 🔄 נגישות מתקדמת
- 🔄 אופטימיזציה למובייל
- 🔄 RTL optimization מתקדם

### 4. תכונות מתקדמות
- 🔄 מערכת המלצות (AI-powered)
- 🔄 אנליטיקס ודוחות
- 🔄 ייצוא/ייבוא נתונים
- 🔄 API ציבורי
- 🔄 אינטגרציות חיצוניות

## מבנה הפרויקט
```
src/
├── app/
│   ├── (dashboard)/
│   │   ├── dashboard/page.tsx (✅ עם אתחול DB)
│   │   └── tools/
│   │       ├── page.tsx (✅ נתונים אמיתיים)
│   │       ├── new/page.tsx (✅ מחובר ל-API)
│   │       └── [id]/page.tsx (✅ נתונים אמיתיים)
│   ├── api/
│   │   ├── tools/
│   │   │   ├── route.ts (✅ GET, POST)
│   │   │   └── [id]/route.ts (✅ GET)
│   │   └── seed/route.ts (✅ אתחול DB)
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── ui/ (shadcn components)
│   └── layout/
├── lib/
│   ├── mongodb.ts (✅ מחובר)
│   └── utils.ts
├── models/
│   ├── Tool.ts (✅ מוגדר)
│   ├── Tutorial.ts
│   ├── Example.ts
│   └── Shelf.ts
├── scripts/
│   └── seed-database.ts (✅ נוצר)
└── middleware.ts
```

## משתני סביבה נדרשים
```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
MONGODB_URI=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
```

## חבילות מותקנות
```json
{
  "@clerk/nextjs": "latest",
  "@radix-ui/react-select": "latest",
  "@radix-ui/react-checkbox": "latest",
  "@radix-ui/react-label": "latest",
  "@radix-ui/react-tabs": "latest",
  "class-variance-authority": "latest",
  "mongoose": "latest",
  "lucide-react": "latest",
  "tsx": "latest" // ✅ נוסף לסקריפטים
}
```

## נתונים ראשוניים במסד הנתונים ✅
- **ChatGPT**: מודל שפה מתקדם לכתיבה ותכנון שיעורים
- **Canva AI**: עיצוב גרפי ליצירת חומרי לימוד ויזואליים
- **Kahoot AI**: יצירת חידונים אינטראקטיביים
- **Grammarly**: בדיקה ושיפור כתיבה באנגלית
- **Quizlet AI**: יצירת כרטיסיות לימוד ומשחקי זיכרון

כל כלי כולל:
- תיאור מפורט
- יתרונות וחסרונות
- מגבלות
- שימוש בהוראה
- דירוג
- תגיות ומאפיינים

## הערות חשובות
- הפרויקט מוגדר לעברית (RTL)
- כל הטקסטים בעברית
- אינטגרציה מלאה עם Clerk לאימות
- MongoDB מוכן לשימוש עם נתונים אמיתיים ✅
- shadcn/ui components מותאמים
- דחף שינויים לGIT 

## איך להתחיל עם מסד הנתונים
1. וודא שמשתני הסביבה מוגדרים ב-.env.local
2. היכנס לדאשבורד
3. לחץ על "אתחל מסד נתונים"
4. או גש ל-`/api/seed` ישירות בדפדפן

## קישורים חשובים
- **GitHub**: chepti@gmail.com
- **Vercel**: פרוס בהצלחה
- **MongoDB Atlas**: מחובר ומוגדר
- **Clerk Dashboard**: מוגדר לפרויקט

---
**עדכון אחרון**: חיבור נתונים אמיתיים ואתחול מסד הנתונים הושלם בהצלחה ✅ 