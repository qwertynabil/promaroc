'use client'

import { useState, type ChangeEvent, type FormEvent } from 'react'
import type { ContactFormData, ContactMessageType } from '@/types'

const initialFormData: ContactFormData = {
  name: '',
  email: '',
  company: '',
  properties: '',
  message: '',
}

export function useContactForm() {
  const [formData, setFormData] = useState<ContactFormData>(initialFormData)
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState<ContactMessageType>('')

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((current) => ({
      ...current,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!formData.name || !formData.email || !formData.company || !formData.message) {
      setMessage('Please fill in all required fields.')
      setMessageType('error')
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setMessage('Please enter a valid email address.')
      setMessageType('error')
      return
    }

    setMessage('Thank you! Our team will contact you within 24 hours to discuss your property management needs.')
    setMessageType('success')
    setFormData(initialFormData)
  }

  return {
    formData,
    message,
    messageType,
    handleChange,
    handleSubmit,
  }
}
