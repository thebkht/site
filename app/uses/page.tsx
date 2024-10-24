import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Uses',
  description:
    "Here's what tech I'm currently using for coding, videos, and music.",
};

export default function UsesPage() {
  return (
    <section>
      <h1 className="font-medium text-2xl mb-8 tracking-tighter">
        here's my setup
      </h1>
      <div className="prose prose-neutral dark:prose-invert">
        <h3 id="computer-office">Computer / Office</h3>
        <ul>
          <li>HP ProBook 430 G5</li>
          <li>Mac mini (M1, 2020)</li>
          <li>
            MSI Optix G27C2 27" Curved Monitor ({' '}
            <a href="https://www.amazon.com/MSI-Optix-G27C2-27-Inch-Monitor/dp/B07KQXQWQ6">
              Amazon
            </a>{' '}
            )
          </li>
          <li>Logitech G502 HERO Mouse</li>
          <li>NuPhy Air75 v1 mechanical keyboard</li>
        </ul>
        {/* <h3 id="coding">Coding</h3>
        <ul>
          <li>
            Editor: VSCode (
            <a href="https://gist.github.com/leerob/e7883ab35d900b8cbb684ac77e7c4703">
              Settings / Extensions
            </a>
            )
          </li>
          <li>Theme: One Dark Pro</li>
          <li>Terminal: Hyper / zsh</li>
        </ul> */}
        {/* <h3 id="audio-video">Audio / Video</h3>
        <ul>
          <li>Sony A7III (28-50mm, 35mm f1.8)</li>
          <li>Shure SM7B + Elgato Wave XLR + Boom</li>
          <li>Elgato Camlink</li>
          <li>Logitech C920</li>
          <li>Elgato Key Light (x2)</li>
          <li>Elgato Master Mount</li>
          <li>Aputure Mark 2 120D II</li>
          <li>Aputure Light Dome II</li>
        </ul> */}
        {/* <h3 id="software">Software</h3>
        <ul>
          <li>1Password</li>
          <li>Spotify</li>
          <li>CleanShot X</li>
          <li>RetroClip</li>
          <li>Grammarly</li>
          <li>Texts</li>
          <li>Raycast</li>
          <li>Screenflow</li>
        </ul> */}
        {/* <h3 id="music">Music</h3>
        <ul>
          <li>Yamaha P-105 Piano</li>
          <li>Roland TD-20 V-Drums</li>
          <li>Roland AC-60</li>
          <li>Shure SM58</li>
          <li>Martin Acoustic Guitar (X-Series)</li>
        </ul> */}
        {/* <h3 id="other-tech">Other Tech</h3>
        <ul>
          <li>Apple Airpods Pro</li>
          <li>Apple Watch</li>
          <li>Apple iPhone</li>
          <li>Lacie USB-C External HDD</li>
          <li>Kindle</li>
          <li>Tesla Model 3</li>
        </ul> */}
      </div>
    </section>
  );
}
