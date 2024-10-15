import React from "react";

type SectionsHeadersProps = {
  subHeader?: string;
  mainHeader: string;
};

const SectionsHeaders = ({ subHeader, mainHeader }: SectionsHeadersProps) => {
  return (
    <div className="text-center mb-8">
      <h3 className="uppercase text-gray-700 text-sm sm:text-base md:text-lg leading-4 mb-2">
        {subHeader}
      </h3>
      <h2 className="text-pink-300 font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl italic">
        {mainHeader}
      </h2>
    </div>
  );
};

export default SectionsHeaders;
