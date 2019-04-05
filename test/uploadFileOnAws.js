function uploadFile() {

    const content = "../path/to/my/file";
    const provider = "amazon";
    const metadata = "sample video on s3";

    fetch("http://localhost/apex-api/bloc/file/upload", {
        method: "POST",
        headers: "content-type: application/json",
        body: JSON.stringify(content, provider, metadata)
        },
    )
    .then(function(response) {
        console.log(response);
    })  
    .catch(function(error) {
        console.log(error);
    })
}

uploadFile()
// https://developers.blockapps.net/advanced/external-storage/
// 