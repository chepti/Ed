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
  Plus,
  Tag,
  Users,
  Calendar,
  Loader2
} from 'lucide-react';
import Link from 'next/link';

interface Tool {
  _id: string;
  name: string;
  link?: string;
  logo?: string;
  description: string;
  limitations?: string;
  advantages?: string;
  disadvantages?: string;
  toolRating?: number;
  usageInTeaching?: string;
  difficultyLevel: string;
  hebrewSupport: boolean;
  isFree: boolean;
  outputType?: string;
  pedagogicalContext: string[];
  communicationFormat?: string;
  tags: string[];
  createdAt: string;
  createdBy: {
    name?: string;
    email?: string;
  };
}

// Mock data for tutorials and examples (will be replaced later)
const mockTutorials = [
  {
    _id: '1',
    title: 'מדריך למתחילים - שימוש בכלי',
    format: 'וידאו',
    link: 'https://youtube.com/watch?v=example',
    credit: 'משרד החינוך',
    rating: 4.8,
    additionalInfo: 'מדריך מקיף בן 30 דקות'
  }
];

const mockExamples = [
  {
    _id: '1',
    title: 'דוגמה לשימוש בכלי',
    description: 'דוגמה מעשית לשימוש בכלי בהוראה',
    prompt: 'דוגמה לפרומפט או הוראות שימוש',
    credit: 'מורה מנוסה',
    rating: 4.7
  }
];

export default function ToolDetailPage() {
  const params = useParams();
  const [tool, setTool] = useState<Tool | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const fetchTool = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/tools/${params.id}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch tool');
        }
        
        const data = await response.json();
        setTool(data);
      } catch (err) {
        setError('שגיאה בטעינת פרטי הכלי');
        console.error('Error fetching tool:', err);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchTool();
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className="py-6 max-w-6xl mx-auto">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
            <p>טוען פרטי כלי...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !tool) {
    return (
      <div className="py-6 max-w-6xl mx-auto">
        <div className="text-center py-12">
          <h3 className="text-xl font-semibold mb-2">שגיאה בטעינת הכלי</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {error || 'הכלי לא נמצא'}
          </p>
          <Button asChild>
            <Link href="/tools">חזרה לכלים</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <Button variant="outline" asChild>
            <Link href="/tools">
              חזרה לכלים
              <ArrowLeft className="h-4 w-4 mr-2" />
            </Link>
          </Button>
        </div>
        
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <span className="text-4xl">{tool.logo || '🤖'}</span>
            <div>
              <h1 className="text-3xl font-bold mb-2">{tool.name}</h1>
              <div className="flex items-center gap-4 mb-2">
                {tool.toolRating && (
                  <div className="flex items-center gap-1">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{tool.toolRating}</span>
                  </div>
                )}
                <Badge variant="outline">{tool.difficultyLevel}</Badge>
                {tool.hebrewSupport && <Badge variant="secondary">עברית</Badge>}
                {tool.isFree && <Badge variant="secondary">חינמי</Badge>}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar className="h-4 w-4" />
                <span>נוצר ב-{new Date(tool.createdAt).toLocaleDateString('he-IL')}</span>
                {tool.createdBy?.name && (
                  <>
                    <span>•</span>
                    <Users className="h-4 w-4" />
                    <span>על ידי {tool.createdBy.name}</span>
                  </>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex gap-2">
            {tool.link && (
              <Button asChild>
                <a href={tool.link} target="_blank" rel="noopener noreferrer">
                  פתח כלי
                  <ExternalLink className="h-4 w-4 mr-2" />
                </a>
              </Button>
            )}
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
          <TabsTrigger value="tutorials">הדרכות ({mockTutorials.length})</TabsTrigger>
          <TabsTrigger value="examples">דוגמאות ({mockExamples.length})</TabsTrigger>
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
              {tool.usageInTeaching && (
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
              )}

              {/* Pros and Cons */}
              {(tool.advantages || tool.disadvantages) && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {tool.advantages && (
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
                  )}

                  {tool.disadvantages && (
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
                  )}
                </div>
              )}

              {/* Limitations */}
              {tool.limitations && (
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
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Tool Properties */}
              <Card>
                <CardHeader>
                  <CardTitle>מאפייני הכלי</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <span className="font-medium">רמת קושי:</span>
                    <Badge variant="outline" className="ml-2">{tool.difficultyLevel}</Badge>
                  </div>
                  
                  {tool.outputType && (
                    <div>
                      <span className="font-medium">סוג תוצר:</span>
                      <span className="ml-2 text-gray-600">{tool.outputType}</span>
                    </div>
                  )}
                  
                  {tool.communicationFormat && (
                    <div>
                      <span className="font-medium">פורמט תקשורת:</span>
                      <span className="ml-2 text-gray-600">{tool.communicationFormat}</span>
                    </div>
                  )}
                  
                  <div>
                    <span className="font-medium">תמיכה בעברית:</span>
                    <Badge variant={tool.hebrewSupport ? "secondary" : "outline"} className="ml-2">
                      {tool.hebrewSupport ? "כן" : "לא"}
                    </Badge>
                  </div>
                  
                  <div>
                    <span className="font-medium">חינמי:</span>
                    <Badge variant={tool.isFree ? "secondary" : "outline"} className="ml-2">
                      {tool.isFree ? "כן" : "לא"}
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Pedagogical Context */}
              {tool.pedagogicalContext.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>הקשר פדגוגי</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {tool.pedagogicalContext.map((context) => (
                        <Badge key={context} variant="default">
                          {context}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Tags */}
              {tool.tags.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Tag className="h-4 w-4" />
                      תגיות
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {tool.tags.map((tag) => (
                        <Badge key={tag} variant="outline">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>

        {/* Tutorials Tab */}
        <TabsContent value="tutorials" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">הדרכות</h2>
            <Button>
              הוסף הדרכה
              <Plus className="h-4 w-4 mr-2" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mockTutorials.map((tutorial) => (
              <Card key={tutorial._id}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    {tutorial.title}
                  </CardTitle>
                  <CardDescription>
                    {tutorial.format} • {tutorial.credit}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm">{tutorial.rating}</span>
                    </div>
                    <Button size="sm" asChild>
                      <a href={tutorial.link} target="_blank" rel="noopener noreferrer">
                        צפה
                      </a>
                    </Button>
                  </div>
                  {tutorial.additionalInfo && (
                    <p className="text-sm text-gray-600 mt-2">{tutorial.additionalInfo}</p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Examples Tab */}
        <TabsContent value="examples" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">דוגמאות</h2>
            <Button>
              הוסף דוגמה
              <Plus className="h-4 w-4 mr-2" />
            </Button>
          </div>
          
          <div className="space-y-6">
            {mockExamples.map((example) => (
              <Card key={example._id}>
                <CardHeader>
                  <CardTitle>{example.title}</CardTitle>
                  <CardDescription>{example.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mb-4">
                    <h4 className="font-medium mb-2">פרומפט/הוראות:</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {example.prompt}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm">{example.rating}</span>
                      </div>
                      <span className="text-sm text-gray-600">{example.credit}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Reviews Tab */}
        <TabsContent value="reviews" className="space-y-6">
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold mb-2">ביקורות</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              תכונה זו תתווסף בקרוב
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
} 