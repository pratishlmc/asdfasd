const search_input = document.querySelector('input')
const infoText = document.querySelector(".info-text")
const wrapper = document.querySelector(".wrapper")
const meaning = document.querySelector(".meaning")
const example = document.querySelector(".example")
const synonyms = document.querySelector(".synonyms")
const partOfSpeech = document.querySelector("#pos")
const phonetic = document.querySelector("#phonetic")
const the_word = document.querySelector(".the_word")
const showAll = document.querySelector("a")
const clearBtn = document.querySelector("#clearButton")

function data(result, word) {
    if (!result[0].shortdef) {
        infoText.innerHTML = `Can't find any meaning for <span>"${word}"</span>, please check the spelling and try again.`
        wrapper.classList.remove('active')
    }
    else {
        let showAllMeanings = false
        showAll.innerHTML = "Show all"

        wrapper.classList.add('active')
        let item = result[0]
        console.log(item)

        the_word.innerHTML = word
        partOfSpeech.innerHTML = item.fl
        phonetic.innerHTML = `/${item.hwi.prs[0].mw}/`
        meaning.innerHTML = `<span class="multi-text">${item.shortdef[0]}</span>`

        if (item.shortdef.length <= 1) {
            showAll.style.display = "none"
        }
        else {
            showAll.style.display = "block"
        }

        showAll.addEventListener('click', function (e) {
            showAllMeanings = !showAllMeanings

            if (showAllMeanings === true) {
                showAll.innerHTML = "Show less"
                for (let i = 1; i < item.shortdef.length; i++) {
                    let HTMLitem = `<hr/><li class="multi-text" >${item.shortdef[i]}</li>`
                    meaning.insertAdjacentHTML('beforeend', HTMLitem)
                }
            } else {
                showAll.innerHTML = "Show all"
                meaning.innerHTML = `<span class="multi-text">${item.shortdef[0]}</span>`
            }
        })

    }
}

function fetchApi(word) {
    infoText.style.color = "#000000"
    infoText.innerHTML = `Searching meaning for <span>"${word}"</span>`
    let url = `https://dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=bb3685a4-1bc4-4e6f-b9c6-d2ee454a2700`

    fetch(url)
        .then(response => response.json())
        .then(result => data(result, word))
        .catch(err => console.error(err));
}

search_input.addEventListener('keyup', function (e) {
    if (e.key === 'Enter') {
        fetchApi(e.target.value)
    }
})

clearBtn.addEventListener('click', function () {
    search_input.value = ""
})

