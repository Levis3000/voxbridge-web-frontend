'use client'

import { useState, FormEvent } from 'react'
import { PartyPopper } from 'lucide-react'
import CustomDropdown from './CustomDropdown'
import { supabase } from '@/lib/supabase'

const useCaseOptions = [
  { value: '', label: 'What will you use GlotBridge for?' },
  { value: 'personal', label: 'Personal Calls' },
  { value: 'business', label: 'Business' },
  { value: 'customer-support', label: 'Customer Support' },
  { value: 'education', label: 'Education' },
  { value: 'other', label: 'Other' }
]

export default function Waitlist() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    twitterHandle: '',
    useCase: '',
    featureRequest: ''
  })
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    // Validate form
    if (!formData.name || !formData.email) {
      setMessage({ text: 'Please fill in all required fields.', type: 'error' })
      return
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setMessage({ text: 'Please enter a valid email address.', type: 'error' })
      return
    }

    // Validate Twitter handle format (optional but if provided, should be valid)
    if (formData.twitterHandle && !formData.twitterHandle.match(/^@?[a-zA-Z0-9_]{1,15}$/)) {
      setMessage({ text: 'Please enter a valid Twitter handle (e.g., @username or username).', type: 'error' })
      return
    }

    setIsSubmitting(true)

    try {
      // Normalize Twitter handle (remove @ if present, we'll add it when displaying)
      const normalizedTwitterHandle = formData.twitterHandle
        ? formData.twitterHandle.replace(/^@/, '')
        : null

      // Prepare the data to insert
      const insertData = {
        name: formData.name,
        email: formData.email,
        twitter_handle: normalizedTwitterHandle,
        use_case: formData.useCase || null,
        feature_request: formData.featureRequest.trim() || null,
        created_at: new Date().toISOString()
      }

      // Log for debugging
      console.log('🔍 Attempting to insert waitlist entry:', {
        data: insertData,
        supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
        hasAnonKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        supabaseClient: supabase ? 'initialized' : 'not initialized'
      })

      // Check current session/auth state
      const { data: { session }, error: sessionError } = await supabase.auth.getSession()
      console.log('🔍 Current session:', {
        hasSession: !!session,
        userId: session?.user?.id,
        sessionError: sessionError
      })

      // Insert into Supabase
      const { data, error } = await supabase
        .from('waitlist')
        .insert([insertData])
        .select()

      console.log('🔍 Insert result:', {
        success: !error,
        data: data,
        error: error ? {
          message: error.message,
          code: error.code,
          details: error.details,
          hint: error.hint
        } : null
      })

      if (error) {
        console.error('❌ Supabase error details:', {
          message: error.message,
          code: error.code,
          details: error.details,
          hint: error.hint,
          fullError: error
        })
        throw error
      }
      
      // Success
      setMessage({
        text: `Thanks ${formData.name}! We've added you to the waitlist. We'll notify you at ${formData.email} when we launch!`,
        type: 'success'
      })

      // Reset form
      setFormData({ name: '', email: '', twitterHandle: '', useCase: '', featureRequest: '' })

      // Auto-hide success message after 5 seconds
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (error: any) {
      console.error('Error submitting form:', error)
      setMessage({ 
        text: error.message || 'Something went wrong. Please try again later.', 
        type: 'error' 
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="waitlist" id="waitlist">
      <div className="container">
        <div className="waitlist-content">
          <h2 className="waitlist-title">Want to Try It First? <PartyPopper className="inline-icon" size={36} /></h2>
          <p className="waitlist-subtitle">
            We&apos;re putting the finishing touches on everything! 
            Join our waitlist and be one of the first to experience the magic. 
            We&apos;ll shoot you an email the moment we&apos;re ready!
          </p>
          <form className="waitlist-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Your Name"
                required
                className="form-input"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Your Email"
                required
                className="form-input"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                id="twitterHandle"
                name="twitterHandle"
                placeholder="Your Twitter Handle (optional) @username"
                className="form-input"
                value={formData.twitterHandle}
                onChange={(e) => setFormData({ ...formData, twitterHandle: e.target.value })}
              />
            </div>
            <div className="form-group">
              <CustomDropdown
                options={useCaseOptions}
                value={formData.useCase}
                onChange={(value) => setFormData({ ...formData, useCase: value })}
                placeholder="What will you use GlotBridge for?"
                className="form-input"
              />
            </div>
            <div className="form-group">
              <textarea
                id="featureRequest"
                name="featureRequest"
                placeholder="What improvements or features would you like to see? (optional)"
                className="form-input form-textarea"
                rows={4}
                value={formData.featureRequest}
                onChange={(e) => setFormData({ ...formData, featureRequest: e.target.value })}
              />
            </div>
            <button type="submit" className="cta-button primary large" disabled={isSubmitting}>
              {isSubmitting ? 'Joining...' : 'Join Waitlist'}
            </button>
          </form>
          {message && (
            <div className={`waitlist-message ${message.type}`}>
              {message.text}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

