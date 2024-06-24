import NextImage from "next/image";
import { cn } from "@/lib/utils";

interface CustomImageProps {
  src: string;
  width: number;
  height: number;
  alt: string;
  blurDataURL?: string;
  caption?: string;
  breakout?: boolean;
  rounded?: boolean;
  priority?: boolean;
  reset?: boolean;
}

const Image: React.FC<CustomImageProps> = ({
  src,
  width,
  height,
  alt,
  blurDataURL,
  caption,
  breakout = false,
  rounded = false,
  priority = false,
  reset = false,
  ...rest
}) => {
  const containerClasses = cn(
    !reset && "not-prose my-8 w-full",
    breakout && "bg-tertiary",
    (rounded || breakout) && "overflow-hidden rounded-md md:rounded-lg"
  );

  const figureClasses = cn("m-0 flex flex-col", breakout ? "gap-4" : "gap-2");

  const imageClasses = cn(
    "h-auto max-w-full rounded-md border transition-colors object-cover",
    breakout && "bg-tertiary",
    (rounded || breakout) &&
      "bg-tertiary overflow-hidden rounded-md md:rounded-lg"
  );

  const captionClasses = cn(
    "text-tertiary mx-auto my-2 max-w-md text-center text-xs font-medium leading-tight",
    breakout && "mx-auto w-full max-w-[700px] px-6"
  );

  return (
    <div className={containerClasses}>
      <figure className={figureClasses}>
        <NextImage
          src={src}
          alt={alt}
          width={width}
          height={height}
          priority={priority}
          className={imageClasses}
          placeholder={blurDataURL ? "blur" : "empty"}
          blurDataURL={blurDataURL}
          referrerPolicy="strict-origin-when-cross-origin"
          {...rest}
        />
        {caption && (
          <figcaption className={captionClasses}>{caption}</figcaption>
        )}
      </figure>
    </div>
  );
};

export default Image;
