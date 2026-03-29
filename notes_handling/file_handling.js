import {Player} from "../game/player.js"

const numQuestionsInput = document.querySelector('input[name="set-number-of-questions"]');

function getNumberOfQuestions() {
    return numQuestionsInput.value;
}

async function handleFileUpload(result, formData) {
    let jsonResult = await result.json();
    console.log(jsonResult)

    if (jsonResult.files.length > 0) {
        let completed = 0

        jsonResult.files.forEach(fileName => {
            console.log("File Uploaded: " + fileName);

            fetch('/create_questions', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({filename: fileName, numberOfQuestions: getNumberOfQuestions()})
            })
            .then(result => {
                completed += 1;
                alert(fileName + "'s questions were created (" + getNumberOfQuestions() + " questions)");

                if (completed == jsonResult.files.length) {
                    //start game here
                    
                }
            });   
        });
                
        // add design features here

        //alert(result.text);
        //console.log(formData);
    }
}

document.querySelector('input[name="upload-notes"]').addEventListener('change', (event) => {
    const files = event.target.files;
    const formData = new FormData();

    for (const file of files) {
        formData.append('file', file);
    }
    
    fetch('/upload_file', {
        method: 'POST',
        body: formData
    })
    .then(result => handleFileUpload(result, formData));   
});