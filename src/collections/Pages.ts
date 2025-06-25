import ContentBlock from '../blocks/ContentBlock'
import LayoutBlock from '../blocks/LayoutBlock'

export const Pages: CollectionConfig = {
  slug: 'pages',
  access: {
    read: () => true, // <-- allow public read access
  },
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'authors',
      required: true,
      hasMany: false, // single author per page; set to true if you want multiple authors
    },
    {
      name: 'content',
      type: 'blocks',
      blocks: [ContentBlock, LayoutBlock],
      required: true,
    },
  ],
}
