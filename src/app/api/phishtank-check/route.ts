import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();
    
    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    // PhishTank API endpoint (no API key required)
    const phishtankUrl = 'http://checkurl.phishtank.com/checkurl/';
    
    const formData = new FormData();
    formData.append('url', url);
    formData.append('format', 'json');

    const response = await fetch(phishtankUrl, {
      method: 'POST',
      headers: {
        'User-Agent': 'phishtank/urlchecker', // Required by PhishTank
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`PhishTank API error: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
    
  } catch (error) {
    console.error('PhishTank API error:', error);
    return NextResponse.json(
      { error: 'Failed to check URL with PhishTank' }, 
      { status: 500 }
    );
  }
}
