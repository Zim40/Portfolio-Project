const submitFormHandle =  () => {
    const form = document.querySelector('#form');
    form.addEventListener('submit', submitFormHandle);
    const formData = new FormData(form);
    fetch('/submit-form', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
    })
}

module.exports = {submitFormHandle};