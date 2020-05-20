import msk from 'msk'
import * as React from 'react'
import { Input, InputProps } from 'vtex.styleguide'

import { CPF_MASK, validateCPF } from './utils/validation'

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
    const [focused, setFocused] = React.useState(false)

    const handleDocumentChange: React.ChangeEventHandler<HTMLInputElement> = evt => {
      onChange({
        document: evt.target.value,
        documentType,
        isValid: true,
      })
    }

    const onChangeRef = React.useRef(onChange)

    React.useEffect(() => {
      onChangeRef.current = onChange
    }, [onChange])

    React.useEffect(() => {
      if (focused || documentType !== 'cpf') {
        return
      }

      const value = msk(document, CPF_MASK)

      onChangeRef.current({
        document: value,
        isValid: validateCPF(value),
        documentType,
      })
    }, [focused, documentType, document])

    const handleBlur: React.FocusEventHandler<HTMLInputElement> = evt => {
      setFocused(false)
      props.onBlur?.(evt)
    }

    const handleFocus: React.FocusEventHandler<HTMLInputElement> = evt => {
      setFocused(true)
      props.onFocus?.(evt)
    }

    return (
      <Input
        {...props}
        ref={ref}
        prefix={<span className="ttu">{documentType}</span>}
        value={document}
        onChange={handleDocumentChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
      />
    )
  }
)

export default DocumentField
