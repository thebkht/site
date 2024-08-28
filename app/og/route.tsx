import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const postTitle = searchParams.get('heading');
  const font = fetch(
    new URL('../../public/assets/fonts/bold.otf', import.meta.url)
  ).then((res) => res.arrayBuffer());
  const fontData = await font;

  const fontSize = postTitle?.length ?? 0 > 140 ? 100 : 130;
  const lineHeight = postTitle?.length ?? 0 > 140 ? '90px' : '120px';

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          backgroundImage: 'url(https://bkhtdev.com/og-bg.png)',
        }}
      >
        <div
          tw="line-clamp-2"
          style={{
            marginLeft: 190,
            marginRight: 190,
            display: 'flex',
            fontSize,
            fontFamily: 'Manrope',
            letterSpacing: '-0.05em',
            fontStyle: 'normal',
            color: 'white',
            lineHeight,
            whiteSpace: 'pre-wrap',
          }}
        >
          {postTitle?.length && postTitle.length > 140
            ? `${postTitle.slice(0, 140)}...`
            : postTitle}
        </div>
      </div>
    ),
    {
      width: 1920,
      height: 1080,
      fonts: [
        {
          name: 'Manrope',
          data: fontData,
          style: 'normal',
        },
      ],
    }
  );
}
