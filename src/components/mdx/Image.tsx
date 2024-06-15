import NextImage from "next/image";
import { cn } from "@/lib/utils";

type CustomImageProps = {
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
};

const Image = ({
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
}: CustomImageProps) => {
  const containerClasses = cn({
    "not-prose my-8 w-full": !reset,
    "bg-tertiary": breakout,
    "overflow-hidden rounded-md md:rounded-lg": rounded || breakout,
  });

  const figureClasses = cn("m-0 flex flex-col", {
    "gap-4": breakout,
    "gap-2": !breakout,
  });

  const imageClasses = cn("h-auto w-full", {
    "bg-tertiary": breakout,
    "bg-tertiary overflow-hidden rounded-md md:rounded-lg": rounded || breakout,
  });

  const captionClasses = cn(
    "text-tertiary mx-auto my-2 max-w-md text-center text-xs font-medium leading-tight",
    { "mx-auto w-full max-w-[700px] px-6": breakout }
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
