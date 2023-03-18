const form = document.querySelector('#form');


const submitFormHandle = async (event) => {
    try {
        event.preventDefault();
        const formData = new FormData(form);
        await fetch('/submit-form', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
            })
        
    } catch {
        alert('Something went Wrong, Please try again');
    }
};
form.addEventListener('submit', submitFormHandle);

