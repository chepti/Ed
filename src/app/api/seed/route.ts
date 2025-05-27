import { NextResponse } from 'next/server';

console.log('⚪️ [api/seed GLOBAL SCOPE] המודול נטען - בדיקה ראשונית ביותר');

export async function GET() {
  console.log('🔵 [api/seed GET] הפונקציה התחילה - בדיקה פשוטה');
  
  try {
    console.log('🟢 [api/seed GET] נכנס לבלוק try');
    // כל הלוגיקה המקורית מושבתת זמנית
    return NextResponse.json({
      message: 'בדיקת API פשוטה - הגעתי לכאן!',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('🔴 [api/seed GET] שגיאה בפונקציה הפשוטה (לא אמור לקרות):', error);
    return NextResponse.json({
      error: 'שגיאה בלתי צפויה בבדיקה הפשוטה',
      // @ts-expect-error
      details: error?.message || 'לא ידוע'
    }, { status: 500 });
  }
}

// המודלים והקוד של seedTools מושבתים זמנית
/*
import { connectToDatabase } from '@/lib/mongodb';
import Tool from '@/models/Tool';

const seedTools = [
  // ... נתונים ...
];
*/ 