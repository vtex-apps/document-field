# Document Field

Document Field is a VTEX IO app that handles formatting and validation of documents, based on a pre-defined
document type. It includes a UI component that renders a input with a listbox, listing all available document
types we currently support.

<img width="314" alt="image" src="https://user-images.githubusercontent.com/10223856/77350379-34774e00-6d1b-11ea-8f0e-7290278ede84.png">

## Usage

To use this app, you first need to add it in your `manifest.json` file, like so

```json
{
  "dependencies": {
    "vtex.document-field": "0.x"
  }
}
```

> If you are developing in TypeScript, you may also want to run `vtex setup` after the step above

Then you can import the document field component and use it in your forms:

```jsx
import * as React from 'react'
import { DocumentField } from 'vtex.document-field'

const Form = () => {
  const [document, setDocument] = React.useState('')
  const [documentType, setDocumentType] = React.useState('cpf')

  const handleDocumentChange = data => {
    setDocument(data.document)
    setDocumentType(data.documentType)

    // you can also use `data.isValid` to show some
    // validation errors
  }

  return (
    <form>
      <DocumentField
        label="Document"
        document={document}
        documentType={documentType}
        onChange={handleDocumentChange}
      />
    </form>
  )
}
```

## Components

### DocumentField

Responsible for rendering the listbox with the text field and formatting and validating the document.

#### Props

The `DocumentField` component also accepts all props of [Styleguide's `Input`](https://styleguide.vtex.com/#/Components/Forms/Input),
except for the `value`, `onChange` and `prefix`, which are used internally by this component.

| Prop name | Type | Required |
| --- | --- | --- |
| [`document`](#documentfield-document) | `string` | `true` |
| [`documentType`](#documentfield-documenttype) | `string` | `true` |
| [`onChange`](#documentfield-onchange) | `func` | `false` |

##### DocumentField document

`document: string`

The document value.

##### DocumentField documentType

`documentType: string`

The document type. E.g.: `cpf`, `ssn`, `dni`.

##### DocumentField onChange

`onChange: (data: { document: string; documentType: string; isValid: boolean }) => void`

Callback to trigger the change of document value. Can be triggered by either typing on the text field
or by changing the document type within the listbox.
