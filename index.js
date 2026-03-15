const userSkillsEl = document.getElementById('user-skill-badge-list')
const learningSkillsEl = document.getElementById('user-learning-badge-list')
const userSkillsHeader = document.getElementById('user-skills-header')
const userLearningHeader = document.getElementById('user-learning-header')
const skillModalEl = document.getElementById("add-skill-modal");
const infoModalEl = document.getElementById("info-modal");
const inputEl = document.getElementById("input-el")
const addNewSkill = document.getElementById("add-skill")
const deleteBtn = document.getElementById("delete-all")
const modalSkillEl = document.getElementById('modal-skills')

const skillsFromLocalStorage = JSON.parse( localStorage.getItem("mySkills") )
let userSkills = []

const skillsDb = [
  // Languages
  "javascript", "python", "java", "typescript", "c++", "c#", "ruby", "go",
  "rust", "swift", "kotlin", "php", "scala", "r", "matlab", "bash", "sql",

  // Frontend
  "html", "css", "react", "vue", "angular", "svelte", "next.js", "nuxt",
  "tailwind", "sass", "webpack", "vite", "jquery", "bootstrap",

  // Backend
  "node.js", "express", "django", "flask", "spring", "rails", "fastapi",
  "graphql", "rest", "grpc",

  // Databases
  "postgresql", "mysql", "mongodb", "redis", "sqlite", "firebase",
  "dynamodb", "elasticsearch", "cassandra",

  // Cloud & DevOps
  "aws", "azure", "gcp", "docker", "kubernetes", "terraform", "jenkins",
  "ci/cd", "github actions", "linux", "nginx",

  // Tools & Practices
  "git", "github", "agile", "scrum", "jira", "figma", "jest",
  "unit testing", "tdd", "microservices", "machine learning", "ai",

  // Data
  "pandas", "numpy", "tensorflow", "pytorch", "spark", "tableau", "power bi"
]

if (skillsFromLocalStorage) {
    userSkills = skillsFromLocalStorage
    render(userSkills)
}



addNewSkill.addEventListener("click", function() {
    if (inputEl.value.trim() !== "") {
        userSkills.push(inputEl.value)
        inputEl.value = ""
        localStorage.setItem("mySkills", JSON.stringify(userSkills) )
        render(userSkills)
    }
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

function compareSkills() {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript(
            {
                target: { tabId: tabs[0].id },
                func: () => document.body.innerText,
            },
            (results) => {
                if (chrome.runtime.lastError || !results || !results[0]) {
                    alert("Couldn't read this page. Make sure you're on a job listing.")
                    return
                }

                const pageText = results[0].result.toLowerCase()
                const jobSkills = []

                skillsDb.forEach(skill => {
                    const escaped = skill.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
                    const regex = new RegExp(`(?<![a-z0-9])${escaped}(?![a-z0-9])`, 'i')
                    if (regex.test(pageText) && !jobSkills.includes(skill)) {
                        jobSkills.push(skill)
                    }
                })

                if (jobSkills.length === 0) {
                    alert("No recognizable skills found on this page.")
                    return
                }

                // your existing comparison logic, just swap devSkills for jobSkills
                let numberOfSkills = 0
                let skillsToLearn = [...jobSkills]
                resetHeaders()

                userSkills.forEach(userSkill => {
                    jobSkills.forEach(jobSkill => {
                        if (userSkill.toLowerCase() === jobSkill.toLowerCase()) {
                            userSkillsEl.innerHTML += `<a class="green">${userSkill.charAt(0).toUpperCase() + userSkill.slice(1)}</a>`
                            numberOfSkills++
                            skillsToLearn = skillsToLearn.filter(s => s.toLowerCase() !== jobSkill.toLowerCase())
                        }
                    })
                })

                skillsToLearn.forEach(skill => {
                    learningSkillsEl.innerHTML += `<a class="red">${skill.charAt(0).toUpperCase() + skill.slice(1)}</a>`
                })

                userSkillsHeader.innerHTML = `<i class="fa fa-check-circle" aria-hidden="true"></i> You Have (${numberOfSkills})`
                userLearningHeader.innerHTML = `<i class="fa fa-times-circle" aria-hidden="true"></i> To Learn (${skillsToLearn.length})`
                setProgressPercentage(numberOfSkills, jobSkills.length)
            }
        )
    })
}

// function compareSkills(){
//     let numberOfSkills = 0
//     let skillsToLearn = [...devSkills]

//     resetHeaders()

//     userSkills.forEach(userSkill => {
//         devSkills.forEach(devSkill => {
//             if (userSkill.toLowerCase() === devSkill.toLowerCase()) {
//                 userSkillsEl.innerHTML += `<a class="green">${userSkill.charAt(0).toUpperCase() + userSkill.slice(1)}</a>`
//                 numberOfSkills++
//                 skillsToLearn = skillsToLearn.filter(skill => skill.toLowerCase() !== devSkill.toLowerCase())
//             }
//         })
//     })

//     skillsToLearn.forEach(skill => {
//         learningSkillsEl.innerHTML += `<a class="red">${skill.charAt(0).toUpperCase() + skill.slice(1)}</a>`
//     })

//     userSkillsHeader.innerHTML = `<i class="fa fa-check-circle" aria-hidden="true"></i> You Have (${numberOfSkills})`
//     userLearningHeader.innerHTML = `<i class="fa fa-times-circle" aria-hidden="true"></i> To Learn (${skillsToLearn.length})`

//     setProgressPercentage(numberOfSkills, devSkills.length)
// }

function resetHeaders() {
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

function openSkillModal(){
  skillModalEl.style.display = "block";
}
function closeSkillModal(){
  skillModalEl.style.display = "none";
}

function openInfoModal(){
  infoModalEl.style.display = "block";
}
function closeInfoModal(){
  infoModalEl.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == skillModalEl) {
    skillModalEl.style.display = "none";
  } else if (event.target == infoModalEl) {
    infoModalEl.style.display = "none";
  }
}