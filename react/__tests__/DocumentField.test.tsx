import * as React from 'react'
import { render, fireEvent, wait } from '@vtex/test-tools/react'

import DocumentField from '../DocumentField'

describe('DocumentField', () => {
  it('should correctly mask BRA documents', async () => {
    const Component = () => {
      const [document, setDocument] = React.useState('11111111111')
      return (
        <DocumentField
          label="Document"
          documentType="cpf"
          document={document}
          onChange={(data: { document: string }) => setDocument(data.document)}
        />
      )
    }

    const { getByLabelText } = render(<Component />)

    const input = getByLabelText(/document/i)

    await wait(() => void expect(input).toHaveValue('111.111.111-11'))
  })

  it('should only mask value on field blur', () => {
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

    fireEvent.focus(input)

    fireEvent.change(input, { target: { value: '123456789' } })

    expect(input).toHaveValue('123456789')

    fireEvent.change(input, { target: { value: '12345678901' } })

    expect(input).toHaveValue('12345678901')

    fireEvent.blur(input)

    expect(input).toHaveValue('123.456.789-01')
  })

  it("should not format if document isn't cpf", () => {
    const AnotherDocComponent: React.FC = () => {
      const [document, setDocument] = React.useState('')
      const [documentType, setDocumentType] = React.useState('another-document')

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

    const { getByLabelText } = render(<AnotherDocComponent />)

    const input = getByLabelText(/document/i)

    fireEvent.focus(input)

    fireEvent.change(input, { target: { value: '123456789' } })

    fireEvent.blur(input)

    expect(input).toHaveValue('123456789')
  })

  it('should allow input of any special characters', () => {
    const Component: React.FC = () => {
      const [document, setDocument] = React.useState('')
      const [documentType, setDocumentType] = React.useState('')

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

    fireEvent.change(input, { target: { value: 'abc123.,[]&*()' } })

    expect(input).toHaveValue('abc123.,[]&*()')
  })
})
