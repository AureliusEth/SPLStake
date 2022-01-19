const fs = require("fs")
const { exec } = require("child_process");

function reverse(s){
    return s.split("").reverse().join("");
}
function getPath(){
var keyinfo = fs.readFileSync("keyInfo.txt", 'utf8')
var buildkey = ""
var count = 0
const rstring = reverse(keyinfo)
for (var ch of rstring.toString() ){
    count + 1

    if (ch != "."){
        count + 1
        buildkey = buildkey+ch
    }
    if(ch == "."){
    return reverse(buildkey)
    }
    
}}



test("Is the file type given correct", ()=>{
    console.log(getPath())
    expect(getPath()).toBe("json")
})

test("Is the address a mint address", ()=>  {
    var address = fs.readFileSync("addressInfo.txt", 'utf8')  

    exec(`spl-token balance ${address}`,(error, stdout, stderr) => {
        var Err = false
        if(error){
            Err = true
            
            console.log(`error: ${error.message}`)
        }
        if (stderr) {
            Err = true
            console.log(`stderr: ${stderr}`);
            return;
        }
    expect(Err).toBe(false)
    })
})
