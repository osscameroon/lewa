const input = document.getElementById('user-input');
const div_speed = document.getElementById('div-speed');
const div_accuracy = document.getElementById('div-accuracy');
const timer = document.getElementById('timer');
let start = performance.now();

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
    while (true) {
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
}

input.addEventListener('input', function (event) {
    if (!updateLoopStarted) updateLoop();
    const wpm = Math.round((input.value.length * 60000) / elapsed());
    const wpmstr = wpm.toString();
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
});
