const userSkillsEl = document.getElementById('user-skill-badge-list')
const learningSkillsEl = document.getElementById('user-learning-badge-list')
const userSkillsHeader = document.getElementById('user-skills-header')
const userLearningHeader = document.getElementById('user-learning-header')
const modal = document.getElementById("modal");
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("add-skill")
const modalSkillEl = document.getElementById('modal-skills')




//Will be replaced with user input for local storage
const userSkills = ["HTML", "react", "node.js", "python", "docker", "aws", "git", "jest", "rest api", "agile", "llm", "apple"]


const devSkills = [
  "html", "css3", "javascript", "python", "java",
  "react", "vue.js", "redux",
  "git", "github", "docker",

]

inputBtn.addEventListener("click", function() {
    userSkills.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("userSkills", JSON.stringify(userSkills) )
    render(userSkills)
})

function render(skills) {
    let listItems = ""
    for (let i = 0; i < skills.length; i++) {
        listItems += `<a class="green">${skills[i]}</a>`
    }
    modalSkillEl.innerHTML = listItems
}

function compareSkills(){
    let numberOfSkills = 0
    userSkillsEl.innerHTML = ''
    learningSkillsEl.innerHTML = ''
    let skillsToLearn = [...devSkills]

    userSkills.forEach(userSkill => {
        devSkills.forEach(devSkill => {
            if (userSkill.toLowerCase() === devSkill.toLowerCase()) {
                userSkillsEl.innerHTML += `<a class="green">${userSkill}</a>`
                numberOfSkills++
                skillsToLearn = skillsToLearn.filter(skill => skill.toLowerCase() !== devSkill.toLowerCase())
            }
        })
    })

    skillsToLearn.forEach(skill => {
        learningSkillsEl.innerHTML += `<a class="red">${skill}</a>`
    })

    userSkillsHeader.innerHTML = `<i class="fa fa-check-circle" aria-hidden="true"></i> You Have (${numberOfSkills})`
    userLearningHeader.innerHTML = `<i class="fa fa-times-circle" aria-hidden="true"></i> To Learn (${skillsToLearn.length})`

    setProgressPercentage(numberOfSkills, devSkills.length)

}

function setProgressPercentage(numOfSkillsUserHas, totalSkills) {
    const percentage = Math.round((numOfSkillsUserHas / totalSkills) * 100)
    setProgress(percentage)
}

function setProgress(percentage) {
    const progressBar = document.getElementById('myProgressBar')
    const progressText = document.getElementById('progressText')
    
    progressBar.style.width = percentage + '%'
    progressText.textContent = percentage
}

function addSkills(){
  modal.style.display = "block";
}
function closeModal(){
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}