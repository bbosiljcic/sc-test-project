import report from './services/report.js';
import reportService from './services/report.js';

let creatingReport = false;

document.addEventListener('DOMContentLoaded', (event) => {
    // render the list for skeleton screens
    renderReportList();
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

            const renderContextMenu = (id) => (
                `
                <a class="report_context" onClick="window.onContextMenuClick(this, event)"> </a>
                <div class="report_context_menu hidden">
                    <a onClick="window.onEditReport(${id})">Edit</a>
                    <a onClick="window.onDeleteReport( ${id})">Delete</a>
                </div>
                `
            )
            const list = result.data.map(r => `<li data-report-id="${r.id}">${r.title} ${renderContextMenu(r.id)}</li>`);
            return reportsList.innerHTML =`<ul>${list.join('')}</ul>`;
        }

        return reportsList.innerHTML = '<p>It seems you have not created any reports, please use the button below</p>';

    }

    reportsList.innerHTML('Something went wrong fetching report data!');
}

function cancelNewReport() {
    // if the creation gets cancled we add the hidden class and remove the value from the imput
    creatingReport = false;
    const reportsInput = document.getElementById('reports_input');
    reportsInput.classList.add('hidden');
    reportsInput.value = '';

    const reportsError = document.getElementById('reports_error');
    reportsError.innerHTML = '';
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

function closeAllContextMenus() {
    const allContextMenus = document.getElementsByClassName('report_context_menu');
    Array.from(allContextMenus).forEach((el) => {
        el.classList.add('hidden');
    });
}

window.onSaveReport = () => {
    if (creatingReport) return;

    const reportsInput = document.getElementById('reports_input');
    reportsInput.classList.remove('hidden');
    creatingReport = true;
}

window.onContextMenuClick = (el, event) => {
    event.stopPropagation();
    closeAllContextMenus();
    el.nextElementSibling.classList.remove('hidden');
}


window.onclick = function (event) {
    closeAllContextMenus();
}

window.onload = init();