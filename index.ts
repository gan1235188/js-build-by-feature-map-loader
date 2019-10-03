import { getOptions } from 'loader-utils'
import * as fs from 'fs'
import * as babelCore from '@babel/core'

const transform = babelCore.transform

export default function (source: string) {
  output('', false, false)
  try {
    const options = getOptions(this);
    const plugins = Object.values(options.transformConfig) as babelCore.PluginItem[]

    const result = transform(source, {
      envName: options.envName,
      plugins: plugins
    })

    output(result.code, false, true)

    return result.code
  } catch (e) {
    console.error(e)
  }
}

function output(data: any, isNeedFormat: boolean, isAppend = true) {
  const outputData = !isNeedFormat ? data : JSON.stringify(data, null, 2)
  const writeFn = isAppend ? fs.appendFileSync.bind(fs) : fs.writeFileSync.bind(fs)
  writeFn('./output.txt', outputData)
}