import { Skeleton } from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import { MenuItemProps } from "./MenuItem";

interface MenuItemTileProps {
  item: MenuItemProps;
  onAddToCart: () => void;
}

export default function MenuItemTile({ item, onAddToCart }: MenuItemTileProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const { name, description, price, image } = item;

  return (
    <div className="bg-purple-100 p-4 rounded-lg shadow-md text-center flex md:flex-col gap-4 md:gap-0 items-center hover:bg-pink-50 transition-all group">
      <div className="w-24 md:w-48 h-24 md:h-48 relative mb-2">
        {image ? (
          <>
            <Image
              src={image}
              alt={name}
              layout="fill"
              objectFit="cover"
              className={`rounded-full ${
                imageLoaded ? "opacity-100" : "opacity-0"
              }`}
              onLoad={() => setImageLoaded(true)}
            />
            {!imageLoaded && (
              <Skeleton
                variant="circular"
                width={192}
                height={192}
                className="absolute top-0 left-0"
              />
            )}
          </>
        ) : (
          <div className="w-24 md:w-48 h-24 md:h-48 bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
            Sem Imagem
          </div>
        )}
      </div>
      {
        <div className="flex flex-col">
          <h4 className="text-lg font-semibold my-2 group-hover:text-pink-600 transition-colors duration-300">
            {name}
          </h4>
          <p className="text-sm text-gray-500 mt-1 px-2 line-clamp-3">
            {description}
          </p>
          {price > 0 && (
            <>
              <p className="font-bold mt-2">
                R$ {price.toFixed(2).replace(".", ",")}
              </p>
              <button
                type="button"
                onClick={onAddToCart}
                className="bg-pink-300 mt-3 text-white rounded-full px-6 py-2
                text-sm hover:bg-pink-400 transition-colors duration-300 shadow-md hover:shadow-lg"
              >
                Add ao carrinho
              </button>
            </>
          )}
        </div>
      }
    </div>
  );
}
