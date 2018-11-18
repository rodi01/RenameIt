import dark from "./dark"
import light from "./light"

export default theme => {
  if (theme === "dark") {
    return dark
  }
  return light
}
