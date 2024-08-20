'use server';
import { ImageResponse } from 'next/og';
import https from 'https';
import { promisify } from 'util';
import { pipeline } from 'stream';

import * as z from 'zod';

const ogImageSchema = z.object({
  heading: z.string().default('personal blog by bkhtdev'),
  mode: z.enum(['light', 'dark']).default('dark'),
});

const download = (url: string) => {
  return new Promise<Buffer>((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to get '${url}' (${response.statusCode})`));
        return;
      }

      let data: Buffer[] = [];
      response.on('data', (chunk) => data.push(chunk));
      response.on('end', () => resolve(Buffer.concat(data)));
    });
  });
};

const regularFont = download('https://bkhtdev.com/assets/fonts/regular.otf');
const boldFont = download('https://bkhtdev.com/assets/fonts/bold.otf');

export async function GET(req: Request) {
  const [regular, bold] = await Promise.all([regularFont, boldFont]);
  const url = new URL(req.url);
  const values = ogImageSchema.parse(Object.fromEntries(url.searchParams));
  const heading =
    values.heading.length > 140
      ? `${values.heading.substring(0, 140)}...`
      : values.heading;

  const { mode } = values;
  const paint = mode === 'dark' ? '#fff' : '#000';

  const fontSize = heading.length > 100 ? '50px' : '80px';

  return new ImageResponse(
    (
      <div
        tw="flex relative flex-col p-12 w-full h-full items-start"
        style={{
          color: paint,
          background:
            mode === 'dark'
              ? 'linear-gradient(90deg, #000 0%, #111 100%)'
              : 'white',
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 70 70"
          height={48}
          width={48}
        >
          <path
            d="M58.97,11.03v37.12l-10.71,10.82H11.03V21.85l10.71-10.82h37.22M70,0H17.15L0,17.31v52.69h52.85l17.15-17.31V0h0Z"
            fill="currentColor"
            strokeWidth="0"
          />
        </svg>
        <div tw="flex flex-col flex-1 py-14 h-full justify-end">
          <div
            tw="flex leading-[1.1] text-7xl font-bold"
            style={{
              fontWeight: 'bold',
              marginLeft: '-3px',
              fontSize,
              letterSpacing: '-6px',
            }}
          >
            {heading}
          </div>
        </div>
        <div tw="flex items-center w-full justify-between">
          <div
            tw="flex text-xl"
            style={{ fontWeight: 'normal', letterSpacing: '-1px' }}
          >
            bkhtdev.com
          </div>
          <div
            tw="flex items-center text-xl"
            style={{ fontWeight: 'normal', letterSpacing: '-1px' }}
          >
            <svg width="32" height="32" viewBox="0 0 48 48" fill="none">
              <path
                d="M30 44v-8a9.6 9.6 0 0 0-2-7c6 0 12-4 12-11 .16-2.5-.54-4.96-2-7 .56-2.3.56-4.7 0-7 0 0-2 0-6 3-5.28-1-10.72-1-16 0-4-3-6-3-6-3-.6 2.3-.6 4.7 0 7a10.806 10.806 0 0 0-2 7c0 7 6 11 12 11a9.43 9.43 0 0 0-1.7 3.3c-.34 1.2-.44 2.46-.3 3.7v8"
                stroke={paint}
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M18 36c-9.02 4-10-4-14-4"
                stroke={paint}
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <div tw="flex ml-2">github.com/thebkht</div>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'Manrope',
          data: regular,
          weight: 400,
        },
        {
          name: 'Manrope',
          data: bold,
          weight: 700,
        },
      ],
    }
  );
}
