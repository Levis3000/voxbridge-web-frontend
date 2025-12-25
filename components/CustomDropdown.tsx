'use client'

import { useState, useEffect, useRef } from 'react'
import { ChevronDown } from 'lucide-react'

interface CustomDropdownProps {
  options: { value: string; label: string }[]
  value: string
  onChange: (value: string) => void
  placeholder: string
  className?: string
}

export default function CustomDropdown({
  options,
  value,
  onChange,
  placeholder,
  className = ''
}: CustomDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const selectedOption = options.find(opt => opt.value === value)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  return (
    <div 
      className={`custom-dropdown ${className}`} 
      ref={dropdownRef}
      data-open={isOpen ? 'true' : 'false'}
    >
      <button
        type="button"
        className="custom-dropdown-button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Select option"
      >
        <span className={!selectedOption ? 'placeholder' : ''}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown size={16} className={isOpen ? 'rotate' : ''} />
      </button>
      {isOpen && (
        <div className="custom-dropdown-menu">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              className={`custom-dropdown-option ${value === option.value ? 'active' : ''}`}
              onClick={() => {
                onChange(option.value)
                setIsOpen(false)
              }}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

