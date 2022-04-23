const baseUrl = 'https://jsonplaceholder.typicode.com'

export const getPosts = () => {
  return fetch(`${baseUrl}/posts`)
}
