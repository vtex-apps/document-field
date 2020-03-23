import msk from 'msk'
import * as React from 'react'
import { Input, InputProps } from 'vtex.styleguide'

import { CPF_MASK, unmaskCPF, validateCPF } from './utils/validation'

interface DocumentData {
  document: string
  documentType: string
  isValid: boolean
}

interface Props extends Omit<InputProps, 'onChange' | 'value' | 'prefix'> {
  documentType?: string
  document?: string
  onChange?: (data: DocumentData) => void
}

const DocumentField = React.forwardRef<HTMLInputElement, Props>(
  function DocumentField(
    { documentType = 'cpf', document = '', onChange = () => {}, ...props },
    ref
  ) {
    const handleDocumentChange: React.ChangeEventHandler<HTMLInputElement> = evt => {
      const value = msk.fit(evt.target.value, CPF_MASK)

      onChange({
        document: unmaskCPF(value),
        documentType,
        isValid: validateCPF(value),
      })
    }

    return (
      <Input
        {...props}
        ref={ref}
        prefix={<span className="ttu">{documentType}</span>}
        value={msk(document, CPF_MASK)}
        onChange={handleDocumentChange}
      />
    )
  }
)

export default DocumentField
