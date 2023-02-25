/**
 * 判断变量是否为空
 * @param {*} obj
 * @returns
 */
export const isEmpty = (obj) => {
  if (typeof obj == "undefined" || obj == null || (typeof obj == "string" && obj.trim() == "") || (typeof obj == 'object' && obj.length == 0)) {
    return true
  } else {
    return false
  }
}
