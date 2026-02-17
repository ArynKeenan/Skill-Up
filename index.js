// const usersSkillsList = document.getElementById('user-skills-list')
// const userSkillsHeader = document.getElementById('user-skills-header')
// const usersSkills = ["HTML", "react", "node.js", "python", "docker", "aws", "git", "jest", "rest api", "agile", "llm", "apple"]


// const devSkills = [
//   // Languages
//   "html5", "html", "css3", "javascript", "typescript", "python", "java", "c#", "c++", "kotlin", "swift", "go", "rust", "sql", "bash", "ruby",
  
//   // Frontend
//   "react", "angular", "vue.js", "svelte", "next.js", "tailwind", "bootstrap", "sass", "redux",
  
//   // Backend & Databases
//   "node.js", "express", "django", "flask", "spring boot", "asp.net", "postgresql", "mongodb", "mysql", "redis", "graphql",
  
//   // Tools & Infrastructure
//   "git", "github", "docker", "kubernetes", "aws", "azure", "gcp", "terraform", "jenkins", "ansible", "linux",
  
//   // Testing & Quality
//   "jest", "cypress", "selenium", "junit", "pytest", "mochajs",
  
//   // Concepts & Methods
//   "rest api", "microservices", "agile", "scrum", "ci/cd", "unit testing", "oop", "data structures", "algorithms", "system design",
  
//   // 2026 Emerging
//   "llm", "prompt engineering", "agentic ai", "cybersecurity", "web3"
// ];


// compareBtn.onclick = function() {
//     let numberOfSkills = 0
//     usersSkillsList.innerHTML = ''
//     for (let i = 0; i < usersSkills.length; i++) {
//         for (let j = 0; j < devSkills.length; j++) {
//             if (usersSkills[i].toLowerCase() === devSkills[j].toLowerCase()) {
//                 usersSkillsList.innerHTML += `<button class="green">${usersSkills[i]}</button>`
//                 numberOfSkills++
//             }
//         }   
//     }
//     userSkillsHeader.innerText = `You Have (${numberOfSkills})`
// }

function compareSkills(){
    alert("Congratulations!\nYou have discovered an undeveloped feature");
}

function updateSkills(){
    alert("Congratulations!\nYou have discovered an undeveloped feature");
}

function settings(){
    alert("Congratulations!\nYou have discovered an undeveloped feature");
}




function setProgress(percentage) {
    const progressBar = document.getElementById('myProgressBar')
    const progressText = document.getElementById('progressText')
    
    progressBar.style.width = percentage + '%'
    progressText.textContent = percentage
}

// Example usage:
setProgress(67); // Sets the bar to 67%