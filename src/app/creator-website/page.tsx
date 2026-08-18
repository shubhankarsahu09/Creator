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
    currency: 'INR',
    plan: 'Plan 1',
    description: '',
    requestedPages: '',
  });

  const getPlans = () => {
    if (formData.currency === 'INR') {
      return [
        { id: 'Plan 1', price: '₹99', title: 'Basic', desc: '2 pages: 1st contact form (customizable), 2nd media kit.' },
        { id: 'Plan 2', price: '₹299', title: 'Standard', desc: '4 pages: 1st contact form (customizable), 2nd Beacon Media Kit, 3rd & 4th anything you want (customizable).' },
        { id: 'Plan 3', price: '₹599', title: 'Premium', desc: 'Any number of pages: contact page, media kit, and all customizable pages you want.' },
      ];
    }
    return [
      { id: 'Plan 1', price: '$1.99', title: 'Basic', desc: '2 pages: 1st contact form (customizable), 2nd media kit.' },
      { id: 'Plan 2', price: '$3.99', title: 'Standard', desc: '4 pages: 1st contact form (customizable), 2nd Beacon Media Kit, 3rd & 4th anything you want (customizable).' },
      { id: 'Plan 3', price: '$7.99', title: 'Premium', desc: 'Any number of pages: contact page, media kit, and all customizable pages you want.' },
    ];
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const target = e.target as HTMLInputElement;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    setFormData({ ...formData, [target.name]: value });
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
          access_key: "20523f8b-5c89-46c6-928b-164e78338cdf",
          name: formData.name,
          email: formData.email,
          selected_plan: `${formData.currency} - ${formData.plan}`,
          requested_pages: formData.requestedPages,
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
                <label className={styles.label} htmlFor="requestedPages">Which pages do you need?</label>
                <input 
                  type="text" 
                  id="requestedPages"
                  name="requestedPages" 
                  className={styles.input} 
                  placeholder="e.g. Home, Brand, Media Kit, Links..."
                  required 
                  value={formData.requestedPages}
                  onChange={handleChange}
                />
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
                <label className={styles.label} htmlFor="currency">Currency</label>
                <select 
                  name="currency" 
                  id="currency"
                  className={styles.select} 
                  value={formData.currency}
                  onChange={handleChange}
                >
                  <option value="INR">INR</option>
                  <option value="USD">USD</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Select a Plan</label>
                <div className={styles.planContainer}>
                  {getPlans().map(plan => (
                    <label key={plan.id} className={`${styles.planCard} ${formData.plan === plan.id ? styles.planCardActive : ''}`}>
                      <input 
                        type="radio" 
                        name="plan" 
                        value={plan.id} 
                        checked={formData.plan === plan.id} 
                        onChange={handleChange} 
                        className={styles.planRadio}
                      />
                      <div className={styles.planHeader}>
                        <span className={styles.planTitle}>{plan.title}</span>
                        <span className={styles.planPrice}>{plan.price}</span>
                      </div>
                      <p className={styles.planDesc}>{plan.desc}</p>
                    </label>
                  ))}
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
