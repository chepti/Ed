'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ArrowLeft,
  ExternalLink,
  Star,
  Heart,
  BookOpen,
  PlayCircle,
  Plus,
  Tag,
  Users,
  Calendar
} from 'lucide-react';
import Link from 'next/link';

// Mock data - בהמשך נחליף לנתונים אמיתיים
const mockTool = {
  _id: '1',
  name: 'ChatGPT',
  link: 'https://chat.openai.com',
  logo: '🤖',
  description: 'מודל שפה מתקדם לכתיבה, תכנון שיעורים ויצירת תוכן חינוכי. הכלי מאפשר למורים ליצור חומרי לימוד, לתכנן שיעורים, לכתוב שאלות בחינות ועוד.',
  limitations: 'מוגבל לנתונים עד אפריל 2023, לא תמיד מדויק במידע עובדתי, דורש בדיקה של התוכן שנוצר',
  advantages: 'קל לשימוש, תוצאות איכותיות, חסכון בזמן, יכולת התאמה לסגנון כתיבה שונה',
  disadvantages: 'דורש מנוי בגרסה המתקדמת, לא תמיד מבין הקשר ישראלי, יכול ליצור תוכן לא מדויק',
  toolRating: 4.5,
  usageInTeaching: 'יצירת תכניות שיעור, כתיבת שאלות לבחינות, הכנת חומרי העשרה, תרגום טקסטים, יצירת רעיונות לפעילויות',
  difficultyLevel: 'בינוני',
  hebrewSupport: true,
  isFree: false,
  outputType: 'טקסט',
  pedagogicalContext: ['הקניה', 'תרגול'],
  communicationFormat: 'צ\'אט אינטראקטיבי',
  tags: ['כתיבה', 'תכנון שיעורים', 'שאלות', 'תרגום', 'רעיונות'],
  createdAt: '2024-01-15',
  createdBy: { name: 'דר\' שרה כהן', email: 'sarah@example.com' }
};

const mockTutorials = [
  {
    _id: '1',
    title: 'מדריך למתחילים - ChatGPT בחינוך',
    format: 'וידאו',
    link: 'https://youtube.com/watch?v=example',
    credit: 'משרד החינוך',
    rating: 4.8,
    additionalInfo: 'מדריך מקיף בן 30 דקות'
  },
  {
    _id: '2',
    title: 'פרומפטים יעילים לכתיבת שאלות',
    format: 'PDF',
    link: 'https://example.com/prompts.pdf',
    credit: 'ד"ר מיכל לוי',
    rating: 4.6,
    additionalInfo: 'אוסף של 50 פרומפטים מוכנים'
  }
];

const mockExamples = [
  {
    _id: '1',
    title: 'יצירת תכנית שיעור בביולוגיה',
    description: 'דוגמה ליצירת תכנית שיעור מפורטת על נושא הפוטוסינתזה',
    prompt: 'צור תכנית שיעור בת 45 דקות על נושא הפוטוסינתזה לכיתה ט. כלול מטרות, פעילויות ודרכי הערכה.',
    credit: 'מורה ביולוגיה - תיכון הרצל',
    rating: 4.7,
    productLink: 'https://example.com/lesson-plan'
  },
  {
    _id: '2',
    title: 'שאלות לבחינה במתמטיקה',
    description: 'יצירת שאלות מגוונות לבחינה בנושא משוואות ריבועיות',
    prompt: 'כתב 10 שאלות מגוונות (קלות, בינוניות וקשות) על משוואות ריבועיות לכיתה י. כלול פתרונות מפורטים.',
    credit: 'מורה מתמטיקה - תיכון אלון',
    rating: 4.5
  }
];

