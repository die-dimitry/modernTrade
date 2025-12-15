import React from 'react'

const COUNTRIES = [
  { code: 'IN', dialCode: '+91', name: 'India', maxLength: 10 },
  { code: 'US', dialCode: '+1', name: 'United States', maxLength: 10 },
  { code: 'GB', dialCode: '+44', name: 'United Kingdom', maxLength: 10 },
  { code: 'AU', dialCode: '+61', name: 'Australia', maxLength: 9 },
  { code: 'CA', dialCode: '+1', name: 'Canada', maxLength: 10 },
  { code: 'DE', dialCode: '+49', name: 'Germany', maxLength: 11 },
  { code: 'FR', dialCode: '+33', name: 'France', maxLength: 9 },
  { code: 'JP', dialCode: '+81', name: 'Japan', maxLength: 10 },
  { code: 'CN', dialCode: '+86', name: 'China', maxLength: 11 },
  { code: 'AE', dialCode: '+971', name: 'UAE', maxLength: 9 },
]

export default function PhoneInput({ value, onChange, country: selectedCountry, onCountryChange, name, placeholder, className }) {
  const country = COUNTRIES.find(c => c.code === selectedCountry) || COUNTRIES[0]
  const phoneNumber = value?.replace(country.dialCode, '').trim() || ''
  
  const handlePhoneChange = (e) => {
    const input = e.target.value.replace(/\D/g, '').slice(0, country.maxLength)
    const fullNumber = `${country.dialCode}${input}`
    onChange({ target: { name, value: fullNumber } })
  }

  return (
    <div className="flex gap-2">
      <select
        value={country.code}
        onChange={(e) => {
          const newCountry = COUNTRIES.find(c => c.code === e.target.value)
          if (onCountryChange) onCountryChange(newCountry.code)
          // Clear the phone number when country changes
          onChange({ target: { name, value: newCountry.dialCode } })
        }}
        className="w-28 sm:w-36 p-3 bg-black border-2 border-gray-700 rounded-lg text-white text-sm focus:border-primary focus:outline-none"
      >
        {COUNTRIES.map(c => (
          <option key={c.code} value={c.code}>
            {c.code} {c.dialCode}
          </option>
        ))}
      </select>
      <input
        type="tel"
        name={name}
        value={phoneNumber}
        onChange={handlePhoneChange}
        placeholder={placeholder || `Enter ${country.maxLength} digit phone number`}
        maxLength={country.maxLength}
        className={`flex-1 p-3 bg-black border-2 border-gray-700 rounded-lg text-white focus:border-primary focus:outline-none ${className || ''}`}
      />
    </div>
  )
}





