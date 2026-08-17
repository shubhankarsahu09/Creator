"use client";

import { useState } from 'react';
import Link from 'next/link';
import styles from './page.module.css';

export default function CreatorWebsitePage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    budget: 1000,
    currency: 'USD',
    description: '',
    pagesBrand: false,
    pagesMediacade: false,
    pagesThis: false,
    pagesThat: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const target = e.target as HTMLInputElement;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    setFormData({ ...formData, [target.name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Convert boolean pages to string for form submission
    const selectedPages = [
      formData.pagesBrand ? "Brand" : null,
      formData.pagesMediacade ? "My Mediacade" : null,
      formData.pagesThis ? "My This" : null,
      formData.pagesThat ? "My That" : null
    ].filter(Boolean).join(", ");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "20523f8b-5c89-46c6-928b-164e78338cdf",
          name: formData.name,
          email: formData.email,
          budget: `${formData.currency} ${formData.budget}`,
          requested_pages: selectedPages || "None specifically selected",
          description: formData.description,
          subject: "New Creator Website Request!"
        }),
      });
      const data = await res.json();
      if (data.success) {
        setIsSuccess(true);
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.container}>
      <Link href="/" className={styles.backBtn}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
        Back to Home
      </Link>

      <div className={styles.header}>
        <h1 className={styles.title}>Build Your <span className={styles.titleHighlight}>Website.</span></h1>
        <p className={styles.subtitle}>Get a premium, high-converting creator portfolio just like this one. Fill in the details below and I'll get in touch.</p>
      </div>

      <div className={styles.contentGrid}>
        <div className={styles.box}>
          {isSuccess ? (
            <div className={styles.successMessage}>
              <div className={styles.successIcon}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6L9 17l-5-5"/>
                </svg>
              </div>
              <h2 className={styles.successTitle}>Request Sent!</h2>
              <p className={styles.successDesc}>Thank you for reaching out. I will get back to you shortly to discuss your new website.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="name">Full Name</label>
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
                <label className={styles.label} htmlFor="email">Email Address</label>
                <input 
                  type="email" 
                  id="email"
                  name="email" 
                  className={styles.input} 
                  placeholder="name@example.com"
                  required 
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Which pages do you need?</label>
                <div className={styles.checkboxGroup}>
                  <label className={styles.checkboxLabel}>
                    <input type="checkbox" name="pagesBrand" checked={formData.pagesBrand} onChange={handleChange} />
                    1. Brand
                  </label>
                  <label className={styles.checkboxLabel}>
                    <input type="checkbox" name="pagesMediacade" checked={formData.pagesMediacade} onChange={handleChange} />
                    2. My Mediacade
                  </label>
                  <label className={styles.checkboxLabel}>
                    <input type="checkbox" name="pagesThis" checked={formData.pagesThis} onChange={handleChange} />
                    3. My This
                  </label>
                  <label className={styles.checkboxLabel}>
                    <input type="checkbox" name="pagesThat" checked={formData.pagesThat} onChange={handleChange} />
                    4. My That
                  </label>
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="description">Website Details (proper detailing, number of pages, etc.)</label>
                <textarea 
                  id="description"
                  name="description" 
                  className={styles.textarea} 
                  placeholder="Describe your vision..."
                  required
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="budget">Estimated Budget</label>
                <div className={styles.rangeGroup}>
                  <select 
                    name="currency" 
                    className={styles.select} 
                    style={{ width: '100px', flexShrink: 0 }}
                    value={formData.currency}
                    onChange={handleChange}
                  >
                    <option value="USD">USD</option>
                    <option value="INR">INR</option>
                  </select>
                  
                  <input 
                    type="range"
                    id="budget"
                    name="budget"
                    min="0"
                    max={formData.currency === 'USD' ? 10000 : 1000000}
                    step={formData.currency === 'USD' ? 100 : 10000}
                    className={styles.rangeSlider}
                    value={formData.budget}
                    onChange={handleChange}
                  />
                  <span className={styles.rangeValue}>
                    {formData.currency === 'USD' ? '$' : '₹'}{formData.budget.toLocaleString()}
                  </span>
                </div>
              </div>

              <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Send Request'}
              </button>
            </form>
          )}
        </div>
        
        <div className={styles.box}>
          <div className={styles.infoSection}>
            <h3 className={styles.infoTitle}>Why get a custom website?</h3>
            <p className={styles.infoText}>
              A dedicated portfolio sets you apart from the crowd. It serves as a central hub for your brand, media kit, and links, making it easier for sponsors to find and work with you.
            </p>
          </div>
          <div className={styles.infoSection}>
            <h3 className={styles.infoTitle}>What to expect</h3>
            <p className={styles.infoText}>
              Once you submit this form, I will review your requirements and reach out via email. We'll discuss your specific needs, timelines, and ensure the budget aligns perfectly with the scope of work.
            </p>
          </div>
          <div className={styles.infoSection}>
            <h3 className={styles.infoTitle}>Follow Us</h3>
            <a href="https://instagram.com/setuprizx" target="_blank" rel="noopener noreferrer" className={styles.socialBtn}>
              Instagram
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginLeft: '4px'}}><path d="M5 12h14"></path><path d="M12 5l7 7-7 7"></path></svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
