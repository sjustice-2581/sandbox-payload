import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { getPayload } from 'payload'
import config from '@payload-config'

// Helper function to render Lexical rich text
function renderLexicalContent(node: any): React.ReactNode {
  if (!node) return null

  if (node.type === 'root') {
    return node.children?.map((child: any, index: number) => (
      <div key={index}>{renderLexicalContent(child)}</div>
    ))
  }

  if (node.type === 'paragraph') {
    return (
      <p className="mb-4">
        {node.children?.map((child: any, index: number) => (
          <span key={index}>{renderLexicalContent(child)}</span>
        ))}
      </p>
    )
  }

  if (node.type === 'text') {
    let content = node.text

    // Handle formatting
    if (node.format & 1) content = <strong>{content}</strong> // Bold
    if (node.format & 2) content = <em>{content}</em> // Italic
    if (node.format & 8) content = <u>{content}</u> // Underline

    return content
  }

  if (node.type === 'heading') {
    const HeadingTag = `h${node.tag}` as keyof JSX.IntrinsicElements
    return (
      <HeadingTag
        className={`mb-4 font-bold ${node.tag === '1' ? 'text-3xl' : node.tag === '2' ? 'text-2xl' : 'text-xl'}`}
      >
        {node.children?.map((child: any, index: number) => (
          <span key={index}>{renderLexicalContent(child)}</span>
        ))}
      </HeadingTag>
    )
  }

  if (node.type === 'list') {
    const ListTag = node.listType === 'number' ? 'ol' : 'ul'
    return (
      <ListTag className={`mb-4 ${node.listType === 'number' ? 'list-decimal' : 'list-disc'} ml-6`}>
        {node.children?.map((child: any, index: number) => (
          <li key={index}>{renderLexicalContent(child)}</li>
        ))}
      </ListTag>
    )
  }

  if (node.type === 'listitem') {
    return node.children?.map((child: any, index: number) => (
      <span key={index}>{renderLexicalContent(child)}</span>
    ))
  }

  // Handle other node types as needed
  return null
}

type Props = {
  params: Promise<{
    slug: string
  }>
}

// Generate metadata for SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const payload = await getPayload({ config })

  try {
    const result = await payload.find({
      collection: 'pages', // Try lowercase first
      where: {
        slug: {
          equals: slug,
        },
      },
      limit: 1,
    })

    const page = result.docs[0]

    if (!page) {
      return {
        title: 'Page Not Found',
      }
    }

    return {
      title: page.title || 'Untitled Page',
      description: page.meta?.description || '',
      openGraph: {
        title: page.meta?.title || page.title || 'Untitled Page',
        description: page.meta?.description || '',
        images: page.meta?.image
          ? [
              {
                url: typeof page.meta.image === 'string' ? page.meta.image : page.meta.image.url,
              },
            ]
          : [],
      },
    }
  } catch (error) {
    console.error('Error generating metadata:', error)
    return {
      title: 'Page Not Found',
    }
  }
}

// Main page component
export default async function Page({ params }: Props) {
  const { slug } = await params
  const payload = await getPayload({ config })

  let page

  try {
    const result = await payload.find({
      collection: 'pages', // Try lowercase first
      where: {
        slug: {
          equals: slug,
        },
      },
      limit: 1,
    })

    page = result.docs[0]
  } catch (error) {
    console.error('Error fetching page:', error)
    notFound()
  }

  if (!page) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <article>
        {page.title && (
          <header className="mb-8">
            <h1 className="text-4xl font-bold mb-4">{page.title}</h1>
          </header>
        )}

        {page.author && (
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">
              <strong>Author:</strong> {page.author.name}
            </p>
            {page.author.bio && <p className="text-sm text-gray-600 mt-2">{page.author.bio}</p>}
          </div>
        )}

        {page.content && Array.isArray(page.content) && (
          <div className="prose prose-lg max-w-none">
            {page.content.map((block: any, index: number) => (
              <div key={block.id || index} className="mb-8">
                {block.blockType === 'content' && block.body && (
                  <div className="content-block">{renderLexicalContent(block.body.root)}</div>
                )}

                {/* Add other block types here as needed */}
                {block.blockType === 'hero' && (
                  <div className="bg-blue-50 p-8 rounded-lg">
                    <h2 className="text-3xl font-bold mb-4">{block.heading}</h2>
                    <p className="text-lg">{block.subheading}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </article>
    </div>
  )
}

// Generate static params for better performance (optional)
export async function generateStaticParams() {
  const payload = await getPayload({ config })

  try {
    const pages = await payload.find({
      collection: 'pages', // Try lowercase first
      limit: 100, // Adjust based on your needs
      select: {
        slug: true,
      },
    })

    console.log('Found pages:', pages.docs.length)
    console.log('Pages data:', JSON.stringify(pages.docs, null, 2))

    // Filter out pages without slugs and ensure slug is a string
    const validPages = pages.docs.filter((page: any) => {
      const hasValidSlug = page.slug && typeof page.slug === 'string' && page.slug.trim() !== ''
      if (!hasValidSlug) {
        console.warn('Page without valid slug found:', page)
      }
      return hasValidSlug
    })

    const params = validPages.map((page: any) => ({
      slug: page.slug,
    }))

    console.log('Generated static params:', JSON.stringify(params, null, 2))
    return params
  } catch (error) {
    console.error('Error generating static params:', error)
    return []
  }
}
