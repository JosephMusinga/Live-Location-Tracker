function navigateToPage(page) {
    var inputValue = document.querySelector('input').value;

    // Check if the input field is empty
    if (inputValue.length === 0) {
        // Prevent the button from navigating to the next screen
        alert('Please enter the correct access code to proceed');
        return false;
    }
    var parameter = '?inputValue=' + inputValue;

    window.location.href = page + parameter;
    console.log(inputValue)
}