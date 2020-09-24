import reportService from './services/report.js';

let creatingReport = false;
let editingReport = null;

const colorList = [
    '009688',
    '00695C',
    'FFEE58',
    '5C6BC0',
    '8D6E63',
    '039BE5',
    '283593',
    '9C27B0',
    'EC407A',
    'FFC107',
    'FF8A65',
    '3F51B5',
    '8E24AA',
    'FFE082',
]

document.addEventListener('DOMContentLoaded', (event) => {
    renderReportList();
    document.addEventListener('keyup', (e) => {
        if (e.code === 'Escape') onEsc();
        else if (e.code === 'Enter') onEnter();
    });
})

function init() {
    // fetch reports on load
    reportService.getAll().then((res) => { renderReportList(res); });
}


function renderReportList(result) {
    const reportsList = document.getElementById('reports_list');

    if (!result) {
        return ''
    }

    if (result && result.status && result.status === 200) {
        if (result.data.length) {

            const renderContextMenu = (id) => (
                `
                <a class="report_context" onClick="window.onContextMenuClick(this, event)"> </a>
                <div class="report_context_menu hidden">
                    <a onClick="window.onEditReport(${id})"><i class="fas fa-pencil-alt"></i>Edit</a>
                    <a onClick="window.onDeleteReport( ${id})"><i class="far fa-trash-alt"></i>Delete</a>
                </div>
                `
            )

             const renderAvatar = (i) => (
                `
                <span class="report_avatar" style="background-color: #${colorList[i % colorList.length]}"> </span>
                `
                        )
            const list = result.data.map((r, i) => `<li class="report_list_item" title="${r.title}" data-report-id="${r.id}">${renderAvatar(i)}<span class="report_title">${r.title}</span> ${renderContextMenu(r.id)}</li>`);
            return reportsList.innerHTML =`<ul>${list.join('')}</ul>`;
        }

        return reportsList.innerHTML = '<p class="report_list_empty">It seems you have not created any reports, please use the button below</p>';

    }

    reportsList.innerHTML('Something went wrong fetching report data!');
}

function onEsc() {
    if (creatingReport) {
        // if the creation gets cancled we add the hidden class and remove the value from the imput
        creatingReport = false;
        const reportsInput = document.getElementById('reports_input');
        reportsInput.classList.add('hidden');
        reportsInput.value = '';
        const reportsError = document.getElementById('reports_error');
        reportsError.innerHTML = '';
    } else if (editingReport) {
        // if the editing gets canceld we refetch the list
        reportService.getAll().then((res) => {
            renderReportList(res);
            editingReport = null;
        })
    }

}

function onEnter() {
    if (creatingReport) {
        const reportsInput = document.getElementById('reports_input');

        if (reportsInput.value) {
            return reportService.create(reportsInput.value).then(() => {
                reportService.getAll().then((res) => {
                    renderReportList(res);
                    onEsc();
                });
            });
        }

        const reportsError = document.getElementById('reports_error');
        reportsError.innerHTML = 'Your report is missing a title!';
    } else if (editingReport) {
        const reportsEditInput = document.getElementById('reports_edit_input');

        if (reportsEditInput.value) {
            return reportService.updateOneById(editingReport, reportsEditInput.value).then(() => {
                reportService.getAll().then((res) => {
                    renderReportList(res);
                    editingReport = null;
                });
            });

        }

        // just refetch data if an empty title was set
        reportService.getAll().then((res) => {
            renderReportList(res);
            creatingReport = null;
        });
    }
}

function closeAllContextMenus() {
    const allContextMenus = document.getElementsByClassName('report_context_menu');
    Array.from(allContextMenus).forEach((el) => {
        el.classList.add('hidden');
    });
}

function findReportElementById(id) {
    const allListItems = document.getElementsByClassName('report_list_item');
    let reportEl = null;
    Array.from(allListItems).forEach((el) => {
        if (el.getAttribute('data-report-id') === id.toString()) reportEl = el;
    });

    return reportEl;
}

function editReport(el) {
    if (!el) return;
    const span = el.querySelector('.report_title');
    span.classList.add('hidden');
    const editInput = document.createElement('input');
    editInput.setAttribute('type', 'text');
    editInput.setAttribute('id', 'reports_edit_input');
    editInput.setAttribute('class', 'reports_edit_input');
    editInput.value = span.innerHTML;

    el.append(editInput, span);
}

function cancelReportEdit(el) {
    if (!el) return;
    const span = el.querySelector('.report_title');
    span.classList.remove('hidden');

    const input = el.querySelector('#reports_edit_input');
    el.removeChild(input);
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

window.onDeleteReport = (id) => {
    return reportService.deleteOneById(id).then(() => {
        reportService.getAll().then((res) => {
            renderReportList(res);
        });
     });
}

window.onEditReport = (id) => {
    // don't allow editing of more than one reports at the same time
    if (editingReport) {
        // trying to edit the same report again, do nothing
        if (editingReport === id) {
            return;
        } else {
            cancelReportEdit(findReportElementById(editingReport));
        }
    }

    editReport(findReportElementById(id));
    editingReport = id;
}

window.onToggleReportsView = (el) => {
    el.classList.toggle('wrapper-hidden');
    const wrapper = document.querySelector('.reports_list_wrapper');
    console.log('wrapper', wrapper);
    wrapper.classList.toggle('hidden');

}


window.onclick = function (event) {
    closeAllContextMenus();
}

window.onload = init();