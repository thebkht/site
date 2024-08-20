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
          id="a"
          xmlns="http://www.w3.org/2000/svg"
          width="193.2135"
          height="30"
          viewBox="0 0 450.83 70"
        >
          <path
            d="M107.03,27.59c-.29.54-.44.98-.44,1.32,0,.24.15.44.44.59.1.05.25.07.44.07.44,0,.86-.39,1.25-1.17,2.69-4.99,6.75-7.48,12.18-7.48,3.47,0,6.48.9,9.02,2.71,2.54,1.81,4.49,4.27,5.83,7.37,1.35,3.11,2.02,6.59,2.02,10.46s-.67,7.35-2.02,10.46c-1.35,3.11-3.29,5.56-5.83,7.37-2.54,1.81-5.55,2.71-9.02,2.71-5.48,0-9.54-2.52-12.18-7.56-.2-.39-.39-.68-.59-.88s-.44-.25-.73-.15c-.39.15-.59.42-.59.81s.24,1.08.73,2.05c.59,1.03.88,2.08.88,3.15v1.39h-11.74V8h11.74v15.26c0,1.08-.27,2.15-.81,3.23-.1.2-.29.56-.59,1.1ZM126.03,41.46c0-3.03-.72-5.55-2.16-7.56s-3.56-3.01-6.35-3.01-4.88,1.03-6.57,3.08c-1.69,2.05-2.53,4.55-2.53,7.48s.84,5.43,2.53,7.48c1.69,2.05,3.88,3.08,6.57,3.08s4.9-1,6.35-3.01,2.16-4.52,2.16-7.56ZM156.84,45.93l-3.23,3.23v11.67h-11.74V8h11.74v21.64c0,1.27-.15,2.31-.44,3.12s-.76,1.55-1.39,2.24c-.39.49-.59.9-.59,1.25,0,.24.12.46.37.66.25.15.44.22.59.22.39,0,.78-.24,1.17-.73l13.21-14.31h14.09l-16.14,16.21,17.32,22.52h-14.09l-10.86-14.89ZM222.88,37.35v23.48h-11.74v-18.78c0-4.21-.48-7.12-1.43-8.73-.95-1.61-2.53-2.42-4.73-2.42-1.61,0-3.12.64-4.51,1.91-1.39,1.27-2.51,3.06-3.34,5.36-.83,2.3-1.25,4.89-1.25,7.78v14.89h-11.74V8h11.74v15.92c0,1.52-.32,2.91-.95,4.18-.54,1.08-.81,1.83-.81,2.27,0,.39.15.64.44.73.1.05.22.07.37.07.44,0,.83-.39,1.17-1.17,1.13-2.4,2.79-4.51,4.99-6.35,2.2-1.83,4.82-2.75,7.85-2.75,4.31,0,7.7,1.39,10.2,4.18s3.74,6.87,3.74,12.25ZM243.42,47.62c0,1.32.06,2.22.18,2.71.12.49.4.79.84.92.44.12,1.27.18,2.49.18h7.04v9.39h-10.86c-2.69,0-4.87-.35-6.53-1.06-1.66-.71-2.9-1.92-3.71-3.63-.81-1.71-1.21-4.11-1.21-7.19v-17.46h-7.04v-9.39h7.04v-10.56h11.74v10.56h10.57v9.39h-10.57v16.14ZM285.09,60.83v-1.39c0-.83.29-1.88.88-3.15.49-.98.73-1.66.73-2.05s-.2-.66-.59-.81l-.22-.07c-.34,0-.6.17-.77.51-.17.34-.28.54-.33.59-1.22,2.4-2.85,4.26-4.88,5.58-2.03,1.32-4.46,1.98-7.3,1.98-3.47,0-6.48-.91-9.02-2.71-2.54-1.81-4.49-4.27-5.83-7.37-1.35-3.11-2.02-6.59-2.02-10.46s.67-7.35,2.02-10.46c1.35-3.11,3.29-5.56,5.83-7.37,2.54-1.81,5.55-2.71,9.02-2.71,5.28,0,9.34,2.49,12.18,7.48.24.44.49.78.73,1.03.24.24.56.27.95.07.29-.15.44-.34.44-.59,0-.34-.15-.78-.44-1.32-.29-.54-.49-.9-.59-1.1-.54-1.08-.81-2.15-.81-3.23v-15.26h11.74v52.83h-11.74ZM285.09,41.46c0-2.93-.84-5.43-2.53-7.48-1.69-2.05-3.88-3.08-6.57-3.08s-4.9,1-6.35,3.01-2.16,4.52-2.16,7.56.72,5.55,2.16,7.56,3.56,3.01,6.35,3.01,4.88-1.03,6.57-3.08c1.69-2.05,2.53-4.55,2.53-7.48ZM311.95,44.39c.39,2.49,1.39,4.49,3.01,5.98,1.61,1.49,3.62,2.24,6.02,2.24,1.76,0,3.23-.42,4.4-1.25,1.17-.83,2.01-1.98,2.49-3.45h11.67c-.83,4.01-2.84,7.36-6.02,10.05s-7.34,4.04-12.47,4.04c-4.35,0-8.1-.91-11.23-2.71s-5.49-4.27-7.08-7.37c-1.59-3.11-2.38-6.59-2.38-10.46s.81-7.57,2.42-10.67c1.61-3.11,3.96-5.53,7.04-7.26,3.08-1.74,6.75-2.6,11.01-2.6,3.42,0,6.62.71,9.57,2.13,2.96,1.42,5.34,3.58,7.15,6.49,1.81,2.91,2.71,6.49,2.71,10.75,0,1.61-.07,2.98-.22,4.11h-28.1ZM328.75,37.35c-.19-2.35-.98-4.16-2.35-5.43-1.37-1.27-3.15-1.91-5.36-1.91-4.84,0-7.78,2.45-8.8,7.34h16.51ZM359.05,52.24c0,1.08.39,1.61,1.17,1.61s1.17-.54,1.17-1.61c0-2.15.17-3.89.51-5.21l6.97-24.95h12.47l-12.91,38.74h-16.43l-12.91-38.74h12.47l6.97,24.95c.34,1.32.51,3.06.51,5.21ZM386.11,60.83h-4.32v-4.32h4.32v4.32ZM392.73,44.48c1.27-.79,2.78-1.18,4.53-1.18,1.51,0,2.83.31,3.96.93,1.13.62,2.02,1.44,2.65,2.46.63,1.02,1,2.14,1.11,3.35h-3.17c-.16-1.06-.63-1.95-1.42-2.68s-1.82-1.1-3.1-1.1c-1.06,0-1.98.27-2.78.81s-1.41,1.26-1.84,2.16c-.43.9-.64,1.89-.64,2.97s.21,2.07.64,2.97c.43.9,1.04,1.62,1.84,2.16.8.54,1.72.81,2.78.81,1.28,0,2.31-.37,3.1-1.1s1.26-1.62,1.42-2.68h3.17c-.11,1.21-.48,2.33-1.11,3.35-.63,1.02-1.51,1.84-2.63,2.46-1.12.62-2.45.93-3.98.93-1.71,0-3.2-.39-4.48-1.18-1.28-.79-2.26-1.86-2.95-3.22-.69-1.36-1.03-2.86-1.03-4.5s.34-3.14,1.01-4.5,1.65-2.43,2.92-3.22ZM422.85,47.69c.68,1.36,1.01,2.86,1.01,4.5s-.34,3.14-1.01,4.5c-.67,1.36-1.65,2.43-2.92,3.22s-2.75,1.18-4.43,1.18-3.16-.39-4.43-1.18-2.24-1.86-2.92-3.22c-.67-1.36-1.01-2.86-1.01-4.5s.34-3.14,1.01-4.5,1.65-2.43,2.92-3.22,2.75-1.18,4.43-1.18,3.16.39,4.43,1.18,2.24,1.86,2.92,3.22ZM420.63,52.2c0-1.69-.46-3.1-1.38-4.23-.92-1.13-2.17-1.7-3.74-1.7s-2.82.57-3.74,1.7c-.92,1.13-1.38,2.54-1.38,4.23s.46,3.1,1.38,4.23c.92,1.14,2.17,1.7,3.74,1.7s2.82-.57,3.74-1.7c.92-1.13,1.38-2.54,1.38-4.23ZM450.83,50.31v10.52h-3.24v-10.92c0-2.52-1.13-3.78-3.4-3.78-.65,0-1.27.2-1.87.59-.59.39-1.08.96-1.45,1.7-.37.74-.56,1.62-.56,2.63v9.78h-3.24v-10.52c0-1.37-.25-2.41-.74-3.12-.5-.71-1.28-1.06-2.36-1.06-.7,0-1.37.24-2.02.71-.65.47-1.18,1.14-1.57,2.01-.39.86-.59,1.85-.59,2.95v9.04h-3.24v-17.26h3.24v1.15c0,.68-.12,1.41-.37,2.19,0,.04-.02.12-.05.22-.03.1-.04.18-.02.24s.07.1.14.12h.1c.11,0,.2-.09.27-.27.43-1.19,1.11-2.14,2.04-2.85.93-.71,1.98-1.06,3.15-1.06,1.08,0,2.02.34,2.83,1.03.81.69,1.34,1.57,1.58,2.65.04.18.16.27.34.27s.3-.09.37-.27c.45-1.17,1.1-2.07,1.94-2.71.84-.64,1.79-.96,2.85-.96,1.78,0,3.2.54,4.26,1.63,1.07,1.09,1.6,2.88,1.6,5.38ZM58.97,11.03v37.12l-10.71,10.82H11.03V21.85l10.71-10.82h37.22M70,0H17.15L0,17.31v52.69h52.85l17.15-17.31V0h0Z"
            fill={paint}
            stroke-width="0"
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
