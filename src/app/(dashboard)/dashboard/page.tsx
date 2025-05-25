'use client';

import { useState } from 'react';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { ChevronsUp, Mail, Search, BookOpen, Star, Brain, Users, Sparkles, Database, Loader2 } from 'lucide-react';
import { useUser } from '@clerk/nextjs';

export default function DashboardPage() {
  const { user } = useUser();
  const [isSeeding, setIsSeeding] = useState(false);
  const [seedResult, setSeedResult] = useState<string | null>(null);

  const handleSeedDatabase = async () => {
    setIsSeeding(true);
    setSeedResult(null);
    
    try {
      const response = await fetch('/api/seed');
      const data = await response.json();
      
      if (response.ok) {
        setSeedResult(data.message);
      } else {
        setSeedResult(`שגיאה: ${data.error}`);
      }
    } catch (error) {
      setSeedResult('שגיאה בחיבור לשרת');
    } finally {
      setIsSeeding(false);
    }
  };

  if (!user) {
    return <div>טוען...</div>;
  }

  return (
    <div className="py-10 animate-fadeIn glass-blur-gradient">
      {/* Database Seed Section */}
      <Card className="mb-8 border-blue-200 bg-blue-50 dark:border-blue-900 dark:bg-blue-950/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5 text-blue-600" />
            אתחול מסד הנתונים
          </CardTitle>
          <CardDescription>
            אם זו הפעם הראשונה שלכם כאן, לחצו כדי לאתחל את מסד הנתונים עם כלים ראשוניים
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 items-center">
            <Button 
              onClick={handleSeedDatabase} 
              disabled={isSeeding}
              variant="outline"
            >
              {isSeeding ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  מאתחל...
                </>
              ) : (
                <>
                  <Database className="h-4 w-4 mr-2" />
                  אתחל מסד נתונים
                </>
              )}
            </Button>
            {seedResult && (
              <div className={`text-sm ${seedResult.includes('שגיאה') ? 'text-red-600' : 'text-green-600'}`}>
                {seedResult}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Dashboard Banner */}
      <div className="animated-banner mb-8 rounded-md shadow-lg overflow-hidden">
        <div className="px-4 py-5 sm:px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Sparkles className="h-5 w-5 text-white animate-pulse" />
            <h2 className="text-lg font-semibold text-white">ברוכים הבאים למאגר הכלים</h2>
            <Sparkles className="h-5 w-5 text-white animate-pulse" />
          </div>
          <span className="text-xs text-white opacity-80">{new Date().toLocaleDateString()}</span>
        </div>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 glass-headline">ברוך הבא, {user.firstName || 'משתמש'}!</h1>
        <p className="text-gray-500 dark:text-gray-400">מרחב העבודה האישי שלך ב&quot;חולמים תקשוב&quot;</p>
      </div>
      
      {/* Welcome Alert */}
      <Alert className="mb-8 border-purple-200 bg-purple-50 dark:border-purple-900 dark:bg-purple-950/50 glass-shimmer">
        <ChevronsUp className="h-4 w-4 text-purple-600 dark:text-purple-400" />
        <AlertTitle className="glass-headline">חולמים תקשוב | מגלים ויוצרים עם AI</AlertTitle>
        <AlertDescription>
          זהו אזור אישי למורים רשומים. כאן תוכלו לגלות, לדרג ולהוסיף כלי AI, דוגמאות והדרכות, וליצור מדפים אישיים.
        </AlertDescription>
      </Alert>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card className="transform transition-all duration-300 hover:shadow-lg animate-slideInUp glass-shimmer" style={{ animationDelay: '0.1s' }}>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5 text-purple-600" /> <span className="glass-headline">חיפוש וגילוי כלים</span>
            </CardTitle>
            <CardDescription>איתור כלי AI מתאימים לצרכים שלכם</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>חיפוש לפי נושא, רמת קושי וחינמיות</li>
              <li>סינון לפי הקשר פדגוגי (הקניה, תרגול, הערכה)</li>
              <li>מציאת כלים התומכים בעברית</li>
              <li>חיפוש לפי סוג התוצר הרצוי</li>
              <li>גילוי כלים מומלצים לפי דירוגים</li>
            </ul>
          </CardContent>
        </Card>
        
        <Card className="transform transition-all duration-300 hover:shadow-lg animate-slideInUp glass-shimmer" style={{ animationDelay: '0.2s' }}>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-purple-600" /> <span className="glass-headline">הדרכות ודוגמאות</span>
            </CardTitle>
            <CardDescription>מאגר עשיר של תוכן לימודי</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>הדרכות מפורטות לכל כלי</li>
              <li>דוגמאות מעשיות ופרומפטים</li>
              <li>וידאו הדרכות וטקסטים</li>
              <li>רמות קושי שונות למתחילים ומתקדמים</li>
              <li>הוספת הדרכות ודוגמאות משלכם</li>
              <li>דירוג התוכן הלימודי</li>
            </ul>
          </CardContent>
        </Card>
        
        <Card className="transform transition-all duration-300 hover:shadow-lg animate-slideInUp glass-shimmer" style={{ animationDelay: '0.3s' }}>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5 text-purple-600" /> <span className="glass-headline">דירוגים וביקורות</span>
            </CardTitle>
            <CardDescription>שיתוף חוויות וחוות דעת</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>דירוג כלים על בסיס הניסיון שלכם</li>
              <li>צפייה ביתרונות וחסרונות של כל כלי</li>
              <li>הבנת מגבלות הכלים השונים</li>
              <li>קריאת ביקורות ממורים אחרים</li>
              <li>הוספת חוות דעת אישיות</li>
              <li>דירוג הדרכות ודוגמאות</li>
            </ul>
          </CardContent>
        </Card>
        
        <Card className="transform transition-all duration-300 hover:shadow-lg animate-slideInUp glass-shimmer" style={{ animationDelay: '0.4s' }}>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-purple-600" /> <span className="glass-headline">מדפים אישיים</span>
            </CardTitle>
            <CardDescription>ארגון כלים לפי העדפות אישיות</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>יצירת מדפים נושאיים (חינוך מיוחד, העשרה וכו&apos;)</li>
              <li>קיבוץ כלים לפי שימושים אישיים</li>
              <li>שיתוף מדפים עם מורים אחרים</li>
              <li>גילוי קשרים בין כלים שונים</li>
              <li>מציאת כלים חדשים דרך מדפים של אחרים</li>
            </ul>
          </CardContent>
        </Card>
        
        <Card className="transform transition-all duration-300 hover:shadow-lg animate-slideInUp glass-shimmer" style={{ animationDelay: '0.5s' }}>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-purple-600" /> <span className="glass-headline">קהילת מורים</span>
            </CardTitle>
            <CardDescription>שיתוף פעולה ולמידה הדדית</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>שיתוף ניסיון עם מורים אחרים</li>
              <li>הוספת תוכן חדש למאגר</li>
              <li>למידה מהניסיון של קולגות</li>
              <li>בניית רשת מקצועית</li>
              <li>עזרה הדדית ותמיכה</li>
              <li>קבלת עדכונים על כלים חדשים</li>
            </ul>
          </CardContent>
        </Card>
      </div>
      
      {/* Next Steps */}
      <h2 className="text-2xl font-bold mb-4 glass-headline">השלבים הבאים</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card className="transform transition-all duration-300 hover:shadow-lg animate-slideInUp glass-shimmer" style={{ animationDelay: '0.6s' }}>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5" /> <span className="glass-headline">התחלת השימוש</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li>🔍 חפשו כלי AI הראשון שלכם</li>
              <li>📚 צפו בהדרכות ובדוגמאות</li>
              <li>⭐ דרגו את הכלים שניסיתם</li>
              <li>📝 הוסיפו דוגמאות משלכם</li>
              <li>📂 צרו את המדף הראשון שלכם</li>
              <li>🤝 התחברו עם מורים אחרים</li>
            </ul>
          </CardContent>
        </Card>
        
        <Card className="transform transition-all duration-300 hover:shadow-lg animate-slideInUp glass-shimmer" style={{ animationDelay: '0.7s' }}>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" /> <span className="glass-headline">יצירת קשר</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">יש לכם שאלות, הצעות או רוצים לשתף פעולה?</p>
            <p className="glass-headline font-semibold">
              חפציה בן ארצי - חולמים תקשוב
            </p>
            <p className="mt-2">
              <a href="mailto:chepti@gmail.com" className="text-blue-500 hover:underline">
                chepti@gmail.com
              </a>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 