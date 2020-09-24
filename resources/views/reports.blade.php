<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reports by @bbosiljcic</title>
    <link rel="stylesheet" href="/css/app.css">
    <script src="/js/app.js"></script>
    <link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet">
</head>
<body>
    <div class="wrapper">
        <div class="sidebar">
            <div class="menu">
                <div class="logo">
                    <img src="/assets/storyclash-square-logo.png">
                </div>
            </div>
            <div class="reports">
                <span class="reports_main_title"><i class="far fa-bookmark"></i> Saved Reports</span>
                <span class="reports_title" onClick="window.onToggleReportsView(this)">my Reports <i class="fas fa-chevron-down"></i></span>
                <div class="reports_list_wrapper" id="reports_list_wrapper">
                    <div class="reports_list" id="reports_list"></div>
                    <div class="reports_bottom">
                        <input class="reports_input hidden" id="reports_input" placeholder="My new report" type="text"/>
                        <a class="reports_create" id="reports_create" onClick="window.onSaveReport(event)"><i class="far fa-plus-square"></i>Save Report</a>
                        <div class="reports_error" id="reports_error"></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="main">
            <h1>reports</h1>
        </div>
    </div>
</body>
</html>