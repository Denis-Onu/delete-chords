import { useState, useEffect } from 'react';
import { Container, Box, Textarea, FormLabel, Button } from '@chakra-ui/react'
import { ChordProParser, HtmlFormatter, FormatterSettings } from "chordproject-parser"


function App() {
  const [text, setText] = useState('')
  const [songHtml, setSongHtml] = useState('')

  const deleteChords = (e) => {
    e.preventDefault()

    const parser = new ChordProParser()
    const parsedSong = parser.parse(text)

    const settings = new FormatterSettings()
    settings.showChords = false
    const formatter = new HtmlFormatter(settings)
    const songText = formatter.format(parsedSong)
    setSongHtml(songText.join(''))
  }

  useEffect(() => {
    const lines = document.querySelectorAll('.lyrics-line')
    lines.forEach(line => {
      let newLine = ''
      const words = line.querySelectorAll('.word')
      if (words.length > 0) {
        words.forEach(word => {
          let newWord = ''
          const syllables = word.querySelectorAll('.lyrics')

          syllables.forEach(syllable => {
            newWord += syllable.innerText
          })

          newWord += ' '
          newLine += newWord
        })

        line.innerHTML = newLine
      }
    })
    const emptyLines = document.querySelectorAll('.empty-line')
    emptyLines.forEach(emptyLine => {
      emptyLine.innerText = '\n'
    })
  }, [songHtml])


  return (
    <Container maxW='container.md'>
      <Box as='h1' fontSize='5xl' fontWeight='semibold' mb='5'>Delete chords</Box>
      <form onSubmit={deleteChords}>
        <FormLabel>Enter song</FormLabel>
        <Textarea type='text' onChange={e => setText(e.target.value)} value={text} mb={3} name='text' />
        <Button type='submit' colorScheme='teal' size='md'>Submit</Button>
      </form>
      <Box mt={5} id='song' dangerouslySetInnerHTML={{ __html: songHtml }}></Box>
    </Container>
  );
}

export default App;
