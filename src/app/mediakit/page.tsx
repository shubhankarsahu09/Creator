import Link from 'next/link';
import styles from './page.module.css';

export default function MediaKitPage() {
  return (
    <div className={styles.container}>
      <Link href="/" className={styles.backBtn}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
        Back to Home
      </Link>
      <iframe 
        src="https://beacons.ai/setuprizx/mediakit" 
        className={styles.iframe}
        title="Beacon MediaKit"
        frameBorder="0"
        allowFullScreen
      />
    </div>
  );
}
