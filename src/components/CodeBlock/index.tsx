import React from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { tomorrow as codeTheme } from 'react-syntax-highlighter/dist/styles/prism'

interface CodeBlockProps {
    value: string
    language?: string
}
const CodeBlock: React.FC<CodeBlockProps> = ({ value, language = null }) => {
    return (
        <SyntaxHighlighter language={language} style={codeTheme}>
            { value }
        </SyntaxHighlighter>
    )
}

export default CodeBlock
