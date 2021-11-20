export const isAnyEmpty = (data) => {
  for (var key in data) {
    if (data[key] === null || data[key] === undefined) return true
  }
  return false
}
export const findDataById = async (data, key) => {
  return data?.filter((data) => data.id === key)
}
