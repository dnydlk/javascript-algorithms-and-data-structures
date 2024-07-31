const cleanInput = (input) => {
  const regex = /[^a-zA-Z\s]/g
  return input.replace(regex, "")
}
console.log(cleanInputText("ag333.-_@ad"))
