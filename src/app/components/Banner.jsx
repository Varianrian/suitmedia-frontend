import React from "react";

function Banner() {
  return (
    <header
      className="flex items-center justify-center h-[50vh] bg-fixed bg-center bg-cover"
      style={{
        backgroundImage: 'url("/images/banner.jpg")',
      }}
    >
      <div className="p-5 text-2xl text-white text-center">
        <h1 className="text-4xl font-medium">Ideas</h1>
        <h2 className="text-xl font-light">Where all our great things begin</h2>
      </div>
    </header>
  );
}

export default Banner;
