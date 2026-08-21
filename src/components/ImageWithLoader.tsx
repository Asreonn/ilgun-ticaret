import { type ImgHTMLAttributes, useEffect, useRef, useState } from "react";

type ImageWithLoaderProps = Omit<
  ImgHTMLAttributes<HTMLImageElement>,
  "onLoad" | "onError"
> & {
  fallbackSrc?: string;
};

export function ImageWithLoader({
  className = "",
  fallbackSrc = `${import.meta.env.BASE_URL}placeholder.svg`,
  src,
  ...props
}: ImageWithLoaderProps) {
  const [loaded, setLoaded] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    setLoaded(false);
    setCurrentSrc(src);
  }, [src]);

  useEffect(() => {
    const image = imageRef.current;
    setLoaded(Boolean(image?.complete && image.naturalWidth > 0));
  }, [currentSrc]);

  return (
    <span className={`media-loader ${loaded ? "is-loaded" : "is-loading"}`}>
      <span className="media-skeleton" aria-hidden="true" />
      <span className="media-spinner" aria-hidden="true" />
      <img
        {...props}
        ref={imageRef}
        className={className}
        src={currentSrc}
        onLoad={() => setLoaded(true)}
        onError={() => {
          if (currentSrc !== fallbackSrc) {
            setLoaded(false);
            setCurrentSrc(fallbackSrc);
          }
        }}
      />
    </span>
  );
}
