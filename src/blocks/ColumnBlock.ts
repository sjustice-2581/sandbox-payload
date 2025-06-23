import type { Block } from 'payload/types'
import ContentBlock from './ContentBlock' // reuse the rich text block inside each column

const ColumnBlock: Block = {
  slug: 'column',
  labels: {
    singular: 'Column',
    plural: 'Columns',
  },
  fields: [
    {
      name: 'width',
      type: 'select',
      options: [
        { label: '25%', value: '25' },
        { label: '33%', value: '33' },
        { label: '50%', value: '50' },
        { label: '66%', value: '66' },
        { label: '75%', value: '75' },
        { label: '100%', value: '100' },
      ],
      defaultValue: '50',
      required: true,
    },
    {
      name: 'content',
      type: 'blocks',
      blocks: [ContentBlock],
    },
  ],
}

export default ColumnBlock
