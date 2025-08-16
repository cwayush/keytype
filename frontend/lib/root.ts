export const apiRoot = {
    baseAPI: 'http://localhost:5501/api',
  }
  
  // api versions
  export const apiVersionControl = {
    v1: '/v1',
    v2: '/v2',
    v3: '/v3',
    v4: '/v4',
  }
  
  // url constructor
  export const constructURL = (
    rootKey: string,
    version: string,
    endpoint: string
  ): string => {
    return `${rootKey}${version}${endpoint}`
  }
  