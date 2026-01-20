


function setProgress(percentage) {
    const progressBar = document.getElementById('myProgressBar')
    const progressText = document.getElementById('progressText')
    
    progressBar.style.width = percentage + '%'
    progressText.textContent = percentage
}

// Example usage:
setProgress(63); // Sets the bar to 65%