import fs from 'fs'
import path from 'path'

const worksDir = path.join(process.cwd(), 'public', 'sources', 'works')
const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.jfif']

function findImageFile(id) {
  for (const extension of imageExtensions) {
    const filePath = path.join(worksDir, `${id}${extension}`)
    if (fs.existsSync(filePath)) {
      return `/sources/works/${id}${extension}`
    }
  }
  return null
}

function loadWorks() {
  if (!fs.existsSync(worksDir)) {
    return []
  }

  const basenames = new Set()

  for (const fileName of fs.readdirSync(worksDir)) {
    const extension = path.extname(fileName).toLowerCase()
    if (!imageExtensions.includes(extension)) continue
    basenames.add(path.basename(fileName, extension))
  }

  return [...basenames]
    .sort((a, b) => a.localeCompare(b, 'ru'))
    .map((id) => {
      const textPath = path.join(worksDir, `${id}.txt`)
      const description = fs.existsSync(textPath)
        ? fs.readFileSync(textPath, 'utf8').trim()
        : ''
      const image = findImageFile(id)

      if (!image) return null

      return { id, image, description }
    })
    .filter(Boolean)
}

const works = loadWorks()
const outputPath = path.join(worksDir, 'works.json')

fs.writeFileSync(outputPath, `${JSON.stringify(works, null, 2)}\n`, 'utf8')
console.log(`Generated ${works.length} works in ${outputPath}`)
