const input = document.getElementById('user-input');
const div_speed = document.getElementById('div-speed');
const div_accuracy = document.getElementById('div-accuracy');
const timer = document.getElementById('timer');
let start = performance.now();

async function fetchTextAsString(url) {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);
    const text = await res.text();
    return text;
}

let current_lesson=0;

function resetSystem()
{
    const syst = document.getElementById("lang-select").value;
    current_lesson=0;
    document.getElementById("lesson-text").innerHTML = writing_systems[syst]["lessons"][current_lesson];
    document.getElementById("lessons").innerHTML = (current_lesson+1).toString() + "/" + writing_systems[syst]["lessons"].length.toString();
    resetInput();
}

function nextLesson()
{
    const syst = document.getElementById("lang-select").value;
    if (current_lesson+1>=writing_systems[syst]["lessons"].length) alert("You have finished all lessons!")
    else
    {
	current_lesson += 1;
	document.getElementById("lesson-text").innerHTML = writing_systems[syst]["lessons"][current_lesson];
    document.getElementById("lessons").innerHTML = (current_lesson+1).toString() + "/" + writing_systems[syst]["lessons"].length.toString();
	resetInput();
    }
}

let writing_systems = {};

async function initialise() {
  const txt = await fetchTextAsString(
    "/static/core/data/writing_systems.json"
  );
  writing_systems = JSON.parse(txt);

  const lang_select = document.getElementById('lang-select');
  const langs = Object.keys(writing_systems);

  lang_select.innerHTML = "";

  for (let i = 0; i < langs.length; i++) {
    const code = langs[i];
    const name = writing_systems[code].name;
    lang_select.innerHTML += `<option value="${code}">${name}</option>`;
  }

    resetSystem();
}

initialise().catch(err => console.error('Failed to load writing systems:', err));


function min(a, b) {
  return a < b ? a : b;
}

function accuracy(str1, str2)
{
    if (str2.length==0) return 0;
    minlength=min(str1.length, str2.length);
    let correctcount=0;
    for (let i1=0;i1<minlength;i1++)
    {
	if (str1.charAt(i1)==str2.charAt(i1))
	{
	    correctcount++;
	}
    }
    return correctcount/str2.length;
}

function elapsed()
{
    return performance.now() - start;
}

let updateLoopStarted = false;

async function updateLoop(interval = 200) {
    updateLoopStarted = true;
    start = performance.now();
    while (updateLoopStarted) {
	timer.innerHTML = formatMsToMMSS(elapsed());
        await new Promise(resolve => setTimeout(resolve, interval));
    }
}

function formatMsToMMSS(ms) {
    const totalSeconds = Math.floor(ms / 1000);

    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    const mm = String(minutes).padStart(2, '0');
    const ss = String(seconds).padStart(2, '0');

    return `${mm}:${ss}`;
}

function clearInput()
{
    input.value = '';
}

function resetInput()
{
    clearInput();
    document.getElementById("timer").innerHTML = "00:00";
    updateLoopStarted = false;
    div_speed.innerHTML = `<div class="column is-2">
                        <span class="has-text-weight-semibold">Speed</span>
                    </div>
                    <div class="column">
                        <progress class="progress is-info" value="0" max="100">0%</progress>
                    </div>
                    <div class="column is-1 has-text-right">
                        <span class="has-text-weight-semibold">0 WPM</span>
                    </div>`;
    div_accuracy.innerHTML = `<div class="column is-2">
                        <span class="has-text-weight-semibold">Accuracy</span>
                    </div>
                    <div class="column">
                        <progress class="progress is-success" value="0" max="100">0%</progress>
                    </div>
                    <div class="column is-1 has-text-right">
                        <span class="has-text-weight-semibold">0%</span>
                    </div>`;
    document.getElementById("next-btn").disabled = true;
    
}

input.addEventListener('input', function (event) {
    if (!updateLoopStarted) updateLoop();
    const wpm = (input.value.length * 60000) / elapsed();
    const wpmr = Math.round(wpm);
    const wpmstr = wpmr.toString();
    let prog = 100-2500/wpm;
    if (wpm<=50) prog=wpm;
    agstr = document.getElementById("lesson-text").innerText;
    let acc = accuracy(agstr, input.value) * 100;
    let accr = Math.round(acc).toString();
    div_speed.innerHTML = `<div class="column is-2">
                        <span class="has-text-weight-semibold">Speed</span>
                    </div>
                    <div class="column">
                        <progress class="progress is-info" value="`+prog.toString()+`" max="100">`+prog.toString()+`%</progress>
                    </div>
                    <div class="column is-1 has-text-right">
                        <span class="has-text-weight-semibold">`+wpmstr+` WPM</span>
                    </div>`;
    div_accuracy.innerHTML = `<div class="column is-2">
                        <span class="has-text-weight-semibold">Accuracy</span>
                    </div>
                    <div class="column">
                        <progress class="progress is-success" value="`+acc.toString()+`" max="100">`+accr+`%</progress>
                    </div>
                    <div class="column is-1 has-text-right">
                        <span class="has-text-weight-semibold">`+accr+`%</span>
                    </div>`;
    if (agstr == input.value) document.getElementById("next-btn").disabled = false;
    else document.getElementById("next-btn").disabled = true;
});
