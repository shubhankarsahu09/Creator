"use client";

import { useState } from 'react';
import Link from 'next/link';
import styles from './page.module.css';

export default function CollabPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    email: '',
    budget: '',
    currency: 'USD',
    projectDetails: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call for now
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };

  return (
    <div className={styles.container}>
      <Link href="/" className={styles.backBtn}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
        Back to Home
      </Link>

      <div className={styles.formWrapper}>
        {isSubmitted ? (
          <div className={styles.successMessage}>
            <div className={styles.successIcon}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6L9 17l-5-5"/>
              </svg>
            </div>
            <h2 className={styles.successTitle}>Request Sent!</h2>
            <p className={styles.successDesc}>Thank you for reaching out. We will get back to you shortly.</p>
          </div>
        ) : (
          <>
            <div className={styles.header}>
              <h1 className={styles.title}>Let's Collaborate</h1>
              <p className={styles.subtitle}>Fill out the form below and let's create something amazing together.</p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="name">Your Name</label>
                <input 
                  type="text" 
                  id="name"
                  name="name" 
                  className={styles.input} 
                  placeholder="John Doe"
                  required 
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="brand">Brand / Company</label>
                <input 
                  type="text" 
                  id="brand"
                  name="brand" 
                  className={styles.input} 
                  placeholder="Acme Corp"
                  required 
                  value={formData.brand}
                  onChange={handleChange}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="email">Email Address</label>
                <input 
                  type="email" 
                  id="email"
                  name="email" 
                  className={styles.input} 
                  placeholder="john@acme.com"
                  required 
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="budget">Estimated Budget</label>
                <div className={styles.budgetInputGroup}>
                  <select 
                    name="currency" 
                    className={`${styles.input} ${styles.currencySelect}`}
                    value={formData.currency}
                    onChange={handleChange}
                  >
                    <option value="USD">USD</option>
                    <option value="INR">INR</option>
                  </select>
                  <input 
                    type="number"
                    id="budget"
                    name="budget" 
                    className={styles.input} 
                    placeholder="e.g. 5000"
                    required
                    value={formData.budget}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="projectDetails">Project Details</label>
                <textarea 
                  id="projectDetails"
                  name="projectDetails" 
                  className={styles.textarea} 
                  placeholder="Tell me a bit about your brand and what you're looking to achieve..."
                  required
                  value={formData.projectDetails}
                  onChange={handleChange}
                />
              </div>

              <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Send Request'}
                {!isSubmitting && (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="22" y1="2" x2="11" y2="13"></line>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                  </svg>
                )}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
