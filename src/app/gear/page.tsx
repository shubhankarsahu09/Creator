"use client";

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './gear.module.css';

// Using the product data from the Amazon affiliate site
const gearProducts = [
  {
    id: 1,
    title: "Kreo Hive 65 Keyboard",
    price: "Check on Amazon",
    image: "/kreo-hive-65.png",
    link: "https://www.amazon.in/Kreo-Anti-ghosting-Mechanical-Backlight-Detachable/dp/B0FNN853Z8?crid=3ONG4T9M4V4C2&dib=eyJ2IjoiMSJ9.6Mlx0UOpmM6STUnAu5Gkd1NwM2eQatSRNg1IM_hg_usAM0PWWx6uhTpVALxEoxK4JWW0XSROlPDuYL4A1yLl9zZFYEJTPW7iTRZzVlWPKahOpWXOtCmgcFnWM-SXXiFSnymSVw8dsxy-fRyCrhbyc-HnWYAX9YHwqOzJaaE1VY7zvbzYD0sdMaL4HQUj6e4xMvspTfzB5kkzA3ZYCT04mBpJfG6W9oXyKynyXGkZ4V4.b7_9H3qniI3Xw1xAVftRjHdae1Q4qBL0TumKXb93hlw&dib_tag=se&keywords=kreo%2Bhive%2B65&nsdOptOutParam=true&qid=1784904467&sprefix=Kreo%2B%2Caps%2C252&sr=8-3&th=1&linkCode=ll2&tag=shubhankar01a-21&linkId=30f8c58d8190624b30e81b48cd489d34&ref_=as_li_ss_tl"
  },
  {
    id: 2,
    title: "MSI MAG 275QF Gaming Monitor",
    price: "Check on Amazon",
    image: "/msi-monitor.png",
    link: "https://www.amazon.in/MSI-MAG-275QF-Gaming-Monitor/dp/B0BSLJZJZH?crid=1CPE3W0BW6O7V&dib=eyJ2IjoiMSJ9.Kd97gQzqvwFlWdHG_g7HSF_rcvVhSjVWScvPwb8Pgd3jGu_29Gl_A0yobCsiYzsd39Rjb1VZGIbMBg6FkuqNZLNqR0_54ZGeZTy2kk2RgK7vBVcgpWZe2HC_4ST-4Q0DPKQlAJjXMzNVrQSmyaMyldrHGL2FEci6TCnE27jrutzEv-ujYKbbLnK2aywDRcprDckbjYEsyww9ab1YtIYOeWe-B4NZyxDNBdWns41AzpM.sZretseDRAkmbz0dH5kynhGN__9OknugGMv4xmUd-lw&dib_tag=se&keywords=msi+monitor&qid=1784960965&sprefix=msi+monit%2Caps%2C305&sr=8-12&linkCode=ll2&tag=shubhankar01a-21&linkId=a145538e133d30f8907450cb4186dd67&ref_=as_li_ss_tl"
  }
];

export default function GearPage() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!gridRef.current) return;
      const cards = gridRef.current.getElementsByClassName(styles.card);
      for (const card of cards as any) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className={styles.container}>
      <Link href="/" className={styles.backBtn}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Back to Home
      </Link>

      <div className={styles.header}>
        <h1 className={styles.title}>My Setup & Gear</h1>
        <p className={styles.subtitle}>
          The tools I use daily to create content. Purchases made through these links support the channel.
        </p>
      </div>

      <div className={styles.grid} ref={gridRef}>
        {gearProducts.map((product) => (
          <a 
            key={product.id}
            href={product.link}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.card}
          >
            <div className={styles.imageContainer}>
              {/* Note: Using standard img here since domains might not be configured in next.config.js for next/image */}
              <img 
                src={product.image} 
                alt={product.title} 
                className={styles.image}
              />
            </div>
            <div className={styles.info}>
              <h3 className={styles.productTitle}>{product.title}</h3>
              <p className={styles.productPrice}>{product.price}</p>
              <div className={styles.buyBtn}>
                View on Amazon
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
