import report from './services/report.js';
import reportService from './services/report.js';

let creatingReport = false;

document.addEventListener('DOMContentLoaded', (event) => {
    // render the list for skeleton screens
    renderReportList();
    document.getElementById('reports_create').addEventListener('click', onSaveReport);
    document.addEventListener('keyup', (e) => {
        if (e.code === 'Escape') cancelNewReport();
        else if (e.code === 'Enter') createNewReport();
    });
})

function init() {
    // fetch reports on load
    reportService.getAll().then((res) => { renderReportList(res); });
}


function renderReportList(result) {
    const reportsList = document.getElementById('reports_list');

    if (!result) {
        return reportsList.innerHTML = 'todo skeleton';
    }

    if (result && result.status && result.status === 200) {
        if (result.data.length) {
            const list = result.data.map(r => `<li>${r.title}</li>`);
            return reportsList.innerHTML =`<ul>${list}</ul>`;
        }

        return reportsList.innerHTML = '<p>It seems you have not created any reports, please use the button below</p>';

    }

    reportsList.innerHTML('Something went wrong fetching report data!');
}

function cancelNewReport() {
    creatingReport = false;
    const reportsInput = document.getElementById('reports_input');
    reportsInput.classList.add('hidden');
    reportsInput.value = '';
}

function createNewReport() {
    if (!creatingReport) return;
    const reportsInput = document.getElementById('reports_input');

    if (reportsInput.value) {
        return reportService.create(reportsInput.value).then(() => {
            reportService.getAll().then((res) => {
                renderReportList(res);
                cancelNewReport();
            });
        })
    }

    const reportsError = document.getElementById('reports_error');
    reportsError.innerHTML = 'Your report is missing a title';
}

function onSaveReport() {
    if (creatingReport) return;

    const reportsInput = document.getElementById('reports_input');
    reportsInput.classList.remove('hidden');
    creatingReport = true;
}



window.onload = init();