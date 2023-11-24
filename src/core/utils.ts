import '@core/declarations'
import fs from 'node:fs'
import path from 'node:path'

export const FileExistsSync = (FilePath) => {
  return fs.existsSync(`${FilePath}.js`) || fs.existsSync(`${FilePath}.ts`)
}

export const GetPackageJson = () => {
  const packageJson = fs
    .readFileSync(path.resolve(__dirname, '../../package.json'))
    .toString()
  return JSON.parse(packageJson)
}
