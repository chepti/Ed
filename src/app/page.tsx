import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, Brain, Search, Users, BookOpen, Star, Sparkles } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      {/* Hero Section */}
      <section className="w-full max-w-5xl mx-auto text-center mb-16 animate-fadeIn">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-blue-500 to-purple-600 bg-clip-text text-transparent">
          חולמים תקשוב
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
          פלטפורמה חדשנית למורים לגילוי, דירוג ושיתוף כלי בינה מלאכותית מתאימים לחינוך
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            asChild
            size="lg"
            className="bg-purple-600 hover:bg-purple-700 animate-slideInUp"
            style={{ animationDelay: '0.1s' }}
          >
            <Link href="/dashboard">
              התחילו לחקור <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button 
            variant="outline" 
            asChild
            size="lg"
            className="animate-slideInUp"
            style={{ animationDelay: '0.2s' }}
          >
            <Link href="/sign-up">הצטרפו אלינו</Link>
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full max-w-5xl mx-auto mb-16">
        <h2 className="text-3xl font-bold text-center mb-12">מה תמצאו בפלטפורמה</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={feature.title} 
              className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-100 dark:border-gray-700 transform transition-all duration-300 hover:scale-105 animate-fadeIn"
              style={{ animationDelay: `${0.1 + index * 0.1}s` }}
            >
              <div className="flex items-center mb-4">
                <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-full mr-4">
                  <feature.icon className="h-6 w-6 text-purple-600 dark:text-purple-300" />
                </div>
                <h3 className="text-xl font-semibold">{feature.title}</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="w-full max-w-5xl mx-auto text-center bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-10 text-white mb-16 animate-fadeIn">
        <h2 className="text-3xl font-bold mb-4">מוכנים להפוך את החינוך עם AI?</h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto">
          הצטרפו לקהילת המורים החדשנים שמגלים ומשתפים את הכלים הטובים ביותר של בינה מלאכותית לחינוך
        </p>
        <Button 
          asChild
          size="lg" 
          variant="outline" 
          className="bg-white text-purple-600 hover:bg-gray-100"
        >
          <Link href="/dashboard">
            התחילו עכשיו <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </section>

      {/* Branding */}
      <section className="w-full max-w-3xl mx-auto text-center mb-8 animate-fadeIn">
        <p className="text-xl font-semibold bg-gradient-to-r from-purple-600 via-blue-500 to-purple-600 bg-clip-text text-transparent mb-2">
          חפציה בן ארצי | חולמים תקשוב
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          חולמים עתיד חינוכי טוב יותר עם כלי בינה מלאכותית
        </p>
      </section>
    </div>
  );
}

const features = [
  {
    title: 'חיפוש וגילוי כלים',
    description: 'מנוע חיפוש מתקדם לאיתור כלי AI מתאימים לכל צורך חינוכי עם מסננים מתקדמים.',
    icon: Search,
  },
  {
    title: 'דירוגים וביקורות',
    description: 'קראו ביקורות מפורטות ממורים אחרים, צפו ביתרונות וחסרונות של כל כלי.',
    icon: Star,
  },
  {
    title: 'הדרכות ודוגמאות',
    description: 'מאגר עשיר של הדרכות מעשיות ודוגמאות לשימוש בכל כלי ברמות שונות.',
    icon: BookOpen,
  },
  {
    title: 'מדפים אישיים',
    description: 'ארגנו את הכלים במדפים נושאיים וגלו חיבורים בין כלים שונים.',
    icon: Brain,
  },
  {
    title: 'קהילת מורים',
    description: 'שתפו ניסיון, הוסיפו תוכן חדש והיו חלק מקהילה שיתופית של מחנכים.',
    icon: Users,
  },
  {
    title: 'חדשנות בחינוך',
    description: 'עקבו אחר החידושים החדשים בעולם ה-AI החינוכי ובנו את העתיד יחד.',
    icon: Sparkles,
  },
];
