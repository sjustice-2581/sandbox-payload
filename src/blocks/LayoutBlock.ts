import type { Block } from 'payload/types'
import ColumnBlock from './ColumnBlock'

const LayoutBlock: Block = {
  slug: 'layout',
  labels: {
    singular: 'Layout Row',
    plural: 'Layout Rows',
  },
  fields: [
    {
      name: 'columns',
      type: 'blocks',
      blocks: [ColumnBlock],
      minRows: 1,
      maxRows: 4, // Allow up to 4 columns per row
    },
  ],
}

export default LayoutBlock
