'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Search, 
  Filter, 
  Star, 
  ExternalLink, 
  BookOpen, 
  PlayCircle,
  Tag,
  Heart 
} from 'lucide-react';
import Link from 'next/link';

// Mock data - בהמשך נחליף לנתונים אמיתיים מ-MongoDB
const mockTools = [
  {
    _id: '1',
    name: 'ChatGPT',
    description: 'מודל שפה מתקדם לכתיבה, תכנון שיעורים ויצירת תוכן חינוכי',
    toolRating: 4.5,
    difficultyLevel: 'בינוני',
    hebrewSupport: true,
    isFree: false,
    pedagogicalContext: ['הקניה', 'תרגול'],
    tags: ['כתיבה', 'תכנון שיעורים', 'שאלות'],
    logo: '🤖',
    advantages: 'קל לשימוש, תוצאות איכותיות',
    disadvantages: 'דורש מנוי בגרסה המתקדמת',
    limitations: 'מוגבל לנתונים עד 2023'
  },
  {
    _id: '2',
    name: 'Canva AI',
    description: 'עיצוב גרפי אוטומטי ליצירת חומרי לימוד ויזואליים',
    toolRating: 4.2,
    difficultyLevel: 'קל',
    hebrewSupport: true,
    isFree: true,
    pedagogicalContext: ['הקניה'],
    tags: ['עיצוב', 'ויזואלי', 'פוסטרים'],
    logo: '🎨',
    advantages: 'ממשק ידידותי, תבניות רבות',
    disadvantages: 'אפשרויות מוגבלות בגרסה החינמית',
    limitations: 'דורש חיבור לאינטרנט'
  },
  {
    _id: '3',
    name: 'Kahoot AI',
    description: 'יצירת חידונים אינטראקטיביים עם בינה מלאכותית',
    toolRating: 4.7,
    difficultyLevel: 'קל',
    hebrewSupport: true,
    isFree: true,
    pedagogicalContext: ['תרגול', 'הערכה'],
    tags: ['חידונים', 'אינטראקטיבי', 'הערכה'],
    logo: '🎯',
    advantages: 'מעורר עניין, קל ליצירה',
    disadvantages: 'דורש מכשירים לתלמידים',
    limitations: 'מוגבל לפורמט שאלות סגורות'
  }
];

export default function ToolsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredTools, setFilteredTools] = useState(mockTools);
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [selectedContext, setSelectedContext] = useState('');
  const [hebrewOnly, setHebrewOnly] = useState(false);
  const [freeOnly, setFreeOnly] = useState(false);

  // Filter tools based on search and filters
  useEffect(() => {
    let filtered = mockTools.filter(tool => {
      const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          tool.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesDifficulty = !selectedDifficulty || tool.difficultyLevel === selectedDifficulty;
      const matchesContext = !selectedContext || tool.pedagogicalContext.includes(selectedContext as any);
      const matchesHebrew = !hebrewOnly || tool.hebrewSupport;
      const matchesFree = !freeOnly || tool.isFree;

      return matchesSearch && matchesDifficulty && matchesContext && matchesHebrew && matchesFree;
    });

    setFilteredTools(filtered);
  }, [searchQuery, selectedDifficulty, selectedContext, hebrewOnly, freeOnly]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedDifficulty('');
    setSelectedContext('');
    setHebrewOnly(false);
    setFreeOnly(false);
  };

  return (
    <div className="py-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">מאגר כלי AI</h1>
        <p className="text-gray-600 dark:text-gray-400">
          גלו כלי בינה מלאכותית מתאימים לצרכים החינוכיים שלכם
        </p>
      </div>

      {/* Search and Filters */}
      <div className="mb-8 space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="חפשו כלים לפי שם, תיאור או תגיות..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            <span className="font-medium">סינון:</span>
          </div>
          
          <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="רמת קושי" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="קל">קל</SelectItem>
              <SelectItem value="בינוני">בינוני</SelectItem>
              <SelectItem value="מתקדם">מתקדם</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedContext} onValueChange={setSelectedContext}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="הקשר פדגוגי" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="הקניה">הקניה</SelectItem>
              <SelectItem value="תרגול">תרגול</SelectItem>
              <SelectItem value="הערכה">הערכה</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex items-center space-x-2">
            <Checkbox 
              id="hebrew" 
              checked={hebrewOnly}
              onCheckedChange={(checked: boolean) => setHebrewOnly(checked)}
            />
            <label htmlFor="hebrew" className="text-sm">תמיכה בעברית</label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox 
              id="free" 
              checked={freeOnly}
              onCheckedChange={(checked: boolean) => setFreeOnly(checked)}
            />
            <label htmlFor="free" className="text-sm">חינמי</label>
          </div>

          <Button variant="outline" onClick={clearFilters} size="sm">
            נקה סינון
          </Button>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-6">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          נמצאו {filteredTools.length} כלים
        </p>
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTools.map((tool) => (
          <Card key={tool._id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{tool.logo}</span>
                  <div>
                    <CardTitle className="text-lg">{tool.name}</CardTitle>
                    <div className="flex items-center gap-1 mt-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{tool.toolRating}</span>
                      <Badge variant="outline" className="ml-2 text-xs">
                        {tool.difficultyLevel}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="flex gap-1">
                  {tool.hebrewSupport && (
                    <Badge variant="secondary" className="text-xs">עברית</Badge>
                  )}
                  {tool.isFree && (
                    <Badge variant="secondary" className="text-xs">חינמי</Badge>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="mb-4">
                {tool.description}
              </CardDescription>
              
              {/* Tags */}
              <div className="flex flex-wrap gap-1 mb-4">
                {tool.tags.slice(0, 3).map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    <Tag className="h-3 w-3 mr-1" />
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* Pedagogical Context */}
              <div className="mb-4">
                <p className="text-sm font-medium mb-1">הקשר פדגוגי:</p>
                <div className="flex gap-1">
                  {tool.pedagogicalContext.map((context) => (
                    <Badge key={context} variant="default" className="text-xs">
                      {context}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Advantages/Disadvantages Preview */}
              <div className="space-y-2 mb-4 text-sm">
                <div>
                  <span className="font-medium text-green-600">יתרונות: </span>
                  <span className="text-gray-600">{tool.advantages}</span>
                </div>
                <div>
                  <span className="font-medium text-red-600">חסרונות: </span>
                  <span className="text-gray-600">{tool.disadvantages}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <Button asChild size="sm" className="flex-1">
                  <Link href={`/tools/${tool._id}`}>
                    <ExternalLink className="h-4 w-4 mr-1" />
                    פרטים
                  </Link>
                </Button>
                <Button variant="outline" size="sm">
                  <Heart className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredTools.length === 0 && (
        <div className="text-center py-12">
          <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">לא נמצאו כלים</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            נסו לשנות את מונחי החיפוש או הסינון
          </p>
          <Button onClick={clearFilters}>נקה סינון</Button>
        </div>
      )}

      {/* Add New Tool Button */}
      <div className="fixed bottom-6 right-6">
        <Button asChild size="lg" className="rounded-full shadow-lg">
          <Link href="/tools/new">
            <span className="text-lg mr-2">+</span>
            הוסף כלי
          </Link>
        </Button>
      </div>
    </div>
  );
} 