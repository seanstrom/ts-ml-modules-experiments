import * as Maybe from "./maybe"

let val : Maybe.Type<number> = Maybe.from(5)

console.log(Maybe.tags)

console.log(val)
