import { readFileSync } from 'fs'
import * as yaml from 'js-yaml'
export const getEnvConfig = () => {
    const filename = 'config.yaml'
    return yaml.load(
        readFileSync(filename, 'utf-8')
    ) as Record<string, any>
}

export const getTestingEnvConfig = () => {
    const filename = 'config.dev.yaml'
    return yaml.load(
        readFileSync(filename, 'utf-8')
    ) as Record<string, any>
}