export const isProductionEnv = () => {
    return process.env.NODE_ENV && process.env.NODE_ENV === 'production'
}

export const getProjectVersion = () => {
    return require('../../../package.json').version
}