export const titleCase = (string)=> {
    var word = string.toLowerCase()
    var capitalized = word.charAt(0).toUpperCase() + word.substr(1)
    return capitalized
}