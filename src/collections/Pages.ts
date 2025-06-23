import ContentBlock from '../blocks/ContentBlock'
import LayoutBlock from '../blocks/LayoutBlock'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'content',
      type: 'blocks',
      blocks: [ContentBlock, LayoutBlock],
      required: true,
    },
  ],
}
