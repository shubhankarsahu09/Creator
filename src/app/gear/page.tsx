"use client";

import React, { useEffect, useRef, useState } from 'react';
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
  },
  {
    id: 3,
    title: "Table Wrap",
    price: "Check on Amazon",
    image: "/tablewrap.png",
    link: "https://www.amazon.in/Stickers-Wallpaper-Kitchen-Concrete-Adhesive/dp/B08Z3STXD6?pd_rd_w=ewDAM&content-id=amzn1.sym.8ae3840a-4067-447e-bc32-b5f89fe9b78b&pf_rd_p=8ae3840a-4067-447e-bc32-b5f89fe9b78b&pf_rd_r=7H2CF6KCT4B0F4P88GDG&pd_rd_wg=7vV9w&pd_rd_r=13cdcbb8-1528-4bd0-aa8c-8ef56c68e1bc&pd_rd_i=B08Z3STXD6&psc=1&linkCode=ll2&tag=shubhankars0a-21&linkId=cd4fb529623a63155b9de0e5624b8921&ref_=as_li_ss_tl"
  }
];

const pcSpecs = [
  {
    label: "Processor",
    value: "AMD Ryzen 9 9900X",
    desc: "A powerful CPU handling everything from heavy video editing to streaming in 4k without breaking a sweat.",
    image: "/processor.png"
  },
  {
    label: "GPU",
    value: "GALAX RTX 5070 Ti",
    desc: "The ultimate graphics card for blazing fast renders and maxed-out gaming frames.",
    image: "/gpu.png"
  },
  {
    label: "Motherboard",
    value: "Gigabyte B650M Gaming WiFi",
    desc: "Premium motherboard with robust power delivery, ultra-fast I/O, and incredible overclocking capability.",
    image: "/motherboard.png"
  },
  {
    label: "RAM",
    value: "32GB DDR5 5600 MHz",
    desc: "Lightning-fast DDR5 memory ensures no bottlenecking during heavy multi-tasking.",
    image: "/ram.png"
  },
  {
    label: "Storage",
    value: "1 TB NVMe",
    desc: "Blazing fast speeds means games load instantly and footage scrubbing is perfectly smooth.",
    image: "/ssd.png"
  },
  {
    label: "Power Supply",
    value: "850 watt",
    desc: "Reliable and efficient power delivery keeping the entire system stable under heavy loads.",
    image: "/power.png"
  },
  {
    label: "Cooler",
    value: "Thermaltake 360mm liquid Cooler",
    desc: "Keeps the processor chilling even during the most demanding tasks.",
    image: "/cooler.png"
  },
  {
    label: "Case",
    value: "Deepcool CG530 4F",
    desc: "Beautiful design with excellent airflow and cable management.",
    image: "/cabinet.png"
  },
  {
    label: "Monitor",
    value: "MSI MAG 275QF 27 inch 2k",
    desc: "A stunning 27-inch 2K monitor for crystal-clear visuals and smooth gaming performance.",
    image: "/monitor.png"
  }
];

export default function GearPage() {
  const [selectedSpec, setSelectedSpec] = useState<any>(null);
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
          <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Back to Home
      </Link>

      <div className={styles.header}>
        <h1 className={styles.title}>My Setup & Gear</h1>
        <p className={styles.subtitle}>
          The tools I use daily to create content. Purchases made through these links support the channel.
        </p>
      </div>

      <div className={styles.specsSection}>
        <h2 className={styles.specsSectionTitle}>My PC Specs</h2>
        <div className={styles.specsGrid}>
          {pcSpecs.map((spec, index) => (
            <div
              key={index}
              className={styles.specItem}
              onClick={() => setSelectedSpec(spec)}
            >
              <div className={styles.specImageWrapper}>
                <img src={spec.image} alt={spec.label} className={styles.specThumbnail} />
              </div>
              <div className={styles.specText}>
                <div className={styles.specLabel}>{spec.label}</div>
                <div className={styles.specValue}>{spec.value}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.affiliateSection}>
        <h2 className={styles.specsSectionTitle}>Direct Links</h2>
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

      {/* Modal Overlay */}
      {selectedSpec && (
        <div className={styles.modalOverlay} onClick={() => setSelectedSpec(null)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.modalClose} onClick={() => setSelectedSpec(null)}>
              &times;
            </button>
            <div className={styles.modalImageContainer}>
              <img src={selectedSpec.image} alt={selectedSpec.value} className={styles.modalImage} />
            </div>
            <div className={styles.modalInfo}>
              <h3 className={styles.modalTitle}>{selectedSpec.value}</h3>
              <div className={styles.modalSubtitle}>{selectedSpec.label}</div>
              <p className={styles.modalDesc}>{selectedSpec.desc}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
