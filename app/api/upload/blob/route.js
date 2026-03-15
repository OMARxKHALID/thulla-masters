import { handleUpload } from '@vercel/blob/client';
import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
import { cookies } from 'next/headers';

const JWT_SECRET = process.env.JWT_SECRET || "thulla-masters-secret-key-123";
const secret = new TextEncoder().encode(JWT_SECRET);

export async function POST(request) {
  const body = await request.json();

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname) => {
        // Authenticate the user
        const token = (await cookies()).get("token")?.value;
        if (!token) throw new Error('Not authenticated');

        try {
          const { payload } = await jwtVerify(token, secret);
          if (payload.role !== 'admin') {
            throw new Error('Unauthorized');
          }
        } catch (e) {
          throw new Error('Invalid session');
        }

        return {
          allowedContentTypes: ['application/vnd.android.package-archive', 'application/octet-stream'],
          tokenPayload: JSON.stringify({
            // optional, sent to your website when the upload is completed
          }),
        };
      },
      onUploadCompleted: async ({ blob, tokenPayload }) => {
        // This is called on your server after the upload is completed
        console.log('Blob upload completed', blob, tokenPayload);
      },
    });

    return NextResponse.json(jsonResponse);
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 400 },
    );
  }
}
