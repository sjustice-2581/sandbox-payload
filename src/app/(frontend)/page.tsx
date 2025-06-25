// src/app/(frontend)/page.tsx
import React from 'react'

const getHomePage = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/pages?where[slug][equals]=home`,
    {
      cache: 'no-store', // optional: disables ISR/SSG for dev
    },
  )
  const data = await res.json()
  return data?.docs?.[0]
}

export default async function Home() {
  const page = await getHomePage()

  if (!page) {
    return <div>⚠️ Fuck me! Home Page Not Found</div>
  }

  return (
    <main>
      <h1>{page.title}</h1>
      {page.content?.map((block: any, i: number) => {
        if (block.blockType === 'content') {
          return (
            <section key={i}>
              {block.body?.root?.children?.map((child: any, index: number) => {
                if (child.type === 'heading') {
                  return <h2 key={index}>{child.children?.[0]?.text}</h2>
                }
                return null
              })}
            </section>
          )
        }
        return null
      })}
    </main>
  )
}
