import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Head from "next/head";

const Hero = () => {
  return (
    <>
      <Head>
        <link rel="preload" href="/sorvete-landing.png" as="image" />
      </Head>
      <section className="flex flex-col md:flex-row justify-between items-center px-4 md:px-8 lg:px-16">
        <div className="w-full md:w-1/2 lg:w-2/3 py-8 md:py-12 flex flex-col justify-center gap-8">
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-semibold text-center md:text-left">
            Sirva-se de <br />
            <span className="text-pink-300"> Felicidade</span>!
          </h1>
          <p className="my-4 md:my-6 w-full md:w-5/6 lg:w-2/3 text-sm text-center md:text-justify">
            Descubra a verdadeira alegria em cada colherada de nossos sorvetes
            artesanais e açaís frescos. Venha experimentar a felicidade em forma
            de sorvete e açaí!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 text-sm justify-center md:justify-start">
            <Link href="/menu" passHref>
              <div className="w-full bg-pink-300 text-white flex items-center justify-center gap-2 px-6 py-3 rounded-full hover:shadow-md hover:shadow-lg group">
                Ir para o Menu
                <ArrowRight className="bg-pink-300 w-6 h-6 transition-colors duration-300" />
              </div>
            </Link>
          </div>
        </div>
        <div className="relative w-full md:w-1/2 mt-8 md:mt-0 transition-transform duration-500 hover:scale-105">
          <Image
            src="/sorvete-landing.png"
            alt="Logo Mundo Gelado"
            style={{ objectFit: "cover" }}
            width={700}
            height={400}
            priority
          />
        </div>
      </section>
    </>
  );
};

export default Hero;