export default function ToolDetailPage() {
  const params = useParams();
  const [activeTab, setActiveTab] = useState('overview');
  const [tool, setTool] = useState(mockTool);
  const [tutorials, setTutorials] = useState(mockTutorials);
  const [examples, setExamples] = useState(mockExamples);

  return (
    <div className="py-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <Button variant="outline" asChild>
            <Link href="/tools">
              <ArrowLeft className="h-4 w-4 mr-2" />
              חזרה לכלים
            </Link>
          </Button>
        </div>
        
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <span className="text-4xl">{tool.logo}</span>
            <div>
              <h1 className="text-3xl font-bold mb-2">{tool.name}</h1>
              <div className="flex items-center gap-4 mb-2">
                <div className="flex items-center gap-1">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{tool.toolRating}</span>
                </div>
                <Badge variant="outline">{tool.difficultyLevel}</Badge>
                {tool.hebrewSupport && <Badge variant="secondary">עברית</Badge>}
                {tool.isFree && <Badge variant="secondary">חינמי</Badge>}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar className="h-4 w-4" />
                <span>נוצר ב-{new Date(tool.createdAt).toLocaleDateString('he-IL')}</span>
                <span>•</span>
                <Users className="h-4 w-4" />
                <span>על ידי {tool.createdBy.name}</span>
              </div>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button asChild>
              <a href={tool.link} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4 mr-2" />
                פתח כלי
              </a>
            </Button>
            <Button variant="outline">
              <Heart className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">סקירה</TabsTrigger>
          <TabsTrigger value="tutorials">הדרכות ({tutorials.length})</TabsTrigger>
          <TabsTrigger value="examples">דוגמאות ({examples.length})</TabsTrigger>
          <TabsTrigger value="reviews">ביקורות</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              {/* Description */}
              <Card>
                <CardHeader>
                  <CardTitle>תיאור הכלי</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {tool.description}
                  </p>
                </CardContent>
              </Card>

              {/* Usage in Teaching */}
              <Card>
                <CardHeader>
                  <CardTitle>שימוש בהוראה</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {tool.usageInTeaching}
                  </p>
                </CardContent>
              </Card>

              {/* Pros and Cons */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-green-600">יתרונות</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 dark:text-gray-300">
                      {tool.advantages}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-red-600">חסרונות</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 dark:text-gray-300">
                      {tool.disadvantages}
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Limitations */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-orange-600">מגבלות</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 dark:text-gray-300">
                    {tool.limitations}
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Tool Properties */}
              <Card>
                <CardHeader>
                  <CardTitle>מאפיינים</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <span className="font-medium">סוג תוצר:</span>
                    <span className="ml-2">{tool.outputType}</span>
                  </div>
                  <div>
                    <span className="font-medium">פורמט תקשורת:</span>
                    <span className="ml-2">{tool.communicationFormat}</span>
                  </div>
                  <div>
                    <span className="font-medium">הקשר פדגוגי:</span>
                    <div className="flex gap-1 mt-1">
                      {tool.pedagogicalContext.map((context) => (
                        <Badge key={context} variant="default" className="text-xs">
                          {context}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Tags */}
              <Card>
                <CardHeader>
                  <CardTitle>תגיות</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {tool.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        <Tag className="h-3 w-3 mr-1" />
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Tutorials Tab */}
        <TabsContent value="tutorials" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">הדרכות</h2>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              הוסף הדרכה
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tutorials.map((tutorial) => (
              <Card key={tutorial._id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{tutorial.title}</CardTitle>
                      <CardDescription>על ידי {tutorial.credit}</CardDescription>
                    </div>
                    <Badge variant="outline">{tutorial.format}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 mb-3">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{tutorial.rating}</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">{tutorial.additionalInfo}</p>
                  <Button asChild size="sm" className="w-full">
                    <a href={tutorial.link} target="_blank" rel="noopener noreferrer">
                      <BookOpen className="h-4 w-4 mr-2" />
                      צפה בהדרכה
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Examples Tab */}
        <TabsContent value="examples" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">דוגמאות ופרומפטים</h2>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              הוסף דוגמה
            </Button>
          </div>
          
          <div className="space-y-6">
            {examples.map((example) => (
              <Card key={example._id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{example.title}</CardTitle>
                      <CardDescription>על ידי {example.credit}</CardDescription>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{example.rating}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    {example.description}
                  </p>
                  
                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mb-4">
                    <h4 className="font-medium mb-2">הפרומפט:</h4>
                    <p className="text-sm font-mono text-gray-600 dark:text-gray-400">
                      {example.prompt}
                    </p>
                  </div>
                  
                  <div className="flex gap-2">
                    {example.productLink && (
                      <Button asChild size="sm" variant="outline">
                        <a href={example.productLink} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          צפה בתוצר
                        </a>
                      </Button>
                    )}
                    <Button size="sm" variant="outline">
                      העתק פרומפט
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Reviews Tab */}
        <TabsContent value="reviews" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">ביקורות ודירוגים</h2>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              הוסף ביקורת
            </Button>
          </div>
          
          <div className="text-center py-12">
            <p className="text-gray-500">ביקורות יתווספו בהמשך...</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
} 