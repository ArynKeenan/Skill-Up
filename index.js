const userSkillsEl = document.getElementById('user-skill-badge-list')
const learningSkillsEl = document.getElementById('user-learning-badge-list')
const userSkillsHeader = document.getElementById('user-skills-header')
const userLearningHeader = document.getElementById('user-learning-header')
const modal = document.getElementById("modal");
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("add-skill")
const deleteBtn = document.getElementById("delete-all")
const modalSkillEl = document.getElementById('modal-skills')
const skillsFromLocalStorage = JSON.parse( localStorage.getItem("mySkills") )
let userSkills = []

if (skillsFromLocalStorage) {
    userSkills = skillsFromLocalStorage
    render(userSkills)
}

const devSkills = [
  "html", "css", "javascript", "python", "java",
  "react", "vue.js", "redux",
  "git", "github", "docker",

]

inputBtn.addEventListener("click", function() {
    userSkills.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("mySkills", JSON.stringify(userSkills) )
    render(userSkills)
})

function render(skills) {
    let listItems = ""
    for (let i = 0; i < skills.length; i++) {
        listItems += `<a class="green">${skills[i].charAt(0).toUpperCase() + skills[i].slice(1)}</a>`
    }
    modalSkillEl.innerHTML = listItems
}

deleteBtn.addEventListener("dblclick", function() {
    localStorage.clear()
    userSkills = []
    render(userSkills)
})

function compareSkills(){
    let numberOfSkills = 0
    let skillsToLearn = [...devSkills]

    resetHeeaders()

    userSkills.forEach(userSkill => {
        devSkills.forEach(devSkill => {
            if (userSkill.toLowerCase() === devSkill.toLowerCase()) {
                userSkillsEl.innerHTML += `<a class="green">${userSkill.charAt(0).toUpperCase() + userSkill.slice(1)}</a>`
                numberOfSkills++
                skillsToLearn = skillsToLearn.filter(skill => skill.toLowerCase() !== devSkill.toLowerCase())
            }
        })
    })

    skillsToLearn.forEach(skill => {
        learningSkillsEl.innerHTML += `<a class="red">${skill.charAt(0).toUpperCase() + skill.slice(1)}</a>`
    })

    userSkillsHeader.innerHTML = `<i class="fa fa-check-circle" aria-hidden="true"></i> You Have (${numberOfSkills})`
    userLearningHeader.innerHTML = `<i class="fa fa-times-circle" aria-hidden="true"></i> To Learn (${skillsToLearn.length})`

    setProgressPercentage(numberOfSkills, devSkills.length)
}

function resetHeeaders() {
    userSkillsEl.innerHTML = ''
    learningSkillsEl.innerHTML = ''
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

function openModal(){
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