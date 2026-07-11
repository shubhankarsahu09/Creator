"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import styles from "./page.module.css";
import Image from "next/image";
import { portfolioData } from "../data";

interface IgData {
  followers: string;
  engagementRate: string;
  reach: string;
  reels: Array<{
    id: number;
    title: string;
    views: string;
    likes: string;
    comments: string;
    img: string;
  }>;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [igData, setIgData] = useState<IgData | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgLayerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Spotlight reveal
    const SPOTLIGHT_R = 260;
    const canvas = canvasRef.current;
    const imgLayer = imgLayerRef.current;

    if (!canvas || !imgLayer) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    function resizeCanvas() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const mouse = { x: -999, y: -999 };
    const smooth = { x: -999, y: -999 };

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener('mousemove', onMouseMove);

    let animationFrameId: number;

    function loop() {
      smooth.x += (mouse.x - smooth.x) * 0.1;
      smooth.y += (mouse.y - smooth.y) * 0.1;

      if (canvas && ctx && imgLayer) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const grad = ctx.createRadialGradient(smooth.x, smooth.y, 0, smooth.x, smooth.y, SPOTLIGHT_R);
        grad.addColorStop(0, 'rgba(255,255,255,1)');
        grad.addColorStop(0.4, 'rgba(255,255,255,1)');
        grad.addColorStop(0.6, 'rgba(255,255,255,0.75)');
        grad.addColorStop(0.75, 'rgba(255,255,255,0.4)');
        grad.addColorStop(0.88, 'rgba(255,255,255,0.12)');
        grad.addColorStop(1, 'rgba(255,255,255,0)');

        ctx.beginPath();
        ctx.arc(smooth.x, smooth.y, SPOTLIGHT_R, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();

        const dataUrl = canvas.toDataURL();
        imgLayer.style.webkitMaskImage = `url(${dataUrl})`;
        imgLayer.style.maskImage = `url(${dataUrl})`;
        imgLayer.style.webkitMaskSize = '100% 100%';
        imgLayer.style.maskSize = '100% 100%';
      }

      animationFrameId = requestAnimationFrame(loop);
    }

    animationFrameId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Fetch Instagram Data
  useEffect(() => {
    async function fetchIgData() {
      try {
        const res = await fetch('/api/instagram');
        const data = await res.json();
        setIgData(data);
      } catch (err) {
        console.error("Failed to fetch IG data", err);
      }
    }
    fetchIgData();
  }, []);

  const headlineText = "I create viral, high-converting content that helps brands reach millions.";
  const words = headlineText.split(' ');

  const stats = [
    { label: "Total Reach (30D)", value: igData?.reach || portfolioData.reach },
    { label: "Engagement Rate", value: igData?.engagementRate || portfolioData.engagementRate },
    { label: "Followers", value: igData?.followers || portfolioData.followers },
  ];

  const recentReels = igData ? igData.reels : portfolioData.recentReels;

  return (
    <>
      {/* SPLASH */}
      <div className={styles.splash} id="splash">
        <div className={`${styles.splashRow} ${styles.splashRowTop}`}>
          {[...Array(5)].map((_, i) => <div key={`t-${i}`} className={styles.splashBox}></div>)}
        </div>
        <div className={`${styles.splashRow} ${styles.splashRowBottom}`}>
          {[...Array(5)].map((_, i) => <div key={`b-${i}`} className={styles.splashBox}></div>)}
        </div>
      </div>

      {/* LOGO */}
      <div className={styles.logoWrapper}>
        <div className={styles.logoWrapperInner}>
          <a href="/" aria-label="Home" className={styles.logoText}>
            setuprizx
          </a>
        </div>
      </div>

      {/* BURGER */}
      <div className={styles.burgerWrapper}>
        <div className={styles.burgerWrapperInner}>
          <button
            className={`${styles.burgerBtn} ${menuOpen ? styles.burgerBtnOpen : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            <span className={styles.bar}></span>
            <span className={styles.bar}></span>
          </button>
        </div>
      </div>

      {/* MENU PANEL */}
      <div className={`${styles.menuPanel} ${menuOpen ? styles.menuPanelOpen : ''}`}>
        <div className={styles.menuContact}>
          <a href="mailto:shubhankarsahu82@gmail.com" className={styles.menuEmail}>shubhankarsahu82@gmail.com</a>
          <div className={styles.menuSocials}>
            <a href="https://www.instagram.com/setuprizx" target="_blank" rel="noopener noreferrer">Instagram</a>
          </div>
        </div>
        <div style={{ marginTop: '32px' }}>
          <Link href="/collab" className={styles.menuCtaBtn}>
            <span className={styles.menuCtaBg}></span>
            <span className={styles.menuCtaText}>Partner with me</span>
            <span className={styles.menuCtaCircle}>
              <svg width="14" height="14" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 13L13 5M13 5H6M13 5V12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </Link>
        </div>
      </div>

      {/* HERO */}
      <main className={styles.hero}>
        {/* Big text behind image */}
        <div className={`${styles.heroBigText} ${styles.creatorTextAnimate}`}>
          <h2>Setuprizx</h2>
        </div>

        {/* Base image */}
        <div
          className={`${styles.heroBaseImg} ${styles.heroImageAnimate}`}
          style={{ backgroundImage: "url('https://soft-zoom-63098134.figma.site/_assets/v11/5c9f982199fde1d9b85a20e5396f0fa7bacaf9a3.png?w=2560')" }}
        />

        {/* Reveal layer */}
        <canvas ref={canvasRef} className={styles.revealCanvas} />
        <div
          ref={imgLayerRef}
          className={styles.heroRevealImg}
          style={{ backgroundImage: "url('https://soft-zoom-63098134.figma.site/_assets/v11/6be2165e31648955b4e071f4cf2a50bc572b9bfd.png?w=1536')" }}
        />

        {/* Content */}
        <div className={styles.heroContent}>
          <div className={styles.heroContentInner}>
            <h1 className={styles.heroHeadline}>
              {words.map((word, i) => (
                <span
                  key={i}
                  className={styles.wordReveal}
                  style={{ animationDelay: `${1 + i * 0.05}s` }}
                >
                  {word}&nbsp;
                </span>
              ))}
            </h1>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'flex-start' }}>
              <Link href="/collab" className={`${styles.ctaBtn} ${styles.ctaAnimate}`}>
                <span className={styles.ctaBtnBg}></span>
                <span className={styles.ctaBtnText}>Brand? Let's Collab!</span>
                <span className={styles.ctaBtnCircle}>
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 13L13 5M13 5H6M13 5V12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </Link>
              
              <Link 
                href="/mediakit" 
                className={`${styles.ctaBtn} ${styles.ctaAnimate}`}
                style={{ animationDelay: '1.1s' }}
              >
                <span className={styles.ctaBtnBg}></span>
                <span className={styles.ctaBtnText}>See my Beacon MediaKit</span>
                <span className={styles.ctaBtnCircle}>
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 13L13 5M13 5H6M13 5V12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </main>

    </>
  );
}
