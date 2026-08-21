import { type ImgHTMLAttributes, useEffect, useState } from "react";

type ImageWithLoaderProps = Omit<ImgHTMLAttributes<HTMLImageElement>, "onLoad" | "onError"> & {
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

  useEffect(() => {
    setLoaded(false);
    setCurrentSrc(src);
  }, [src]);

  return (
    <span className={`media-loader ${loaded ? "is-loaded" : "is-loading"}`}>
      <span className="media-skeleton" aria-hidden="true" />
      <img
        {...props}
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
