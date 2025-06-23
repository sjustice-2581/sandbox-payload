import type { Block } from 'payload/types'

const ContentBlock: Block = {
  slug: 'content',
  labels: {
    singular: 'Content Block',
    plural: 'Content Blocks',
  },
  fields: [
    {
      name: 'body',
      type: 'richText',
      required: true,
    },
  ],
}

export default ContentBlock
