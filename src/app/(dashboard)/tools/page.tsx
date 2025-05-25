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
  Tag,
  Heart,
  Plus,
  Loader2
} from 'lucide-react';
import Link from 'next/link';

interface Tool {
  _id: string;
  name: string;
  description: string;
  toolRating?: number;
  difficultyLevel: string;
  hebrewSupport: boolean;
  isFree: boolean;
  pedagogicalContext: string[];
  tags: string[];
  logo?: string;
  advantages?: string;
  disadvantages?: string;
  limitations?: string;
  link?: string;
}

export default function ToolsPage() {
  const [filteredTools, setFilteredTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [selectedContext, setSelectedContext] = useState('');
  const [hebrewOnly, setHebrewOnly] = useState(false);
  const [freeOnly, setFreeOnly] = useState(false);

  // Fetch tools from API
  useEffect(() => {
    const fetchTools = async () => {
      try {
        setLoading(true);
        const params = new URLSearchParams();
        
        if (searchQuery) params.append('search', searchQuery);
        if (selectedDifficulty) params.append('difficulty', selectedDifficulty);
        if (selectedContext) params.append('context', selectedContext);
        if (hebrewOnly) params.append('hebrewOnly', 'true');
        if (freeOnly) params.append('freeOnly', 'true');

        const response = await fetch(`/api/tools?${params.toString()}`);
        if (!response.ok) {
          throw new Error('Failed to fetch tools');
        }
        
        const data = await response.json();
        setFilteredTools(data);
      } catch (error) {
        console.error('Error fetching tools:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTools();
  }, [searchQuery, selectedDifficulty, selectedContext, hebrewOnly, freeOnly]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedDifficulty('');
    setSelectedContext('');
    setHebrewOnly(false);
    setFreeOnly(false);
  };

  if (loading) {
    return (
      <div className="py-6">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
            <p>טוען כלים...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-6">
      <div className="mb-8 flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold mb-2">מאגר כלי AI</h1>
          <p className="text-gray-600 dark:text-gray-400">
            גלו כלי בינה מלאכותית מתאימים לצרכים החינוכיים שלכם
          </p>
        </div>
        <Button asChild>
          <Link href="/tools/new">
            הוסף כלי חדש
            <Plus className="h-4 w-4 mr-2" />
          </Link>
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="mb-8 space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="חפשו כלים לפי שם, תיאור או תגיות..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pr-10"
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

      {/* Empty State */}
      {filteredTools.length === 0 && !loading && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold mb-2">לא נמצאו כלים</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            נסו לשנות את הסינון או להוסיף כלי חדש
          </p>
          <Button asChild>
            <Link href="/tools/new">הוסף כלי ראשון</Link>
          </Button>
        </div>
      )}

      {/* Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTools.map((tool) => (
          <Card key={tool._id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{tool.logo || '🤖'}</span>
                  <div>
                    <CardTitle className="text-lg">{tool.name}</CardTitle>
                    {tool.toolRating && (
                      <div className="flex items-center gap-1 mt-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm text-gray-600">{tool.toolRating}</span>
                      </div>
                    )}
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <Heart className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <CardDescription className="text-sm leading-relaxed">
                {tool.description}
              </CardDescription>

              {/* Properties */}
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">{tool.difficultyLevel}</Badge>
                {tool.hebrewSupport && <Badge variant="secondary">עברית</Badge>}
                {tool.isFree && <Badge variant="secondary">חינמי</Badge>}
              </div>

              {/* Pedagogical Context */}
              {tool.pedagogicalContext.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {tool.pedagogicalContext.map((context) => (
                    <Badge key={context} variant="outline" className="text-xs">
                      {context}
                    </Badge>
                  ))}
                </div>
              )}

              {/* Tags */}
              {tool.tags.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  <Tag className="h-3 w-3 text-gray-400 mt-1" />
                  {tool.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="text-xs text-gray-500">
                      {tag}
                    </span>
                  ))}
                  {tool.tags.length > 3 && (
                    <span className="text-xs text-gray-400">+{tool.tags.length - 3}</span>
                  )}
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <Button asChild size="sm" className="flex-1">
                  <Link href={`/tools/${tool._id}`}>
                    פרטים
                  </Link>
                </Button>
                {tool.link && (
                  <Button variant="outline" size="sm" asChild>
                    <a href={tool.link} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
} 