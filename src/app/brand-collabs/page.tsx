import Link from 'next/link';
import styles from './page.module.css';

export interface BrandCollab {
  id: string;
  brand: string;
  category?: string;
  collabType?: string;
  date?: string;
  summary: string;
  deliverables?: string[];
  metric?: string;
  link?: string;
  logo?: string;
}

const brandCollabs: BrandCollab[] = [];

export default function BrandCollabsPage() {
  return (
    <div className={styles.container}>
      <Link href="/" className={styles.backBtn}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        Back to Home
      </Link>

      <header className={styles.header}>
        <h1 className={styles.title}>
          Brand <span className={styles.titleHighlight}>Collabs.</span>
        </h1>
        <p className={styles.subtitle}>
          Brands and campaigns I&apos;ve partnered with to create high-converting tech &amp; setup content.
        </p>
      </header>

      <main className={styles.main}>
        {brandCollabs.length > 0 ? (
          <div className={styles.grid}>
            {brandCollabs.map((collab) => (
              <article key={collab.id} className={styles.card}>
                <div className={styles.cardTop}>
                  <div className={styles.brandIdentity}>
                    {collab.logo ? (
                      <img src={collab.logo} alt={collab.brand} className={styles.brandLogo} />
                    ) : (
                      <div className={styles.brandMonogram} aria-hidden="true">
                        {collab.brand.slice(0, 2).toUpperCase()}
                      </div>
                    )}
                    <div>
                      <h2 className={styles.brandName}>{collab.brand}</h2>
                      {(collab.category || collab.date) && (
                        <p className={styles.brandMeta}>
                          {[collab.category, collab.date].filter(Boolean).join(' · ')}
                        </p>
                      )}
                    </div>
                  </div>
                  {collab.collabType && (
                    <span className={styles.badge}>{collab.collabType}</span>
                  )}
                </div>

                <p className={styles.summary}>{collab.summary}</p>

                {collab.deliverables && collab.deliverables.length > 0 && (
                  <div className={styles.tags}>
                    {collab.deliverables.map((item) => (
                      <span key={item} className={styles.tag}>
                        {item}
                      </span>
                    ))}
                  </div>
                )}

                <div className={styles.cardFooter}>
                  {collab.metric && (
                    <span className={styles.metric}>{collab.metric}</span>
                  )}
                  {collab.link && (
                    <a
                      href={collab.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.cardLink}
                    >
                      View Campaign
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M7 17L17 7M17 7H8M17 7V16" />
                      </svg>
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        ) : (
          <section className={styles.emptyCard}>
            <span className={styles.emptyEyebrow}>Showcase</span>
            <h2 className={styles.emptyTitle}>Collaborations Coming Soon</h2>
            <p className={styles.emptyDesc}>
              Featured brand partnerships, sponsored reels, and campaign highlights will be added here shortly.
            </p>
            <Link href="/collab" className={styles.collabCta}>
              Partner with me
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </section>
        )}
      </main>
    </div>
  );
}
