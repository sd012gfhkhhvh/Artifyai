"use client";

import { dataUrl, debounce, download, getImageSize } from "@/lib/utils";
import { CldImage, getCldImageUrl } from "next-cloudinary";
import { PlaceholderValue } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import React from "react";
import { useToast } from "../ui/use-toast";

const TransformedImage = ({
  image,
  type,
  title,
  transformationConfig,
  isTransforming,
  setIsTransforming,
  hasDownload = false,
}: TransformedImageProps) => {
  const { toast } = useToast();
  const downloadHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    download(
      getCldImageUrl({
        width: image?.width,
        height: image?.height,
        src: image?.publicId,
        ...transformationConfig,
      }),
      title
    );
  };

  return (
    <div className="relative w-full h-full">
      {hasDownload && (
        <button
          className="absolute top-4 right-4 z-10 bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-600 hover:from-blue-700 hover:via-indigo-700 hover:to-violet-700 transition-all duration-300 p-3.5 rounded-2xl shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/40 group border border-white/20"
          onClick={downloadHandler}
          title="Download transformed image"
        >
          <Image
            src="/assets/icons/download.svg"
            alt="Download"
            width={20}
            height={20}
            className="brightness-0 invert group-hover:scale-110 transition-transform duration-300"
          />
        </button>
      )}

      {image?.publicId && transformationConfig ? (
        <div className="relative">
          <CldImage
            width={getImageSize(type, image, "width")}
            height={getImageSize(type, image, "height")}
            src={image?.publicId}
            alt={image.title}
            sizes={"(max-width: 767px) 100vw, 50vw"}
            placeholder={dataUrl as PlaceholderValue}
            className="transformed-image"
            // onLoad={() => {
            //   toast({
            //     title: 'Transformed',
            //     className: 'success-toast'
            //   })
            //   setIsTransforming && setIsTransforming(false);
            // }}
            onError={() => {
              debounce(() => {
                toast({
                  title: "Something went wrong while loading image",
                  description: "Please try again",
                  duration: 5000,
                  className: "error-toast",
                });
                setIsTransforming && setIsTransforming(false);
              }, 8000)();
            }}
            {...transformationConfig}
          />

          {isTransforming && (
            <div className="transforming-loader">
              <Image
                src="/assets/icons/spinner.svg"
                width={50}
                height={50}
                alt="spinner"
              />
              <p className="text-white/80">Please wait...</p>
            </div>
          )}
        </div>
      ) : (
        <div className="transformed-placeholder">Transformed Image</div>
      )}
    </div>
  );
};

export default TransformedImage;
