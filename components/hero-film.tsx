'use client';

import { useEffect, useRef, useState } from 'react';

type HeroFilmProps = {
  className: string;
  src: string;
  poster: string;
  parallax: string;
};

/**
 * Safari can ignore declarative autoplay during a low-power or restrictive
 * mobile session and show its own large play button.  This component makes
 * the background film explicitly muted/inline, then falls back to its poster
 * if playback is rejected. The hero therefore never becomes a video control.
 */
export function HeroFilm({ className, src, poster, parallax }: HeroFilmProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [unavailable, setUnavailable] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.setAttribute('muted', '');
    video.setAttribute('playsinline', '');
    video.setAttribute('webkit-playsinline', '');

    const start = () => {
      const result = video.play();
      if (result) result.catch(() => setUnavailable(true));
    };

    start();
    video.addEventListener('canplay', start, { once: true });
    return () => video.removeEventListener('canplay', start);
  }, []);

  return (
    <video
      ref={videoRef}
      data-parallax={parallax}
      className={`${className}${unavailable ? ' film-unavailable' : ''}`}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      poster={poster}
      aria-hidden="true"
      tabIndex={-1}
      disablePictureInPicture
      controlsList="nodownload noplaybackrate nofullscreen"
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
