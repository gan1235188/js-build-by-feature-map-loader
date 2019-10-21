import { getOptions } from 'loader-utils'
import * as babelCore from '@babel/core'

const transform = babelCore.transform

export default function (source: string) {
  const options = getOptions(this);
  const plugins = Object.values(options.transformConfig) as babelCore.PluginItem[]
  console.log(this.resourcePath)
  const result = transform(source, {
    envName: options.envName,
    plugins: plugins
  })

  return result.code
}