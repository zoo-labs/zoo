import Article from './Article'
import React from 'react'

function Articles({ articles }: { articles: { title?: any; content: any }[] }) {
  return (
    <>
      {articles.map((article, i) => {
        const { title, content } = article;
        return (
          <Article 
            content={content}
            title={title}
          />
        );
      })}
    </>
  )
}

export default Articles
