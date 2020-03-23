import * as React from 'react'
import { render, fireEvent } from '@vtex/test-tools/react'

import DocumentField from '../DocumentField'

describe('DocumentField', () => {
  it('should mask correctly BRA documents', () => {
    const Component = () => {
      return (
        <DocumentField
          label="Document"
          documentType="cpf"
          document="11111111111"
        />
      )
    }

    const { getByLabelText } = render(<Component />)

    const input = getByLabelText(/document/i)

    expect(input).toHaveValue('111.111.111-11')
  })

  it('should clamp exceeding characters on change', () => {
    const Component: React.FC = () => {
      const [document, setDocument] = React.useState('')
      const [documentType, setDocumentType] = React.useState('cpf')

      const handleDocumentChange = (data: {
        document: string
        documentType: string
      }) => {
        setDocument(data.document)
        setDocumentType(data.documentType)
      }

      return (
        <DocumentField
          label="Document"
          document={document}
          documentType={documentType}
          onChange={handleDocumentChange}
        />
      )
    }

    const { getByLabelText } = render(<Component />)

    const input = getByLabelText(/document/i)

    fireEvent.change(input, { target: { value: '123456789' } })

    expect(input).toHaveValue('123.456.789')

    fireEvent.change(input, { target: { value: '12345678901' } })

    expect(input).toHaveValue('123.456.789-01')

    fireEvent.change(input, { target: { value: '123456789012' } })

    expect(input).toHaveValue('123.456.789-01')
  })
})
