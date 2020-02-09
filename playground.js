json = [{"name" : "Abhishek"},{"name" : "Ranverr"}
]

var length = json.length;
for(var i=0;i<length;i++) {
    console.log(JSON.stringify(json[i].name))
}