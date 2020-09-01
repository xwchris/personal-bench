export const setCookie = (key: string, value: any) => {
  const cookie = {
    [key]: JSON.stringify(value),
    path: '/admin',
    'max-age': 60 * 60 * 24 * 7
  }
  document.cookie = Object.keys(cookie).map(name => `${name}=${cookie[name]}`).join(';')
}
