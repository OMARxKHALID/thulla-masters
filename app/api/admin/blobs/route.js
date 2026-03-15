import { list, del } from '@vercel/blob';
import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
import { cookies } from 'next/headers';

const JWT_SECRET = process.env.JWT_SECRET || "thulla-masters-secret-key-123";
const secret = new TextEncoder().encode(JWT_SECRET);

async function verifyAdmin() {
  const token = (await cookies()).get("token")?.value;
  if (!token) throw new Error('Unauthorized');
  
  const { payload } = await jwtVerify(token, secret);
  if (payload.role !== 'admin') throw new Error('Unauthorized');
  
  return payload;
}

export async function GET() {
  try {
    await verifyAdmin();
    const { blobs } = await list();
    
    // Calculate storage quota
    const totalBytes = blobs.reduce((acc, blob) => acc + blob.size, 0);
    const limitBytes = 100 * 1024 * 1024; // 100MB typical hobby limit
    const quota = {
      used: totalBytes,
      limit: limitBytes,
      percentage: Math.min(Math.round((totalBytes / limitBytes) * 100), 100),
      count: blobs.length
    };

    return NextResponse.json({ blobs, quota });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 401 });
  }
}

export async function DELETE(request) {
  try {
    await verifyAdmin();
    const { url } = await request.json();
    if (!url) return NextResponse.json({ error: 'URL is required' }, { status: 400 });

    await del(url);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 401 });
  }
}
