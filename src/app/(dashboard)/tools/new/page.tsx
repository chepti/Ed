'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { 
  Save, 
  ArrowLeft,
  Plus,
  X
} from 'lucide-react';
import Link from 'next/link';

export default function NewToolPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    link: '',
    logo: '',
    description: '',
    limitations: '',
    advantages: '',
    disadvantages: '',
    usageInTeaching: '',
    difficultyLevel: 'בינוני',
    hebrewSupport: false,
    isFree: true,
    outputType: '',
    communicationFormat: '',
    tags: [] as string[],
    pedagogicalContext: [] as string[]
  });

  const [newTag, setNewTag] = useState('');

  const handleInputChange = (field: string, value: string | boolean | string[]) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const togglePedagogicalContext = (context: string) => {
    setFormData(prev => ({
      ...prev,
      pedagogicalContext: prev.pedagogicalContext.includes(context)
        ? prev.pedagogicalContext.filter(c => c !== context)
        : [...prev.pedagogicalContext, context]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // כאן נוסיף את הקריאה ל-API להוספת הכלי
      console.log('Submitting tool:', formData);
      
      // זמנית - נחזור לדף הכלים
      router.push('/tools');
    } catch (error) {
      console.error('Error submitting tool:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-6 max-w-4xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <Button variant="outline" asChild>
            <Link href="/tools">
              <ArrowLeft className="h-4 w-4 mr-2" />
              חזרה לכלים
            </Link>
          </Button>
        </div>
        <h1 className="text-3xl font-bold mb-2">הוספת כלי AI חדש</h1>
        <p className="text-gray-600 dark:text-gray-400">
          הוסיפו כלי בינה מלאכותית חדש למאגר
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>מידע בסיסי</CardTitle>
              <CardDescription>פרטים כלליים על הכלי</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">שם הכלי *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('name', e.target.value)}
                    placeholder="לדוגמה: ChatGPT"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="link">קישור לכלי *</Label>
                  <Input
                    id="link"
                    type="url"
                    value={formData.link}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('link', e.target.value)}
                    placeholder="https://..."
                    required
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="logo">לוגו/אמוג&apos;י</Label>
                <Input
                  id="logo"
                  value={formData.logo}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('logo', e.target.value)}
                  placeholder="🤖"
                />
              </div>

              <div>
                <Label htmlFor="description">תיאור הכלי *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleInputChange('description', e.target.value)}
                  placeholder="תארו מה הכלי עושה ואיך הוא יכול לעזור למורים..."
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* Tool Properties */}
          <Card>
            <CardHeader>
              <CardTitle>מאפייני הכלי</CardTitle>
              <CardDescription>פרטים טכניים ופדגוגיים</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="difficulty">רמת קושי</Label>
                  <Select value={formData.difficultyLevel} onValueChange={(value) => handleInputChange('difficultyLevel', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="קל">קל</SelectItem>
                      <SelectItem value="בינוני">בינוני</SelectItem>
                      <SelectItem value="מתקדם">מתקדם</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="hebrew" 
                    checked={formData.hebrewSupport}
                    onCheckedChange={(checked: boolean) => handleInputChange('hebrewSupport', checked)}
                  />
                  <Label htmlFor="hebrew">תמיכה בעברית</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="free" 
                    checked={formData.isFree}
                    onCheckedChange={(checked: boolean) => handleInputChange('isFree', checked)}
                  />
                  <Label htmlFor="free">כלי חינמי</Label>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="outputType">סוג התוצר</Label>
                  <Input
                    id="outputType"
                    value={formData.outputType}
                    onChange={(e) => handleInputChange('outputType', e.target.value)}
                    placeholder="טקסט, תמונה, וידאו..."
                  />
                </div>
                <div>
                  <Label htmlFor="communicationFormat">פורמט תקשורת</Label>
                  <Input
                    id="communicationFormat"
                    value={formData.communicationFormat}
                    onChange={(e) => handleInputChange('communicationFormat', e.target.value)}
                    placeholder="צ&apos;אט, טופס, API..."
                  />
                </div>
              </div>

              {/* Pedagogical Context */}
              <div>
                <Label>הקשר פדגוגי</Label>
                <div className="flex gap-2 mt-2">
                  {['הקניה', 'תרגול', 'הערכה'].map((context) => (
                    <div key={context} className="flex items-center space-x-2">
                      <Checkbox 
                        id={context}
                        checked={formData.pedagogicalContext.includes(context)}
                        onCheckedChange={() => togglePedagogicalContext(context)}
                      />
                      <Label htmlFor={context}>{context}</Label>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Evaluation */}
          <Card>
            <CardHeader>
              <CardTitle>הערכה</CardTitle>
              <CardDescription>יתרונות, חסרונות ומגבלות</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="advantages">יתרונות</Label>
                <Textarea
                  id="advantages"
                  value={formData.advantages}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleInputChange('advantages', e.target.value)}
                  placeholder="מה הם היתרונות העיקריים של הכלי?"
                />
              </div>

              <div>
                <Label htmlFor="disadvantages">חסרונות</Label>
                <Textarea
                  id="disadvantages"
                  value={formData.disadvantages}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleInputChange('disadvantages', e.target.value)}
                  placeholder="מה הם החסרונות או האתגרים?"
                />
              </div>

              <div>
                <Label htmlFor="limitations">מגבלות</Label>
                <Textarea
                  id="limitations"
                  value={formData.limitations}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleInputChange('limitations', e.target.value)}
                  placeholder="מה הן המגבלות הטכניות או התוכניות?"
                />
              </div>

              <div>
                <Label htmlFor="usageInTeaching">שימוש בהוראה</Label>
                <Textarea
                  id="usageInTeaching"
                  value={formData.usageInTeaching}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleInputChange('usageInTeaching', e.target.value)}
                  placeholder="איך אפשר להשתמש בכלי זה בהוראה?"
                />
              </div>
            </CardContent>
          </Card>

          {/* Tags */}
          <Card>
            <CardHeader>
              <CardTitle>תגיות</CardTitle>
              <CardDescription>הוסיפו תגיות לסיווג הכלי</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2 mb-4">
                <Input
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="הוסיפו תגית..."
                  onKeyPress={(e: React.KeyboardEvent) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                />
                <Button type="button" onClick={addTag} variant="outline">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {formData.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="ml-1 hover:text-red-500"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Submit */}
          <div className="flex gap-4">
            <Button type="submit" disabled={isSubmitting} className="flex-1">
              <Save className="h-4 w-4 mr-2" />
              {isSubmitting ? 'שומר...' : 'שמור כלי'}
            </Button>
            <Button type="button" variant="outline" asChild>
              <Link href="/tools">ביטול</Link>
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
} 