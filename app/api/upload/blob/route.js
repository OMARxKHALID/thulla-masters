import { handleUpload } from '@vercel/blob/client';
import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
import { cookies } from 'next/headers';

const JWT_SECRET = process.env.JWT_SECRET || "thulla-masters-secret-key-123";
const secret = new TextEncoder().encode(JWT_SECRET);

export async function POST(request) {
  try {
    const body = await request.json();

    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      console.error("Vercel Blob configuration missing: BLOB_READ_WRITE_TOKEN is not defined.");
      return NextResponse.json(
        { error: "Storage service is not configured. Please contact your administrator." },
        { status: 500 }
      );
    }

    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname) => {
        const token = (await cookies()).get("token")?.value;
        if (!token) {
          throw new Error('You must be logged in to upload files.');
        }

        let payload;
        try {
          const verified = await jwtVerify(token, secret);
          payload = verified.payload;
        } catch (e) {
          console.error("JWT Verification failed during upload:", e.message);
          throw new Error('Your session has expired. Please log in again.');
        }

        if (payload.role !== 'admin') {
          console.warn(`Unauthorized upload attempt by user: ${payload.email}`);
          throw new Error('Only administrators are authorized to upload APK files.');
        }

        if (!pathname.toLowerCase().endsWith('.apk')) {
          throw new Error('Only .apk files are allowed for security reasons.');
        }

        return {
          allowedContentTypes: ['application/vnd.android.package-archive', 'application/octet-stream'],
          tokenPayload: JSON.stringify({
            adminEmail: payload.email,
          }),
        };
      },
      onUploadCompleted: async ({ blob, tokenPayload }) => {
        const { adminEmail } = JSON.parse(tokenPayload);
        console.log(`[Success] APK uploaded by ${adminEmail}: ${blob.url}`);
      },
    });

    return NextResponse.json(jsonResponse);
  } catch (error) {
    console.error("Vercel Blob handleUpload error:", error);
    return NextResponse.json(
      { error: error.message || "An unexpected error occurred during the upload process." },
      { status: 400 },
    );
  }
}
