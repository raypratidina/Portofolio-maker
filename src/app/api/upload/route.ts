import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

export async function POST(request: Request) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
        }

        // Convert File to ArrayBuffer
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Upload to Cloudinary using a stream (better for memory) or simple buffer upload
        // For Vercel Serverless (limited execution time), direct upload is safer.

        // We wrap cloudinary upload in a Promise
        const uploadResult = await new Promise((resolve, reject) => {
            const isPdf = file.type === 'application/pdf' || file.name.endsWith('.pdf');

            const uploadOptions: any = {
                folder: 'portfolio',
                resource_type: isPdf ? 'raw' : 'auto',
                use_filename: true,
                unique_filename: true,
            };

            if (isPdf) {
                // FORCE .pdf extension for raw files so they have correct format on download
                // We use a timestamp to make it unique but keep the .pdf at the end
                const filename = file.name.replace(/\.pdf$/i, '').replace(/[^a-zA-Z0-9]/g, '_');
                uploadOptions.public_id = `${filename}_${Date.now()}.pdf`;
                uploadOptions.unique_filename = false;
                uploadOptions.use_filename = false;
            }

            cloudinary.uploader.upload_stream(uploadOptions, (error, result) => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
            }).end(buffer);
        });

        const result: any = uploadResult;

        return NextResponse.json({
            url: result.secure_url,
            success: true
        });

    } catch (error) {
        console.error('Error uploading file:', error);
        return NextResponse.json({ error: 'Error uploading file' }, { status: 500 });
    }
}
