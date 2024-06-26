<!DOCTYPE html>
<html>

<head>
    <title>Analyzing Nginx Error Logs</title>
    <meta charset="utf-8">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
       <link href="/css/popup.css" rel="stylesheet" />
       <style type="text/css" media="screen">
          #editor { 
              position: relative;
              top: 0;
              right: 0;
              bottom: 0;
              left: 0;
          }
      </style>
</head>

<body>


    <div class="container">

        <!---creating space for the simple navigation bar-->
        <nav class="navbar navbar-expand-lg navbar-light bg-dark">
            <a class="navbar-brand text-light" href="#">Analyzing Logs with LLms HCI</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item active">
                        <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
                    </li>
            </div>
        </nav>

        <!---creating space for the simple navigation bar-->
        <div class="container col-lg" style="width: 100%;">
            <h3 class="text-center">Nginx Server Logs</h3>
            <hr />
            <div class="data-table">
            </div>
        </div>

        <!---creating space for the selected with similarity ------>

        <div class="container col-lg" style="width: 100%;">
            <h3 class="text-center">Retreived Close Serper Results</h3>
            <hr />
            <div class="close_results_data_table">
            </div>
        </div>

        <div class="row">
          <div id="editor">
           
              
             </div>
            <!---creating space for the serper text file ------->
            <div class="col bg-white bg-light m-3">
                <h3 class="text-center">Current server config file with error</h3>
                <hr />
                <div id="editofr"> Loading default Nginx Conf file... </div>

       
              
          
            </div>

            <!---Load the current conf file --------->
            <div class="col bg-white rounded box-shadow  border border-primary bg-light m-3">
                <h3 class="text-center">Load the generated serper text file</h3>
                <button class="btn btn-primary" id="loadSerperFile" onclick="generateShallowRag()">Load Serper
                    File</button>
                <hr />
                <pre id="serper_file"> Loading serper file...</pre>
            </div>

            <!---creating load the chatGpt file ----->
            <div class="col bg-white rounded box-shadow  border border-success bg-light m-3">
                <h3 class="text-center">Load Gpt responses based augmented with serper text file</h3>
                <hr />
                <pre id="gptResponse">Generating correct conf file...</pre>
            </div>

        </div>

    </div>

</body>
<script>
    // if (!navigator.serviceWorker.controller) {
    //  navigator.serviceWorker.register("/js/sw.js").then(function (reg) {
    //  console.log("Service worker has been registered for scope: " + reg.scope);
    //});
    // }
</script>
<script src="/js/popup.js"></script>
<script src="/js/ragapi.js"></script>

<!-- default gpt response -->
<!--  <script src="/js/gpt.js"></script> -->
<script src="/js/furtherInspection.js"></script>
<script src="/js/loadconfigfile.js"></script>

<!-- load the serper file code -->
<script src="/js/loadSerperfile.js"></script>

<!-- load close serper file results -->
<script src="/js/loadCloseResults.js"></script>

<!---load ace code-->
<script src="/js/ace.js" type="text/javascript" charset="utf-8"></script>

<!-- load the serper file code -->
<script>
    var editor = ace.edit("editor");
    editor.setTheme("ace/theme/twilight");
    editor.session.setMode("ace/mode/javascript");  
</script>

</html> 
