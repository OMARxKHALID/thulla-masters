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
    return NextResponse.json(blobs);
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
