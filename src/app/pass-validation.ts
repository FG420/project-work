import React from 'react'

export default function passvalidation() {
    const passwordValidation = new RegExp(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
      )
  return (
    passwordValidation
  )
}

