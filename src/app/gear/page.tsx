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
    image: "https://kreo-tech.com/cdn/shop/files/Artboard2.jpg?v=1710928926", // Kreo Hive 65 image
    link: "https://www.amazon.in/Kreo-Anti-ghosting-Mechanical-Backlight-Detachable/dp/B0FNN853Z8?crid=3ONG4T9M4V4C2&dib=eyJ2IjoiMSJ9.6Mlx0UOpmM6STUnAu5Gkd1NwM2eQatSRNg1IM_hg_usAM0PWWx6uhTpVALxEoxK4JWW0XSROlPDuYL4A1yLl9zZFYEJTPW7iTRZzVlWPKahOpWXOtCmgcFnWM-SXXiFSnymSVw8dsxy-fRyCrhbyc-HnWYAX9YHwqOzJaaE1VY7zvbzYD0sdMaL4HQUj6e4xMvspTfzB5kkzA3ZYCT04mBpJfG6W9oXyKynyXGkZ4V4.b7_9H3qniI3Xw1xAVftRjHdae1Q4qBL0TumKXb93hlw&dib_tag=se&keywords=kreo%2Bhive%2B65&nsdOptOutParam=true&qid=1784904467&sprefix=Kreo%2B%2Caps%2C252&sr=8-3&th=1&linkCode=ll2&tag=shubhankar01a-21&linkId=30f8c58d8190624b30e81b48cd489d34&ref_=as_li_ss_tl"
  },
  {
    id: 2,
    title: "Shure SM7B Microphone",
    price: "$399.00",
    image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=800&auto=format&fit=crop",
    link: "https://www.amazon.com/dp/B0002E4Z8M"
  },
  {
    id: 3,
    title: "Mechanical Keyboard",
    price: "$199.00",
    image: "https://images.unsplash.com/photo-1595225476474-87563907a212?q=80&w=800&auto=format&fit=crop",
    link: "https://www.amazon.com/dp/B0856WNN9M"
  },
  {
    id: 4,
    title: "Ergonomic Mouse",
    price: "$99.99",
    image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?q=80&w=800&auto=format&fit=crop",
    link: "https://www.amazon.com/dp/B07S395RWD"
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
