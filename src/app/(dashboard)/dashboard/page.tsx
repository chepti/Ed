import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ChevronsUp, Mail, Github, MessagesSquare, ShieldCheck, Sparkles } from 'lucide-react';

export default async function DashboardPage() {
  const user = await currentUser();
  
  if (!user) {
    redirect('/sign-in');
  }

  return (
    <div className="py-10 animate-fadeIn glass-blur-gradient">
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
              <Sparkles className="h-5 w-5 text-purple-600" /> <span className="glass-headline">תכונות עיקריות</span>
            </CardTitle>
            <CardDescription>מה תמצאו בפלטפורמה</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>חיפוש וסינון כלי AI</li>
              <li>צפייה בתיאור, יתרונות וחסרונות</li>
              <li>הוספת דירוגים, הדרכות ודוגמאות</li>
              <li>יצירת &quot;מדפים&quot; אישיים של כלים</li>
              <li>קהילה שיתופית של מורים</li>
              <li>עיצוב נגיש ומותאם למובייל</li>
              <li>אימות משתמשים מאובטח</li>
            </ul>
          </CardContent>
        </Card>
        
        <Card className="transform transition-all duration-300 hover:shadow-lg animate-slideInUp glass-shimmer" style={{ animationDelay: '0.2s' }}>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-purple-600" /> <span className="glass-headline">Security</span>
            </CardTitle>
            <CardDescription>Built-in security features</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>CSRF Protection</li>
              <li>XSS Prevention</li>
              <li>Secure HTTP Headers</li>
              <li>Rate Limiting</li>
              <li>Input Validation</li>
              <li>Secure Authentication</li>
              <li>Content Security Policy</li>
            </ul>
          </CardContent>
        </Card>
        
        <Card className="transform transition-all duration-300 hover:shadow-lg animate-slideInUp glass-shimmer" style={{ animationDelay: '0.3s' }}>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <MessagesSquare className="h-5 w-5 text-purple-600" /> <span className="glass-headline">Getting Started</span>
            </CardTitle>
            <CardDescription>Next steps for your project</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>Customize this boilerplate</li>
              <li>Create new pages and components</li>
              <li>Set up your MongoDB database</li>
              <li>Configure Clerk webhooks</li>
              <li>Add custom data models</li>
              <li>Implement business logic</li>
              <li>Deploy to production</li>
            </ul>
          </CardContent>
        </Card>
      </div>
      
      {/* Resources */}
      <h2 className="text-2xl font-bold mb-4 glass-headline">Helpful Resources</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card className="transform transition-all duration-300 hover:shadow-lg animate-slideInUp glass-shimmer" style={{ animationDelay: '0.4s' }}>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <Github className="h-5 w-5" /> <span className="glass-headline">GitHub Resources</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li>
                <a 
                  href="https://github.com/shadcn/ui" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline flex items-center gap-1"
                >
                  shadcn/ui Components 
                  <svg className="h-3 w-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </li>
              <li>
                <a 
                  href="https://github.com/tailwindlabs/tailwindcss" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline flex items-center gap-1"
                >
                  Tailwind CSS 
                  <svg className="h-3 w-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </li>
              <li>
                <a 
                  href="https://github.com/vercel/next.js" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline flex items-center gap-1"
                >
                  Next.js 
                  <svg className="h-3 w-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </li>
            </ul>
          </CardContent>
        </Card>
        
        <Card className="transform transition-all duration-300 hover:shadow-lg animate-slideInUp glass-shimmer" style={{ animationDelay: '0.5s' }}>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" /> <span className="glass-headline">יצירת קשר</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">יש לכם שאלות, הצעות או רוצים לשתף פעולה?</p>
            <p className="glass-headline font-semibold">
              צוות חולמים תקשוב
            </p>
            <p className="mt-2">
              <a href="mailto:info@holmimtikshuv.example.com" className="text-blue-500 hover:underline">
                info@holmimtikshuv.example.com
              </a>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 