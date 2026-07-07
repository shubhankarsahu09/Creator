"use client";

import { useEffect, useRef, useState } from "react";
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

  // Removed broken API fetch for now since Meta API is glitching
  // Fallback to manual config file

  const headlineText = "I create viral, high-converting content that helps brands reach millions.";
  const words = headlineText.split(' ');

  const stats = [
    { label: "Total Reach (30D)", value: "2.4M" },
    { label: "Avg Reach/Reel", value: "150K" },
    { label: "Followers", value: portfolioData.followers },
  ];

  const recentReels = portfolioData.recentReels;

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
        <nav>
          <a href="#work" onClick={() => setMenuOpen(false)}>Work</a>
          <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
        </nav>
        <div className={styles.menuContact}>
          <a href="mailto:shubhankarsahu82@gmail.com" className={styles.menuEmail}>shubhankarsahu82@gmail.com</a>
          <div className={styles.menuSocials}>
            <a href="https://www.instagram.com/setuprizx" target="_blank" rel="noopener noreferrer">Instagram</a>
          </div>
        </div>
        <div style={{ marginTop: '32px' }}>
          <button className={styles.menuCtaBtn}>
            <span className={styles.menuCtaBg}></span>
            <span className={styles.menuCtaText}>Partner with me</span>
            <span className={styles.menuCtaCircle}>
              <svg width="14" height="14" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 13L13 5M13 5H6M13 5V12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </button>
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
            <button className={`${styles.ctaBtn} ${styles.ctaAnimate}`}>
              <span className={styles.ctaBtnBg}></span>
              <span className={styles.ctaBtnText}>Brand? Let's Collab!</span>
              <span className={styles.ctaBtnCircle}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 13L13 5M13 5H6M13 5V12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </main>

      {/* EXACT BEACONS STYLE LAYOUT (LIGHT THEME) */}
      <section className={styles.beaconsContainer}>
        
        {/* SUMMARY SECTION */}
        <div className={styles.bSection}>
          <h2 className={styles.bSectionTitle}>Summary</h2>
          <div className={styles.bGrid3}>
            <div className={styles.bCard}>
              <div className={styles.bCardLabel}>Followers</div>
              <div className={styles.bCardValue}>{portfolioData.followers}</div>
            </div>
            <div className={styles.bCard}>
              <div className={styles.bCardLabel}>Engagement Rate</div>
              <div className={styles.bCardValue}>{portfolioData.engagementRate}</div>
              <div className={styles.bCardSub}>98.62% Follower Engagement</div>
            </div>
            <div className={styles.bCard}>
              <div className={styles.bCardLabel}>Reach (30D)</div>
              <div className={styles.bCardValue}>{portfolioData.reach}</div>
            </div>
          </div>
        </div>

        {/* AUDIENCE DEMOGRAPHICS */}
        <div className={styles.bSection}>
          <h2 className={styles.bSectionTitle}>Audience</h2>
          <div className={styles.bGrid2} style={{ marginBottom: '24px' }}>
            <div className={styles.bCard}>
              <div className={styles.bCardLabel}>Gender Split</div>
              <div className={styles.bCardValue} style={{ fontSize: '32px' }}>93.8% Male</div>
              <div className={styles.bCardSub}>6.2% Female</div>
              <div className={styles.bBarContainer} style={{ marginTop: 'auto' }}>
                <div className={styles.bBarFill} style={{ width: '93.8%' }}></div>
              </div>
            </div>
            <div className={styles.bCard}>
              <div className={styles.bCardLabel}>Top Age Range</div>
              <div className={styles.bCardValue} style={{ fontSize: '32px' }}>18-24</div>
              <div className={styles.bCardSub}>Primary demographic</div>
            </div>
          </div>

          <div className={styles.bGrid2}>
            <div className={styles.bCard}>
              <div className={styles.bCardLabel}>Top Countries</div>
              <div className={styles.bList}>
                <div className={styles.bListItem}>
                  <div className={styles.bListRow}><span>India</span><span>45%</span></div>
                  <div className={styles.bBarContainer}><div className={styles.bBarFill} style={{ width: '45%' }}></div></div>
                </div>
                <div className={styles.bListItem}>
                  <div className={styles.bListRow}><span>USA</span><span>20%</span></div>
                  <div className={styles.bBarContainer}><div className={styles.bBarFill} style={{ width: '20%' }}></div></div>
                </div>
                <div className={styles.bListItem}>
                  <div className={styles.bListRow}><span>UK</span><span>15%</span></div>
                  <div className={styles.bBarContainer}><div className={styles.bBarFill} style={{ width: '15%' }}></div></div>
                </div>
              </div>
            </div>

            <div className={styles.bCard}>
              <div className={styles.bCardLabel}>Top Cities</div>
              <div className={styles.bList}>
                <div className={styles.bListItem}>
                  <div className={styles.bListRow}><span>Los Angeles</span><span>12%</span></div>
                  <div className={styles.bBarContainer}><div className={styles.bBarFill} style={{ width: '12%' }}></div></div>
                </div>
                <div className={styles.bListItem}>
                  <div className={styles.bListRow}><span>New York</span><span>8%</span></div>
                  <div className={styles.bBarContainer}><div className={styles.bBarFill} style={{ width: '8%' }}></div></div>
                </div>
                <div className={styles.bListItem}>
                  <div className={styles.bListRow}><span>London</span><span>7%</span></div>
                  <div className={styles.bBarContainer}><div className={styles.bBarFill} style={{ width: '7%' }}></div></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RECENT POSTS CAROUSEL */}
        <div className={styles.bSection}>
          <h2 className={styles.bSectionTitle}>Most Recent Posts</h2>
          <div className={styles.bCarousel}>
            {recentReels.map((reel: any) => (
              <a href="https://instagram.com/setuprizx" target="_blank" rel="noopener noreferrer" key={reel.id} style={{textDecoration: 'none'}}>
                <div className={styles.bPostCard}>
                  <img src={reel.img} alt={reel.title} className={styles.bPostImg} />
                  <div className={styles.bPostStats}>
                    <div className={styles.bPostStatItem}>
                      <div className={styles.bPostStatVal}>{reel.views}</div>
                      <div className={styles.bPostStatLab}>Views</div>
                    </div>
                    <div className={styles.bPostStatItem}>
                      <div className={styles.bPostStatVal}>{reel.likes || '4.2K'}</div>
                      <div className={styles.bPostStatLab}>Likes</div>
                    </div>
                    <div className={styles.bPostStatItem}>
                      <div className={styles.bPostStatVal}>{reel.comments || '128'}</div>
                      <div className={styles.bPostStatLab}>Cmt</div>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
