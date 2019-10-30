import { InlineMath, BlockMath } from 'react-katex'

const renderLatex = (content, index) => {
  const isBlock = content.search(/\n/) !== -1
  if (isBlock) {
    return <BlockMath key={index}>{content}</BlockMath>
  }
  return <InlineMath key={index}>{content}</InlineMath>
}

const renderCode = (content, index) => {
  const cleaned = content
    .replace(/\n+/, '')
    .replace(/\n+$/, '')
  const isBlock = cleaned.search(/\n/) !== -1

  if (isBlock) {
    return (
      <code
        key={index}
        style={{ display: 'block', whiteSpace: 'pre-wrap' }}
      >
        {cleaned}
      </code>
    )
  }
  return <code key={index}>{cleaned}</code>
}

const parser = (text) => {
  const reFind = /(\[\w+\].+?\[\/\w+\])/gis
  const reMatch = /^\[(\w+)\](.+)\[\/\w+\]$/s
  const arr = text.split(reFind)

  return arr.map((text, index) => {
    try {
      const matches = text.match(reMatch)
      const bbName = matches[1]
      const content = matches[2]

      switch (bbName) {
        case 'latex':
          return renderLatex(content, index)
        case 'code':
          return renderCode(content, index)
        default:
          return text
      }
    } catch {
      return text
    }
  })
}

const WithCode = ({ children }) => {
  return (
    <>
      {parser(children)}
    </>
  )
}

export default WithCode
