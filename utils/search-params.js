export default class SearchParams {
  static fromObjectToString (data) {
    const params = new URLSearchParams()
    Object.entries(data).forEach(item => {
      params.append(item[0], item[1])
    })
    return `?${params.toString()}`
  }
}
