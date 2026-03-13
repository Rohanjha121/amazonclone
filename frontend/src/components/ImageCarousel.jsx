import { useEffect, useState } from 'react';

function ImageCarousel({ images = [], productName = 'Product image' }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(0);
  }, [images]);

  if (!images.length) {
    return (
      <div className="flex h-[420px] items-center justify-center rounded-md bg-gray-100 text-sm text-gray-500">
        No product image available
      </div>
    );
  }

  const current = images[index];
  const hasMultipleImages = images.length > 1;

  const goPrev = () => {
    setIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goNext = () => {
    setIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="grid gap-4 md:grid-cols-[80px,1fr]">
      <div className="order-2 flex gap-2 md:order-1 md:flex-col">
        {images.map((img, imageIndex) => (
          <button
            key={`${img}-${imageIndex}`}
            type="button"
            onClick={() => setIndex(imageIndex)}
            className={`overflow-hidden rounded border bg-white p-1 transition ${
              imageIndex === index
                ? 'border-amazon-yellow ring-2 ring-amber-200'
                : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            <img
              src={img}
              alt={`${productName} thumbnail ${imageIndex + 1}`}
              loading="lazy"
              className="h-14 w-14 object-contain"
            />
          </button>
        ))}
      </div>

      <div className="order-1 flex min-h-[420px] flex-col rounded-md border border-gray-200 bg-white p-4 md:order-2">
        <div className="relative flex flex-1 items-center justify-center">
          {hasMultipleImages && (
            <button
              type="button"
              onClick={goPrev}
              className="absolute left-0 rounded-full border border-gray-200 bg-white px-3 py-2 text-sm shadow-sm transition hover:bg-gray-50"
            >
              Prev
            </button>
          )}

          <img
            src={current}
            alt={productName}
            loading="lazy"
            className="max-h-[360px] w-auto max-w-full object-contain"
          />

          {hasMultipleImages && (
            <button
              type="button"
              onClick={goNext}
              className="absolute right-0 rounded-full border border-gray-200 bg-white px-3 py-2 text-sm shadow-sm transition hover:bg-gray-50"
            >
              Next
            </button>
          )}
        </div>

        <div className="mt-4 text-center text-xs text-gray-500">
          Image {index + 1} of {images.length}
        </div>
      </div>
    </div>
  );
}

export default ImageCarousel;
