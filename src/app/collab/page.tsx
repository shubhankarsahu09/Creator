"use client";

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import styles from './page.module.css';

const CustomDropdown = ({ options, value, onChange, className }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const selectedOption = options.find((o: any) => o.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={`${styles.customSelectWrapper} ${className || ''}`} ref={dropdownRef}>
      <div 
        className={`${styles.input} ${styles.customSelectHeader} ${isOpen ? styles.customSelectHeaderOpen : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{selectedOption?.label || ''}</span>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'transform 0.3s', transform: isOpen ? 'rotate(180deg)' : 'rotate(0)' }}>
          <path d="M6 9l6 6 6-6" />
        </svg>
      </div>
      {isOpen && (
        <div className={styles.customSelectList}>
          {options.map((opt: any) => (
            <div 
              key={opt.value} 
              className={`${styles.customSelectItem} ${value === opt.value ? styles.customSelectItemSelected : ''}`}
              onClick={() => {
                onChange(opt.value);
                setIsOpen(false);
              }}
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default function CollabPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    email: '',
    collabType: 'paid',
    budget: '',
    currency: 'USD',
    projectDetails: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "32f9f8fe-868b-4ed7-8df2-4268b1e0dd1d",
          ...formData,
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
        <h1 className={styles.title}>Let's <span className={styles.titleHighlight}>Collaborate.</span></h1>
        <p className={styles.subtitle}>We're here to help you get the most out of your brand. Reach out and let's create something amazing together.</p>
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
              <p className={styles.successDesc}>Thank you for reaching out. We will get back to you shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <input type="hidden" name="collabType" value={formData.collabType} />
              <input type="hidden" name="currency" value={formData.currency} />
              
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
                  placeholder="name@example.com"
                  required 
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="collabType">Topic</label>
                <CustomDropdown
                  options={[
                    { value: 'paid', label: 'Paid Collab' },
                    { value: 'barter', label: 'Barter Collab' }
                  ]}
                  value={formData.collabType}
                  onChange={(val: string) => setFormData({ ...formData, collabType: val })}
                />
              </div>

              {formData.collabType === 'paid' && (
                <div className={styles.formGroup}>
                  <label className={styles.label} htmlFor="budget">Estimated Budget</label>
                  <div className={styles.budgetInputGroup}>
                    <CustomDropdown
                      className={styles.currencySelectWrapper}
                      options={[
                        { value: 'USD', label: 'USD' },
                        { value: 'INR', label: 'INR' }
                      ]}
                      value={formData.currency}
                      onChange={(val: string) => setFormData({ ...formData, currency: val })}
                    />
                    <input 
                      type="number"
                      id="budget"
                      name="budget" 
                      className={styles.input} 
                      placeholder="e.g. 5000"
                      min="0"
                      required
                      value={formData.budget}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              )}

              {formData.collabType === 'barter' && (
                <div className={styles.formGroup}>
                  <label className={styles.label} htmlFor="budget">Product / Service Offered</label>
                  <input 
                    type="text"
                    id="budget"
                    name="budget" 
                    className={styles.input} 
                    placeholder="e.g. 1 Year Pro Subscription"
                    required
                    value={formData.budget}
                    onChange={handleChange}
                  />
                </div>
              )}

              <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="projectDetails">Message</label>
                <textarea 
                  id="projectDetails"
                  name="projectDetails" 
                  className={styles.textarea} 
                  placeholder="How can we help?"
                  required
                  value={formData.projectDetails}
                  onChange={handleChange}
                />
              </div>

              <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          )}
        </div>
        
        <div className={styles.box}>
          <div className={styles.infoSection}>
            <h3 className={styles.infoTitle}>Response Time</h3>
            <p className={styles.infoText}>
              Our typical response time is within 2-4 hours during business days. We operate between 9:00 AM and 6:00 PM IST.
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
