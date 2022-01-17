const fs = require("fs")

function reverse(s){
    return s.split("").reverse().join("");
}
function getPath(){
var keyinfo = fs.readFileSync("keyInfo.txt", 'utf8')
var buildkey = ""
var count = 0
const rstring = reverse(keyinfo)
for (var ch of rstring.toString() ){
    console.log("ran")
    count + 1

    if (ch != "."){
        count + 1
        buildkey = buildkey+ch
        console.log(count)
        console.log(buildkey)
    }
    if(ch == "."){
    console.log(count)
    console.log("oops")
    return reverse(buildkey)
    }
    
}}

test("Is the file type given correct", ()=>{
    console.log(getPath())
    expect(getPath()).toBe("json")
})